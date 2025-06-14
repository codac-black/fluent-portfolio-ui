import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/blog/RichTextEditor';
import ImageUpload from '@/components/blog/ImageUpload';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
  image_url: string | null;
  read_time: string;
  created_at: string;
  updated_at: string;
}

const BlogAdmin = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'General',
    tags: '',
    author: 'Alex Chen',
    featured: false,
    published: false,
    image_url: '',
    read_time: '5 min read'
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all blog posts (including unpublished ones for admin)
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['adminBlogPosts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  // Create or update blog post
  const saveMutation = useMutation({
    mutationFn: async (postData: any) => {
      const tagsArray = postData.tags ? postData.tags.split(',').map((tag: string) => tag.trim()) : [];
      
      const blogPost = {
        ...postData,
        tags: tagsArray,
        slug: postData.slug || postData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      };

      if (editingPost) {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(blogPost)
          .eq('id', editingPost.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([blogPost])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      resetForm();
      toast({
        title: "Success",
        description: `Blog post ${editingPost ? 'updated' : 'created'} successfully!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save blog post",
        variant: "destructive",
      });
    },
  });

  // Delete blog post
  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'General',
      tags: '',
      author: 'Alex Chen',
      featured: false,
      published: false,
      image_url: '',
      read_time: '5 min read'
    });
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category,
      tags: post.tags?.join(', ') || '',
      author: post.author,
      featured: post.featured,
      published: post.published,
      image_url: post.image_url || '',
      read_time: post.read_time
    });
    setIsCreating(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const handleImageUploaded = (url: string) => {
    setFormData({ ...formData, image_url: url });
  };

  const handleImageRemoved = () => {
    setFormData({ ...formData, image_url: '' });
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Administration</h1>
        <Button onClick={() => setIsCreating(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Post Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  placeholder="URL Slug (auto-generated if empty)"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <ImageUpload
                  onImageUploaded={handleImageUploaded}
                  currentImage={formData.image_url}
                  onImageRemoved={handleImageRemoved}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Post Excerpt</label>
                <Input
                  placeholder="Brief description of the post"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Post Content</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Write your blog post content here..."
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                <Input
                  placeholder="Read Time"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2"
                  />
                  Featured Post
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="mr-2"
                  />
                  Published
                </label>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Posts List */}
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    {post.featured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Featured</span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.category}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span>{post.read_time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMutation.mutate(post.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <Card className="p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts created yet</h3>
          <p className="text-gray-600 mb-4">Create your first blog post to get started!</p>
          <Button onClick={() => setIsCreating(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Create First Post
          </Button>
        </Card>
      )}
    </div>
  );
};

export default BlogAdmin;
