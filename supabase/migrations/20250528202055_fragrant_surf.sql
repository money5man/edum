-- Create subscription_plans table
CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal NOT NULL,
  duration interval NOT NULL,
  features jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_subscriptions table
CREATE TABLE user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  plan_id uuid REFERENCES subscription_plans ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'active',
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to subscription plans"
  ON subscription_plans FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow users to view their own subscriptions"
  ON user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, price, duration, features) VALUES
  ('Basic', 9.99, interval '1 month', '["Access to basic activities", "Limited games", "Email support"]'),
  ('Premium', 19.99, interval '1 month', '["Access to all activities", "All games", "Priority support", "Progress tracking"]'),
  ('Family', 29.99, interval '1 month', '["Up to 4 child profiles", "All premium features", "Family dashboard", "24/7 support"]');