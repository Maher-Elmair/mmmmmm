
-- Enable Realtime broadcasting for all tables the app needs cross-device sync on.
ALTER PUBLICATION supabase_realtime ADD TABLE public.tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pomodoro_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pomodoro_cycles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_statistics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.weekly_statistics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.monthly_statistics;

-- REPLICA IDENTITY FULL so UPDATE/DELETE payloads carry the full old row
-- (needed for correct client-side reconciliation and filtering by user_id).
ALTER TABLE public.tasks REPLICA IDENTITY FULL;
ALTER TABLE public.user_settings REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.pomodoro_sessions REPLICA IDENTITY FULL;
ALTER TABLE public.pomodoro_cycles REPLICA IDENTITY FULL;
ALTER TABLE public.daily_statistics REPLICA IDENTITY FULL;
ALTER TABLE public.weekly_statistics REPLICA IDENTITY FULL;
ALTER TABLE public.monthly_statistics REPLICA IDENTITY FULL;
