/*
  # Fix user_subscriptions RLS policy

  1. Changes
    - Update INSERT policy to use correct auth.uid() function
    - Update SELECT policy to use correct auth.uid() function
    
  2. Security
    - Maintains RLS enabled on user_subscriptions table
    - Fixes policy to properly check user authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to insert their own subscriptions" ON user_subscriptions;
DROP POLICY IF EXISTS "Allow users to view their own subscriptions" ON user_subscriptions;

-- Recreate policies with correct auth.uid() function
CREATE POLICY "Allow users to insert their own subscriptions"
ON user_subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to view their own subscriptions"
ON user_subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);