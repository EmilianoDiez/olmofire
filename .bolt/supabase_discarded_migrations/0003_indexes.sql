-- 0003_indexes.sql

/*
  # Indexes for Performance Optimization
*/

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_dni ON users(dni);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Indexes for companions table
CREATE INDEX IF NOT EXISTS idx_companions_user_id ON companions(user_id);
CREATE INDEX IF NOT EXISTS idx_companions_status ON companions(status);

-- Indexes for reservations table
CREATE INDEX IF NOT EXISTS idx_reservations_user_date ON reservations(user_id, date);

-- Indexes for entries table
CREATE INDEX IF NOT EXISTS idx_entries_user_type ON entries(user_id);