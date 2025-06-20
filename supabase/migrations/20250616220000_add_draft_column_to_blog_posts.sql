-- Add a 'draft' column to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS draft BOOLEAN DEFAULT true;

-- Backfill: Set draft=false for all currently published posts
UPDATE public.blog_posts SET draft = false WHERE published = true; 