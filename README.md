# Svelte Supbase & Square Skeleton Project


## create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app

npm run check
```

## Adding Dependencies

```bash
npm install square
npm install @supabase/supabase-js @supabase/ssr
```
## Set up environment variables

Create a .env.local file in your project root directory.

```bash
PUBLIC_SUPABASE_URL=<your_supabase_project_url>
PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
VITE_SQUARE_ACCESS_TOKEN=<your_square_access_token>
PUBLIC_SQUAREUP_APP_ID=<your_square_app_id>
PUBLIC_SQUAREUP_LOCATION_ID=<your_square_location_id>
```


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash

npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Create you Data Base


```sql
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

```

### Create Service Plan Tables 

```sql
CREATE TABLE ServicePlans (
    plan_id SERIAL PRIMARY KEY,
    plan_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INTEGER NOT NULL, -- duration in days
    features JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes to improve performance on common queries
CREATE INDEX idx_plan_name ON ServicePlans(plan_name);
CREATE INDEX idx_price ON ServicePlans(price);
CREATE INDEX idx_duration ON ServicePlans(duration);

-- Trigger to automatically update the updated_at field
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp_trigger
BEFORE UPDATE ON ServicePlans
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();
```

```sql
 
INSERT INTO ServicePlans (plan_name, description, price, duration, features)
VALUES
('Free Plan', 'Access to limited features with no cost', 0.00, 30, 'Limited Feature 1, Limited Feature 2'),
('Basic Plan', 'Access to basic features and support', 5.00, 30, 'Feature 1, Feature 2'),
('Premium Plan', 'Access to premium features and priority support', 10.00, 30, 'Feature 1, Feature 2, Feature 3');
```