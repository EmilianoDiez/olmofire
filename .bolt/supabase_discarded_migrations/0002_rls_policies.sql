-- 0002_rls_policies.sql

/*
  # Row-Level Security Policies
*/

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" 
ON users 
FOR SELECT 
TO authenticated 
USING ((select auth.uid()) = id);

CREATE POLICY "Users can modify their own data" 
ON users 
FOR UPDATE 
TO authenticated 
USING ((select auth.uid()) = id) 
WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can view their own companions" 
ON companions 
FOR SELECT 
TO authenticated 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can modify their own companions" 
ON companions 
FOR UPDATE 
TO authenticated 
USING ((select auth.uid()) = user_id) 
WITH CHECK ((select auth.uid()) = user_id);