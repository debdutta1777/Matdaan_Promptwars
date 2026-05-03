DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.date_feedback;

CREATE POLICY "Anyone can submit valid feedback"
ON public.date_feedback
FOR INSERT
WITH CHECK (
  length(btrim(message)) BETWEEN 1 AND 2000
  AND (contact IS NULL OR length(contact) <= 200)
  AND (state_code IS NULL OR length(state_code) <= 8)
  AND (state_name IS NULL OR length(state_name) <= 100)
);
