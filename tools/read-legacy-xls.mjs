import fs from "node:fs";

const FREESECT = 0xffffffff;
const ENDOFCHAIN = 0xfffffffe;

function readChain(buffer, startSector, fat, sectorSize) {
  const chunks = [];
  const seen = new Set();
  let sector = startSector;

  while (sector !== ENDOFCHAIN && sector !== FREESECT && !seen.has(sector)) {
    seen.add(sector);
    const offset = 512 + sector * sectorSize;
    chunks.push(buffer.subarray(offset, offset + sectorSize));
    sector = fat[sector];
  }

  return Buffer.concat(chunks);
}

function extractWorkbookStream(buffer) {
  if (buffer.subarray(0, 8).toString("hex") !== "d0cf11e0a1b11ae1") {
    throw new Error("O arquivo não é um documento OLE/BIFF válido.");
  }

  const sectorSize = 2 ** buffer.readUInt16LE(0x1e);
  const fatSectorIds = [];
  for (let offset = 0x4c; offset < 0x4c + 109 * 4; offset += 4) {
    const id = buffer.readUInt32LE(offset);
    if (id !== FREESECT) fatSectorIds.push(id);
  }

  let difatSector = buffer.readUInt32LE(0x44);
  const difatCount = buffer.readUInt32LE(0x48);
  for (let i = 0; i < difatCount && difatSector !== ENDOFCHAIN; i += 1) {
    const offset = 512 + difatSector * sectorSize;
    const entries = sectorSize / 4 - 1;
    for (let j = 0; j < entries; j += 1) {
      const id = buffer.readUInt32LE(offset + j * 4);
      if (id !== FREESECT) fatSectorIds.push(id);
    }
    difatSector = buffer.readUInt32LE(offset + entries * 4);
  }

  const fat = [];
  for (const sector of fatSectorIds) {
    const offset = 512 + sector * sectorSize;
    for (let i = 0; i < sectorSize; i += 4) {
      fat.push(buffer.readUInt32LE(offset + i));
    }
  }

  const directoryStart = buffer.readUInt32LE(0x30);
  const directory = readChain(buffer, directoryStart, fat, sectorSize);
  for (let offset = 0; offset + 128 <= directory.length; offset += 128) {
    const nameLength = directory.readUInt16LE(offset + 64);
    if (nameLength < 2) continue;
    const name = directory
      .subarray(offset, offset + nameLength - 2)
      .toString("utf16le");
    if (!["Workbook", "Book"].includes(name)) continue;

    const startSector = directory.readUInt32LE(offset + 116);
    const size = Number(directory.readBigUInt64LE(offset + 120));
    if (size < buffer.readUInt32LE(0x38)) {
      throw new Error("Fluxo Workbook armazenado em MiniFAT não suportado.");
    }
    return readChain(buffer, startSector, fat, sectorSize).subarray(0, size);
  }

  throw new Error("Fluxo Workbook não encontrado.");
}

function recordsAt(workbook, start = 0) {
  const records = [];
  let offset = start;
  while (offset + 4 <= workbook.length) {
    const id = workbook.readUInt16LE(offset);
    const length = workbook.readUInt16LE(offset + 2);
    const dataStart = offset + 4;
    const dataEnd = dataStart + length;
    if (dataEnd > workbook.length) break;
    records.push({ id, offset, data: workbook.subarray(dataStart, dataEnd) });
    offset = dataEnd;
    if (id === 0x000a && start > 0) break;
  }
  return records;
}

