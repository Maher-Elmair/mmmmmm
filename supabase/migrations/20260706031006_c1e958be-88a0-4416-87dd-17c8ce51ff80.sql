
-- Auto-derive daily/weekly/monthly statistics from pomodoro_sessions and tasks.

CREATE OR REPLACE FUNCTION public.apply_pomodoro_stats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  d date;
  y int; mo int; wk int; iy int;
  focus_delta int := 0;
  break_delta int := 0;
  completed_delta int := 0;
  interrupted_delta int := 0;
BEGIN
  IF NEW.session_type = 'focus' THEN
    IF NEW.completed THEN
      focus_delta := GREATEST(0, round(NEW.duration_seconds / 60.0)::int);
      completed_delta := 1;
    ELSIF NEW.interrupted THEN
      interrupted_delta := 1;
    END IF;
  ELSE
    IF NEW.completed THEN
      break_delta := GREATEST(0, round(NEW.duration_seconds / 60.0)::int);
    END IF;
  END IF;

  d := (NEW.started_at)::date;
  y := extract(year from d)::int;
  mo := extract(month from d)::int;
  iy := extract(isoyear from d)::int;
  wk := extract(week from d)::int;

  INSERT INTO public.daily_statistics
    (user_id, date, focus_minutes, break_minutes, completed_sessions, interrupted_sessions)
  VALUES (NEW.user_id, d, focus_delta, break_delta, completed_delta, interrupted_delta)
  ON CONFLICT (user_id, date) DO UPDATE SET
    focus_minutes        = daily_statistics.focus_minutes        + EXCLUDED.focus_minutes,
    break_minutes        = daily_statistics.break_minutes        + EXCLUDED.break_minutes,
    completed_sessions   = daily_statistics.completed_sessions   + EXCLUDED.completed_sessions,
    interrupted_sessions = daily_statistics.interrupted_sessions + EXCLUDED.interrupted_sessions,
    updated_at = now();

  INSERT INTO public.weekly_statistics (user_id, year, week, focus_minutes, completed_sessions)
  VALUES (NEW.user_id, iy, wk, focus_delta, completed_delta)
  ON CONFLICT (user_id, year, week) DO UPDATE SET
    focus_minutes      = weekly_statistics.focus_minutes      + EXCLUDED.focus_minutes,
    completed_sessions = weekly_statistics.completed_sessions + EXCLUDED.completed_sessions,
    updated_at = now();

  INSERT INTO public.monthly_statistics (user_id, year, month, focus_minutes, completed_sessions)
  VALUES (NEW.user_id, y, mo, focus_delta, completed_delta)
  ON CONFLICT (user_id, year, month) DO UPDATE SET
    focus_minutes      = monthly_statistics.focus_minutes      + EXCLUDED.focus_minutes,
    completed_sessions = monthly_statistics.completed_sessions + EXCLUDED.completed_sessions,
    updated_at = now();

  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_apply_pomodoro_stats ON public.pomodoro_sessions;
CREATE TRIGGER trg_apply_pomodoro_stats
AFTER INSERT ON public.pomodoro_sessions
FOR EACH ROW EXECUTE FUNCTION public.apply_pomodoro_stats();


CREATE OR REPLACE FUNCTION public.apply_task_completed_stats()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE d date; BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM 'completed') THEN
    d := COALESCE(NEW.completed_at, now())::date;

    INSERT INTO public.daily_statistics (user_id, date, completed_tasks)
    VALUES (NEW.user_id, d, 1)
    ON CONFLICT (user_id, date) DO UPDATE SET
      completed_tasks = daily_statistics.completed_tasks + 1, updated_at = now();

    INSERT INTO public.weekly_statistics (user_id, year, week, completed_tasks)
    VALUES (NEW.user_id, extract(isoyear from d)::int, extract(week from d)::int, 1)
    ON CONFLICT (user_id, year, week) DO UPDATE SET
      completed_tasks = weekly_statistics.completed_tasks + 1, updated_at = now();

    INSERT INTO public.monthly_statistics (user_id, year, month, completed_tasks)
    VALUES (NEW.user_id, extract(year from d)::int, extract(month from d)::int, 1)
    ON CONFLICT (user_id, year, month) DO UPDATE SET
      completed_tasks = monthly_statistics.completed_tasks + 1, updated_at = now();
  END IF;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS trg_apply_task_completed_stats ON public.tasks;
CREATE TRIGGER trg_apply_task_completed_stats
AFTER UPDATE OF status ON public.tasks
FOR EACH ROW EXECUTE FUNCTION public.apply_task_completed_stats();
