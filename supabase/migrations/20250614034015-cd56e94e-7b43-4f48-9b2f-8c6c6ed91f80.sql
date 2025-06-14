
-- Drop the existing policy that requires authentication
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON public.blog_posts;

-- Create a new policy that allows anyone to manage blog posts (for development/testing)
-- You should implement proper authentication later for production use
CREATE POLICY "Anyone can manage blog posts" 
  ON public.blog_posts 
  FOR ALL
  USING (true)
  WITH CHECK (true);
