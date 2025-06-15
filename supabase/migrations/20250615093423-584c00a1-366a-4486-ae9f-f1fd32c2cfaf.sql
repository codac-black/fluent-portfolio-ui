
-- 1. Create a roles enum (run only if not already created)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
  END IF;
END$$;

-- 2. Create the user_roles table (run only if not already created)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='user_roles') THEN
    CREATE TABLE public.user_roles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
        role public.app_role NOT NULL,
        UNIQUE (user_id, role)
    );
  END IF;
END$$;

-- 3. Role check function (security definer, avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

-- 4. Enable RLS and add policies for user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only allow user to view or update their own roles, except:
-- Allow admin to see all (via has_role function)
CREATE POLICY "Users can view their own roles or admin can view all" ON public.user_roles
FOR SELECT USING (
  (auth.uid() = user_id) OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can insert their own user account (trigger assigns roles)" ON public.user_roles
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User or admin can update their role" ON public.user_roles
FOR UPDATE USING (
  (auth.uid() = user_id) OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "User or admin can delete their role" ON public.user_roles
FOR DELETE USING (
  (auth.uid() = user_id) OR public.has_role(auth.uid(), 'admin')
);

-- 5. Trigger: Give the very first signed-up user the admin role, others get user
CREATE OR REPLACE FUNCTION public.grant_initial_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_count integer;
BEGIN
  SELECT COUNT(*) INTO user_count FROM auth.users;
  -- If this is the first user, give admin
  IF user_count = 1 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;

-- Remove previous trigger if it exists.
DROP TRIGGER IF EXISTS on_auth_user_created_assign_role ON auth.users;

-- Add trigger to assign role on sign up
CREATE TRIGGER on_auth_user_created_assign_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.grant_initial_role();

-- 6. Restrict blog_posts "write" to admins, but "read" published to all
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Only allow "read" (SELECT) for published posts or if user is admin
CREATE POLICY "Public can read published posts; admin can read all" ON public.blog_posts
FOR SELECT USING (
  (published = true)
  OR public.has_role(auth.uid(), 'admin')
);

-- CORRECTED: Remove USING from insert, use only WITH CHECK
CREATE POLICY "Admin can modify posts (insert)" ON public.blog_posts
FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can modify posts (update)" ON public.blog_posts
FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin can modify posts (delete)" ON public.blog_posts
FOR DELETE USING (public.has_role(auth.uid(), 'admin'));
