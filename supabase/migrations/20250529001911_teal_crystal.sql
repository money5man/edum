/*
  # Add INSERT policy for user subscriptions

  1. Security Changes
    - Add RLS policy to allow authenticated users to insert their own subscriptions
    - Policy ensures users can only create subscriptions for themselves
    - Maintains data integrity by linking subscriptions to the correct user

  Note: Existing SELECT policy remains unchanged
*/

CREATE POLICY "Allow users to insert their own subscriptions"
  ON user_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);