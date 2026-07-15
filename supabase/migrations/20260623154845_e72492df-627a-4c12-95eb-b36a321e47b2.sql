
-- ============================================================================
-- 1. EXTEND PROFILES TABLE
-- ============================================================================
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS timezone text DEFAULT 'UTC',
  ADD COLUMN IF NOT EXISTS language text DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS last_login_at timestamptz;

-- ============================================================================
-- 2. ENUMS
-- ============================================================================
DO $$ BEGIN
  CREATE TYPE public.task_status AS ENUM ('pending', 'in_progress', 'completed', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.pomodoro_session_type AS ENUM ('focus', 'short_break', 'long_break');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.sync_operation_type AS ENUM ('insert', 'update', 'delete');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.sync_status_type AS ENUM ('pending', 'syncing', 'completed', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.notification_type AS ENUM ('info', 'success', 'warning', 'error', 'reminder');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- 3. TASK CATEGORIES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.task_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text NOT NULL DEFAULT '#6366f1',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, name)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.task_categories TO authenticated;
GRANT ALL ON public.task_categories TO service_role;
ALTER TABLE public.task_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.task_categories;
DROP POLICY IF EXISTS "owner_insert" ON public.task_categories;
DROP POLICY IF EXISTS "owner_update" ON public.task_categories;
DROP POLICY IF EXISTS "owner_delete" ON public.task_categories;
CREATE POLICY "owner_select" ON public.task_categories FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.task_categories FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.task_categories FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.task_categories FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_task_categories_user ON public.task_categories(user_id);

-- ============================================================================
-- 4. TASKS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id uuid REFERENCES public.task_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  status public.task_status NOT NULL DEFAULT 'pending',
  priority public.task_priority NOT NULL DEFAULT 'medium',
  due_date timestamptz,
  completed_at timestamptz,
  estimated_pomodoros integer DEFAULT 1,
  completed_pomodoros integer DEFAULT 0,
  position integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.tasks;
DROP POLICY IF EXISTS "owner_insert" ON public.tasks;
DROP POLICY IF EXISTS "owner_update" ON public.tasks;
DROP POLICY IF EXISTS "owner_delete" ON public.tasks;
CREATE POLICY "owner_select" ON public.tasks FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.tasks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.tasks FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.tasks FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON public.tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_due ON public.tasks(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON public.tasks(category_id);

-- ============================================================================
-- 5. TASK TAGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.task_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text DEFAULT '#94a3b8',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, name)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.task_tags TO authenticated;
GRANT ALL ON public.task_tags TO service_role;
ALTER TABLE public.task_tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.task_tags;
DROP POLICY IF EXISTS "owner_insert" ON public.task_tags;
DROP POLICY IF EXISTS "owner_update" ON public.task_tags;
DROP POLICY IF EXISTS "owner_delete" ON public.task_tags;
CREATE POLICY "owner_select" ON public.task_tags FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.task_tags FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.task_tags FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.task_tags FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_task_tags_user ON public.task_tags(user_id);

-- ============================================================================
-- 6. TASK TAG RELATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.task_tag_relations (
  task_id uuid NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES public.task_tags(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (task_id, tag_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.task_tag_relations TO authenticated;
GRANT ALL ON public.task_tag_relations TO service_role;
ALTER TABLE public.task_tag_relations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.task_tag_relations;
DROP POLICY IF EXISTS "owner_insert" ON public.task_tag_relations;
DROP POLICY IF EXISTS "owner_delete" ON public.task_tag_relations;
CREATE POLICY "owner_select" ON public.task_tag_relations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.task_tag_relations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.task_tag_relations FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_ttr_user ON public.task_tag_relations(user_id);
CREATE INDEX IF NOT EXISTS idx_ttr_tag ON public.task_tag_relations(tag_id);

-- ============================================================================
-- 7. POMODORO SESSIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pomodoro_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
  cycle_id uuid,
  session_type public.pomodoro_session_type NOT NULL DEFAULT 'focus',
  duration_seconds integer NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  completed boolean NOT NULL DEFAULT false,
  interrupted boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pomodoro_sessions TO authenticated;
GRANT ALL ON public.pomodoro_sessions TO service_role;
ALTER TABLE public.pomodoro_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.pomodoro_sessions;
DROP POLICY IF EXISTS "owner_insert" ON public.pomodoro_sessions;
DROP POLICY IF EXISTS "owner_update" ON public.pomodoro_sessions;
DROP POLICY IF EXISTS "owner_delete" ON public.pomodoro_sessions;
CREATE POLICY "owner_select" ON public.pomodoro_sessions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.pomodoro_sessions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.pomodoro_sessions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.pomodoro_sessions FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_pomodoro_user ON public.pomodoro_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_pomodoro_user_started ON public.pomodoro_sessions(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_pomodoro_task ON public.pomodoro_sessions(task_id);

-- ============================================================================
-- 8. POMODORO CYCLES
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.pomodoro_cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cycle_number integer NOT NULL,
  completed_sessions integer NOT NULL DEFAULT 0,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pomodoro_cycles TO authenticated;
GRANT ALL ON public.pomodoro_cycles TO service_role;
ALTER TABLE public.pomodoro_cycles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.pomodoro_cycles;
DROP POLICY IF EXISTS "owner_insert" ON public.pomodoro_cycles;
DROP POLICY IF EXISTS "owner_update" ON public.pomodoro_cycles;
DROP POLICY IF EXISTS "owner_delete" ON public.pomodoro_cycles;
CREATE POLICY "owner_select" ON public.pomodoro_cycles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.pomodoro_cycles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.pomodoro_cycles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.pomodoro_cycles FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_cycles_user ON public.pomodoro_cycles(user_id);

-- ============================================================================
-- 9. DAILY STATISTICS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.daily_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  focus_minutes integer NOT NULL DEFAULT 0,
  break_minutes integer NOT NULL DEFAULT 0,
  completed_tasks integer NOT NULL DEFAULT 0,
  completed_sessions integer NOT NULL DEFAULT 0,
  interrupted_sessions integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_statistics TO authenticated;
GRANT ALL ON public.daily_statistics TO service_role;
ALTER TABLE public.daily_statistics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.daily_statistics;
DROP POLICY IF EXISTS "owner_insert" ON public.daily_statistics;
DROP POLICY IF EXISTS "owner_update" ON public.daily_statistics;
DROP POLICY IF EXISTS "owner_delete" ON public.daily_statistics;
CREATE POLICY "owner_select" ON public.daily_statistics FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.daily_statistics FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.daily_statistics FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.daily_statistics FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_daily_stats_user_date ON public.daily_statistics(user_id, date DESC);

-- ============================================================================
-- 10. WEEKLY STATISTICS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.weekly_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year integer NOT NULL,
  week integer NOT NULL,
  focus_minutes integer NOT NULL DEFAULT 0,
  completed_tasks integer NOT NULL DEFAULT 0,
  completed_sessions integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, year, week)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_statistics TO authenticated;
GRANT ALL ON public.weekly_statistics TO service_role;
ALTER TABLE public.weekly_statistics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.weekly_statistics;
DROP POLICY IF EXISTS "owner_insert" ON public.weekly_statistics;
DROP POLICY IF EXISTS "owner_update" ON public.weekly_statistics;
DROP POLICY IF EXISTS "owner_delete" ON public.weekly_statistics;
CREATE POLICY "owner_select" ON public.weekly_statistics FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.weekly_statistics FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.weekly_statistics FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.weekly_statistics FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_weekly_stats_user ON public.weekly_statistics(user_id, year DESC, week DESC);

-- ============================================================================
-- 11. MONTHLY STATISTICS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.monthly_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year integer NOT NULL,
  month integer NOT NULL,
  focus_minutes integer NOT NULL DEFAULT 0,
  completed_tasks integer NOT NULL DEFAULT 0,
  completed_sessions integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, year, month)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.monthly_statistics TO authenticated;
GRANT ALL ON public.monthly_statistics TO service_role;
ALTER TABLE public.monthly_statistics ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.monthly_statistics;
DROP POLICY IF EXISTS "owner_insert" ON public.monthly_statistics;
DROP POLICY IF EXISTS "owner_update" ON public.monthly_statistics;
DROP POLICY IF EXISTS "owner_delete" ON public.monthly_statistics;
CREATE POLICY "owner_select" ON public.monthly_statistics FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.monthly_statistics FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.monthly_statistics FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.monthly_statistics FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_monthly_stats_user ON public.monthly_statistics(user_id, year DESC, month DESC);

-- ============================================================================
-- 12. USER SETTINGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme text NOT NULL DEFAULT 'system',
  language text NOT NULL DEFAULT 'en',
  notifications_enabled boolean NOT NULL DEFAULT true,
  sound_enabled boolean NOT NULL DEFAULT true,
  pomodoro_duration_minutes integer NOT NULL DEFAULT 25,
  short_break_duration_minutes integer NOT NULL DEFAULT 5,
  long_break_duration_minutes integer NOT NULL DEFAULT 15,
  sessions_until_long_break integer NOT NULL DEFAULT 4,
  auto_start_breaks boolean NOT NULL DEFAULT false,
  auto_start_pomodoros boolean NOT NULL DEFAULT false,
  extra jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_settings TO authenticated;
GRANT ALL ON public.user_settings TO service_role;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.user_settings;
DROP POLICY IF EXISTS "owner_insert" ON public.user_settings;
DROP POLICY IF EXISTS "owner_update" ON public.user_settings;
DROP POLICY IF EXISTS "owner_delete" ON public.user_settings;
CREATE POLICY "owner_select" ON public.user_settings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.user_settings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.user_settings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.user_settings FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ============================================================================
-- 13. NOTIFICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type public.notification_type NOT NULL DEFAULT 'info',
  title text NOT NULL,
  message text,
  data jsonb DEFAULT '{}'::jsonb,
  is_read boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.notifications;
DROP POLICY IF EXISTS "owner_insert" ON public.notifications;
DROP POLICY IF EXISTS "owner_update" ON public.notifications;
DROP POLICY IF EXISTS "owner_delete" ON public.notifications;
CREATE POLICY "owner_select" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.notifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.notifications FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read, created_at DESC);

-- ============================================================================
-- 14. SYNC QUEUE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.sync_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  operation_type public.sync_operation_type NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  sync_status public.sync_status_type NOT NULL DEFAULT 'pending',
  retry_count integer NOT NULL DEFAULT 0,
  last_error text,
  client_updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sync_queue TO authenticated;
GRANT ALL ON public.sync_queue TO service_role;
ALTER TABLE public.sync_queue ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "owner_select" ON public.sync_queue;
DROP POLICY IF EXISTS "owner_insert" ON public.sync_queue;
DROP POLICY IF EXISTS "owner_update" ON public.sync_queue;
DROP POLICY IF EXISTS "owner_delete" ON public.sync_queue;
CREATE POLICY "owner_select" ON public.sync_queue FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "owner_insert" ON public.sync_queue FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_update" ON public.sync_queue FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "owner_delete" ON public.sync_queue FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_sync_user_status ON public.sync_queue(user_id, sync_status, created_at);

-- ============================================================================
-- 15. updated_at TRIGGERS (function already exists)
-- ============================================================================
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'task_categories','tasks','pomodoro_sessions',
    'daily_statistics','weekly_statistics','monthly_statistics',
    'user_settings','sync_queue'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON public.%I', t);
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()', t);
  END LOOP;
END $$;

-- ============================================================================
-- 16. AUTO-CREATE user_settings ON SIGNUP (extend handle_new_user)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.email,
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 17. MIGRATE existing user_data JSONB -> new tables, then DROP
-- ============================================================================
DO $$
DECLARE
  r record;
  payload jsonb;
  t jsonb;
  s jsonb;
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
     WHERE table_schema = 'public' AND table_name = 'user_data'
  ) THEN
    FOR r IN EXECUTE 'SELECT user_id, data FROM public.user_data' LOOP
      payload := r.data;

      -- settings
      IF payload ? 'settings' AND jsonb_typeof(payload->'settings') = 'object' THEN
        INSERT INTO public.user_settings (user_id, extra)
        VALUES (r.user_id, payload->'settings')
        ON CONFLICT (user_id) DO UPDATE SET extra = EXCLUDED.extra, updated_at = now();
      END IF;

      -- tasks (best-effort)
      IF payload ? 'tasks' AND jsonb_typeof(payload->'tasks') = 'array' THEN
        FOR t IN SELECT * FROM jsonb_array_elements(payload->'tasks') LOOP
          BEGIN
            INSERT INTO public.tasks (user_id, title, description, status, priority, due_date, completed_at, created_at)
            VALUES (
              r.user_id,
              COALESCE(t->>'title', t->>'name', 'Untitled'),
              t->>'description',
              CASE WHEN (t->>'completed')::boolean IS TRUE OR t->>'status' = 'completed'
                   THEN 'completed'::public.task_status
                   ELSE COALESCE(NULLIF(t->>'status','')::public.task_status, 'pending'::public.task_status) END,
              COALESCE(NULLIF(t->>'priority','')::public.task_priority, 'medium'::public.task_priority),
              NULLIF(t->>'dueDate','')::timestamptz,
              NULLIF(t->>'completedAt','')::timestamptz,
              COALESCE(NULLIF(t->>'createdAt','')::timestamptz, now())
            );
          EXCEPTION WHEN OTHERS THEN
            -- skip malformed rows, keep migrating
            NULL;
          END;
        END LOOP;
      END IF;

      -- pomodoro sessions (best-effort)
      IF payload ? 'sessions' AND jsonb_typeof(payload->'sessions') = 'array' THEN
        FOR s IN SELECT * FROM jsonb_array_elements(payload->'sessions') LOOP
          BEGIN
            INSERT INTO public.pomodoro_sessions (user_id, session_type, duration_seconds, started_at, ended_at, completed, created_at)
            VALUES (
              r.user_id,
              COALESCE(NULLIF(s->>'type','')::public.pomodoro_session_type, 'focus'::public.pomodoro_session_type),
              COALESCE((s->>'duration')::int, 1500),
              COALESCE(NULLIF(s->>'startedAt','')::timestamptz, now()),
              NULLIF(s->>'endedAt','')::timestamptz,
              COALESCE((s->>'completed')::boolean, false),
              COALESCE(NULLIF(s->>'createdAt','')::timestamptz, now())
            );
          EXCEPTION WHEN OTHERS THEN
            NULL;
          END;
        END LOOP;
      END IF;
    END LOOP;

    DROP TABLE public.user_data CASCADE;
  END IF;
END $$;
