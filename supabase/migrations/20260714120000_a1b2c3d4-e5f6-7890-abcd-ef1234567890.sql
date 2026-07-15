-- Add notes column to tasks table.
-- The local Task type already has an optional `notes` field used in the
-- EditTaskSheet, but it was never persisted to the database.
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS notes text;
