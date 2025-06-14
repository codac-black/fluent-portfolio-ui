
-- Create storage bucket for blog assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-assets', 'blog-assets', true);

-- Create policy to allow public read access to blog assets
CREATE POLICY "Public read access for blog assets" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-assets');

-- Create policy to allow authenticated users to upload blog assets
CREATE POLICY "Authenticated users can upload blog assets" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-assets' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete blog assets
CREATE POLICY "Authenticated users can delete blog assets" ON storage.objects
FOR DELETE USING (bucket_id = 'blog-assets' AND auth.role() = 'authenticated');
