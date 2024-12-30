/*
  # Add Performance Indexes
  
  Adds indexes to improve query performance on frequently accessed columns.

  1. Indexes Added:
    - users: dni, status
    - companions: user_id, status  
    - reservations: user_id + date
    - entries: user_id
*/

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_dni ON users(dni);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Companions table indexes
CREATE INDEX IF NOT EXISTS idx_companions_user_id ON companions(user_id);
CREATE INDEX IF NOT EXISTS idx_companions_status ON companions(status);

-- Reservations table indexes
CREATE INDEX IF NOT EXISTS idx_reservations_user_date ON reservations(user_id, date);

-- Entries table indexes
CREATE INDEX IF NOT EXISTS idx_entries_user_type ON entries(user_id);