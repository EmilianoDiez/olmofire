-- 0001_functions.sql

/*
  # User and Companion Management Functions
*/

-- Function to approve a user
CREATE OR REPLACE FUNCTION approve_user(user_id_param uuid)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET status = 'approved'
  WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reject a user
CREATE OR REPLACE FUNCTION reject_user(user_id_param uuid)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET status = 'rejected'
  WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to approve a companion
CREATE OR REPLACE FUNCTION approve_companion(companion_id_param uuid)
RETURNS void AS $$
BEGIN
  UPDATE companions
  SET status = 'approved'
  WHERE id = companion_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reject a companion
CREATE OR REPLACE FUNCTION reject_companion(companion_id_param uuid)
RETURNS void AS $$
BEGIN
  UPDATE companions
  SET status = 'rejected'
  WHERE id = companion_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;