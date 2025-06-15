-- Create a table for blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL DEFAULT 'General',
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL DEFAULT 'Bruno Maisiba',
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  image_url TEXT,
  read_time TEXT DEFAULT '5 min read',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to control access
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy that allows everyone to read published posts
CREATE POLICY "Anyone can view published blog posts" 
  ON public.blog_posts 
  FOR SELECT 
  USING (published = true);

-- Create policy that allows authenticated users to manage all posts (for admin)
CREATE POLICY "Authenticated users can manage blog posts" 
  ON public.blog_posts 
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create an index on slug for faster lookups
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

-- Create an index on published and created_at for efficient queries
CREATE INDEX idx_blog_posts_published_created ON public.blog_posts(published, created_at DESC);

-- Create function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON public.blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
