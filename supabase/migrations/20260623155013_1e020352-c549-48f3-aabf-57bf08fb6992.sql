
-- Owner-scoped policies for avatars / exports / backups
-- Files must be placed under "<user_id>/..." for the owner check to pass.

DO $$
DECLARE b text;
BEGIN
  FOREACH b IN ARRAY ARRAY['avatars', 'exports', 'backups'] LOOP
    EXECUTE format($p$
      DROP POLICY IF EXISTS "%1$s_owner_select" ON storage.objects;
      CREATE POLICY "%1$s_owner_select" ON storage.objects
        FOR SELECT TO authenticated
        USING (bucket_id = %1$L AND auth.uid()::text = (storage.foldername(name))[1]);

      DROP POLICY IF EXISTS "%1$s_owner_insert" ON storage.objects;
      CREATE POLICY "%1$s_owner_insert" ON storage.objects
        FOR INSERT TO authenticated
        WITH CHECK (bucket_id = %1$L AND auth.uid()::text = (storage.foldername(name))[1]);

      DROP POLICY IF EXISTS "%1$s_owner_update" ON storage.objects;
      CREATE POLICY "%1$s_owner_update" ON storage.objects
        FOR UPDATE TO authenticated
        USING (bucket_id = %1$L AND auth.uid()::text = (storage.foldername(name))[1])
        WITH CHECK (bucket_id = %1$L AND auth.uid()::text = (storage.foldername(name))[1]);

      DROP POLICY IF EXISTS "%1$s_owner_delete" ON storage.objects;
      CREATE POLICY "%1$s_owner_delete" ON storage.objects
        FOR DELETE TO authenticated
        USING (bucket_id = %1$L AND auth.uid()::text = (storage.foldername(name))[1]);
    $p$, b);
  END LOOP;
END $$;
