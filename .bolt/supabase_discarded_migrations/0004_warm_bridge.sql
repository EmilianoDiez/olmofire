/*
  # Initial Schema Setup

  1. Tables Created
    - users: Stores affiliate information
      - id (uuid, primary key)
      - name (text)
      - email (text, unique)
      - phone (text, optional)
      - dni (text, unique)
      - status (text: pending/approved/rejected)
      - created_at (timestamptz)
    
    - companions: Stores affiliate companions
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - name (text)
      - dni (text)
      - age (integer, 0-120)
      - phone (text, optional)
      - status (text: pending/approved/rejected)
      - created_at (timestamptz)
    
    - reservations: Stores pool reservations
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - date (date)
      - status (text: active/completed/cancelled)
      - created_at (timestamptz)
    
    - entries: Stores pool entry records
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - companion_id (uuid, foreign key)
      - entry_date (date)
      - entry_time (time)

  2. Relationships
    - companions.user_id references users.id
    - reservations.user_id references users.id
    - entries.user_id references users.id
    - entries.companion_id references companions.id
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  dni text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Create companions table
CREATE TABLE IF NOT EXISTS companions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  dni text NOT NULL,
  age integer NOT NULL CHECK (age >= 0 AND age <= 120),
  phone text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Create entries table
CREATE TABLE IF NOT EXISTS entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  companion_id uuid REFERENCES companions(id) ON DELETE CASCADE,
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  entry_time time NOT NULL DEFAULT CURRENT_TIME
);