-- Copa Potiguar 2026 — PostgreSQL 16
-- Estrutura compatível com VPS/PostgreSQL e adaptável ao Supabase.
create extension if not exists pgcrypto;
create extension if not exists citext;

create type access_role as enum ('admin', 'seller', 'leadership');
create type pilot_status as enum ('active', 'inactive', 'future_phase');
create type round_status as enum ('draft', 'open', 'closed', 'scored');
create type content_status as enum ('draft', 'published', 'archived');

create table stores (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into stores (name) values
('Imperatriz')
on conflict (name) do nothing;

create table app_users (
  id uuid primary key default gen_random_uuid(),
  cpf varchar(11) unique not null check (cpf ~ '^[0-9]{11}$'),
  email citext unique,
  password_hash text not null,
  full_name text not null,
  original_job_title text not null,
  access_role access_role not null,
  pilot_status pilot_status not null default 'active',
  store_id uuid references stores(id),
  active boolean not null default true,
  failed_login_attempts integer not null default 0,
  locked_until timestamptz,
  last_login_at timestamptz,
  password_changed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    (access_role = 'admin' and store_id is null)
    or (access_role in ('seller', 'leadership') and store_id is not null)
  )
);

create table user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  refresh_token_hash text unique not null,
  ip_address inet,
  user_agent text,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  video_url text,
  publish_at timestamptz not null,
  status content_status not null default 'draft',
  mandatory boolean not null default true,
  created_by uuid not null references app_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table announcement_reads (
  announcement_id uuid references announcements(id) on delete cascade,
  user_id uuid references app_users(id) on delete cascade,
  read_at timestamptz not null default now(),
  ip_address inet,
  primary key (announcement_id, user_id)
);

create table products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  name text not null,
  brand text not null,
  description text,
  price numeric(12,2),
  currency char(3) not null default 'BRL',
  image_url text,
  site_url text,
  site_synced_at timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table campaign_rounds (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  campaign_date date not null unique,
  prediction_opens_at timestamptz not null,
  prediction_closes_at timestamptz not null,
  status round_status not null default 'draft',
  announcement_id uuid references announcements(id),
  closed_by uuid references app_users(id),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  check (prediction_closes_at > prediction_opens_at)
);

-- Uma rodada pode ter um ou vários produtos foco por loja.
-- As lojas não precisam compartilhar os mesmos produtos.
create table store_focus_products (
  round_id uuid references campaign_rounds(id) on delete cascade,
  store_id uuid references stores(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  goal_quantity integer not null check (goal_quantity > 0),
  sold_quantity integer not null default 0 check (sold_quantity >= 0),
  active boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (round_id, store_id, product_id)
);

create table seller_sales (
  round_id uuid references campaign_rounds(id) on delete cascade,
  seller_id uuid references app_users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  source text not null default 'manual',
  external_reference text,
  updated_at timestamptz not null default now(),
  primary key (round_id, seller_id, product_id)
);

create table matches (
  id uuid primary key default gen_random_uuid(),
  round_id uuid not null references campaign_rounds(id) on delete cascade,
  external_id text unique,
  group_name text,
  home_team text not null,
  away_team text not null,
  home_flag text,
  away_flag text,
  venue text,
  kickoff_at timestamptz not null,
  home_score integer check (home_score >= 0),
  away_score integer check (away_score >= 0),
  finished boolean not null default false
);

create table predictions (
  match_id uuid references matches(id) on delete cascade,
  user_id uuid references app_users(id) on delete cascade,
  home_score integer not null check (home_score >= 0),
  away_score integer not null check (away_score >= 0),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (match_id, user_id)
);

create table awards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  criterion_code text not null,
  prize_description text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table point_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references app_users(id) on delete cascade,
  round_id uuid references campaign_rounds(id) on delete cascade,
  category text not null,
  points integer not null,
  reference_id uuid,
  description text,
  created_at timestamptz not null default now(),
  unique (user_id, round_id, category, reference_id)
);

create table audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references app_users(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  previous_data jsonb,
  new_data jsonb,
  ip_address inet,
  created_at timestamptz not null default now()
);

-- Configuração explícita do piloto.
create table pilot_rules (
  key text primary key,
  value jsonb not null,
  updated_by uuid references app_users(id),
  updated_at timestamptz not null default now()
);

insert into pilot_rules (key, value) values
('eligible_roles', '["seller","leadership"]'),
('seller_competition', '{"single_category":true,"ignore_original_job_title":true}'),
('leadership_scoring', '{"eligible_titles":["Gerente","Subgerente"],"source":"store_seller_results"}'),
('excluded_until_next_phase', '["Operador de Caixa","Conferente","Depósito","Serviços Gerais","Supervisor","Coordenador","Assistente de Loja"]'),
('points', '{"announcement_read":1,"prediction_result":2,"prediction_exact":4,"sold_product":5,"top_seller_store":8,"store_goal":2,"network_champion":2,"leadership_store_goal":4}');

create index idx_users_store_role on app_users(store_id, access_role);
create index idx_sessions_user_expiry on user_sessions(user_id, expires_at);
create index idx_announcements_publish on announcements(status, publish_at);
create index idx_points_ranking on point_events(user_id, round_id);
create index idx_matches_round_kickoff on matches(round_id, kickoff_at);
create index idx_audit_actor_date on audit_logs(actor_user_id, created_at desc);

-- Em produção:
-- 1. Senhas devem usar Argon2id no serviço de API; nunca armazenar texto puro.
-- 2. JWTs devem ser curtos e refresh tokens armazenados somente em hash.
-- 3. Toda operação administrativa deve gravar audit_logs.
-- 4. A API deve bloquear pilot_status <> active e cargos fora do piloto.
