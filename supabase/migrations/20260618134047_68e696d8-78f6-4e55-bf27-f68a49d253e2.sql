-- update_updated_at_column does not need SECURITY DEFINER (called only by triggers)
ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER;

-- Revoke direct execute from anon/authenticated; triggers still run them as the table owner
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;