function parseSst(records) {
  const sstIndex = records.findIndex((record) => record.id === 0x00fc);
  if (sstIndex < 0) return [];

  const segments = [records[sstIndex].data];
  for (let i = sstIndex + 1; i < records.length && records[i].id === 0x003c; i += 1) {
    segments.push(records[i].data);
  }

  let segmentIndex = 0;
  let position = 8;

  function nextSegment() {
    segmentIndex += 1;
    position = 0;
    if (segmentIndex >= segments.length) throw new Error("SST truncada.");
  }

  function rawByte() {
    if (position >= segments[segmentIndex].length) nextSegment();
    return segments[segmentIndex][position++];
  }

  function rawUInt16() {
    return rawByte() | (rawByte() << 8);
  }

  function rawUInt32() {
    return (rawByte() | (rawByte() << 8) | (rawByte() << 16) | (rawByte() << 24)) >>> 0;
  }

  function skipRaw(count) {
    for (let i = 0; i < count; i += 1) rawByte();
  }

  function readCharacters(count, initialHighByte) {
    let highByte = initialHighByte;
    let value = "";
    for (let i = 0; i < count; i += 1) {
      if (position >= segments[segmentIndex].length) {
        nextSegment();
        highByte = Boolean(rawByte() & 0x01);
      }
      if (highByte) {
        value += String.fromCharCode(rawUInt16());
      } else {
        value += String.fromCharCode(rawByte());
      }
    }
    return value;
  }

  const uniqueCount = records[sstIndex].data.readUInt32LE(4);
  const strings = [];
  for (let i = 0; i < uniqueCount; i += 1) {
    const charCount = rawUInt16();
    const flags = rawByte();
    const hasRichText = Boolean(flags & 0x08);
    const hasExtended = Boolean(flags & 0x04);
    const richRuns = hasRichText ? rawUInt16() : 0;
    const extendedSize = hasExtended ? rawUInt32() : 0;
    strings.push(readCharacters(charCount, Boolean(flags & 0x01)));
    skipRaw(richRuns * 4 + extendedSize);
  }
  return strings;
}

function decodeRk(raw) {
  const divideBy100 = raw & 0x01;
  const isInteger = raw & 0x02;
  let value;
  if (isInteger) {
    value = raw >> 2;
  } else {
    const bytes = Buffer.alloc(8);
    bytes.writeUInt32LE(raw & 0xfffffffc, 4);
    value = bytes.readDoubleLE(0);
  }
  return divideBy100 ? value / 100 : value;
}

function parseWorkbook(filePath) {
  const workbook = extractWorkbookStream(fs.readFileSync(filePath));
  const globalRecords = recordsAt(workbook);
  const sharedStrings = parseSst(globalRecords);
  const sheets = [];

  for (const record of globalRecords.filter((item) => item.id === 0x0085)) {
    const sheetOffset = record.data.readUInt32LE(0);
    const nameLength = record.data[6];
    const isWide = Boolean(record.data[7] & 0x01);
    const name = isWide
      ? record.data.subarray(8, 8 + nameLength * 2).toString("utf16le")
      : record.data.subarray(8, 8 + nameLength).toString("latin1");
    sheets.push({ name, offset: sheetOffset });
  }

  return sheets.map((sheet) => {
    const cells = new Map();
    const setCell = (row, column, value) => cells.set(`${row}:${column}`, value);
    for (const record of recordsAt(workbook, sheet.offset)) {
      if (record.id === 0x00fd) {
        setCell(
          record.data.readUInt16LE(0),
          record.data.readUInt16LE(2),
          sharedStrings[record.data.readUInt32LE(6)] ?? ""
        );
      } else if (record.id === 0x0203) {
        setCell(
          record.data.readUInt16LE(0),
          record.data.readUInt16LE(2),
          record.data.readDoubleLE(6)
        );
      } else if (record.id === 0x027e) {
        setCell(
          record.data.readUInt16LE(0),
          record.data.readUInt16LE(2),
          decodeRk(record.data.readUInt32LE(6))
        );
      } else if (record.id === 0x00bd) {
        const row = record.data.readUInt16LE(0);
        const firstColumn = record.data.readUInt16LE(2);
        const lastColumn = record.data.readUInt16LE(record.data.length - 2);
        for (let column = firstColumn; column <= lastColumn; column += 1) {
          const rkOffset = 4 + (column - firstColumn) * 6 + 2;
          setCell(row, column, decodeRk(record.data.readUInt32LE(rkOffset)));
        }
      }
    }

    const coordinates = [...cells.keys()].map((key) => key.split(":").map(Number));
    const maxRow = Math.max(0, ...coordinates.map(([row]) => row));
    const maxColumn = Math.max(0, ...coordinates.map(([, column]) => column));
    const rows = [];
    for (let row = 0; row <= maxRow; row += 1) {
      const values = [];
      for (let column = 0; column <= maxColumn; column += 1) {
        values.push(cells.get(`${row}:${column}`) ?? "");
      }
      rows.push(values);
    }
    return { name: sheet.name, rows };
  });
}

const filePath = process.argv[2];
if (!filePath) throw new Error("Informe o caminho do arquivo .xls.");
process.stdout.write(JSON.stringify(parseWorkbook(filePath), null, 2));
