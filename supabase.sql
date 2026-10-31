-- Run once in Supabase: SQL Editor -> New query -> paste -> Run.
create table if not exists public.lists (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.lists enable row level security;
create policy "own select" on public.lists for select to authenticated using (user_id = auth.uid());
create policy "own insert" on public.lists for insert to authenticated with check (user_id = auth.uid());
create policy "own update" on public.lists for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own delete" on public.lists for delete to authenticated using (user_id = auth.uid());
