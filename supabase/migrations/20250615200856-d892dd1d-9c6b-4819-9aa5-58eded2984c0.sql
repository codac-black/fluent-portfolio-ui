
-- Remove all relevant existing blog_posts policies to guarantee a secure baseline
DROP POLICY IF EXISTS "Anyone can view published blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can read published posts; admin can read all" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can modify posts (insert)" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can modify posts (update)" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can modify posts (delete)" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin can delete blog posts" ON public.blog_posts;

-- Re-create secure blog_posts policies
CREATE POLICY "Public can read published posts; admin can read all" ON public.blog_posts
FOR SELECT USING (
  (published = true) OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin can insert blog posts" ON public.blog_posts
FOR INSERT WITH CHECK (
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin can update blog posts" ON public.blog_posts
FOR UPDATE USING (
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin can delete blog posts" ON public.blog_posts
FOR DELETE USING (
  public.has_role(auth.uid(), 'admin')
);

-- Remove any existing "anyone" user_roles policy (if present)
DROP POLICY IF EXISTS "Anyone can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles or admin can view all" ON public.user_roles;
DROP POLICY IF EXISTS "Users can insert their own user account (trigger assigns roles)" ON public.user_roles;
DROP POLICY IF EXISTS "User or admin can update their role" ON public.user_roles;
DROP POLICY IF EXISTS "User or admin can delete their role" ON public.user_roles;

-- Tight user_roles policies for security
CREATE POLICY "Users can view their own roles or admin can view all" ON public.user_roles
FOR SELECT USING (
  (auth.uid() = user_id) OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Users can insert their own user account (trigger assigns roles)" ON public.user_roles
FOR INSERT WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "User or admin can update their role" ON public.user_roles
FOR UPDATE USING (
  (auth.uid() = user_id) OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "User or admin can delete their role" ON public.user_roles
FOR DELETE USING (
  (auth.uid() = user_id) OR public.has_role(auth.uid(), 'admin')
);
