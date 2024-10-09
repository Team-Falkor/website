import { useState } from "react";

interface Tag {
  name: string;
  color: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  authorId: number;
  public: boolean;
  tags: Tag[];
}

const API_URL = "/api/blogs"; // Adjust the URL as needed

const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (blogData: Omit<Blog, "id"> & { bool: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${blogData.bool}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        throw new Error("Failed to create blog");
      }
      const newBlog = await response.json();
      setBlogs((prev) => [...prev, newBlog]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (id: number, blogData: Omit<Blog, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        throw new Error("Failed to update blog");
      }
      const updatedBlog = await response.json();
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === id ? updatedBlog.updatedBlog : blog))
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
  };
};

export default useBlogs;
