/*
  # Row Level Security Policies

  1. Table Security
    - Enable RLS on all tables
    - Ensures data access is controlled through policies
  
  2. User Policies
    - Read: Users can only read their own data
    - Update: Users can only update their own data
  
  3. Companion Policies
    - Read: Users can only read their own companions
    - Update: Users can only update their own companions

  Note: All policies use auth.uid() to ensure proper user isolation
*/

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Users table policies
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can read own data'
    ) THEN
        CREATE POLICY "Users can read own data" ON users
            FOR SELECT USING (auth.uid() = id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname = 'Users can update own data'
    ) THEN
        CREATE POLICY "Users can update own data" ON users
            FOR UPDATE USING (auth.uid() = id);
    END IF;
END $$;

-- Companions table policies
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'companions' AND policyname = 'Users can read own companions'
    ) THEN
        CREATE POLICY "Users can read own companions" ON companions
            FOR SELECT USING (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'companions' AND policyname = 'Users can update own companions'
    ) THEN
        CREATE POLICY "Users can update own companions" ON companions
            FOR UPDATE USING (user_id = auth.uid());
    END IF;
END $$;