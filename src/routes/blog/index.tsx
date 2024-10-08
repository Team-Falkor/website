import BlogCard from "@/features/blog/compoennts/cards/blog";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="px-6 mx-auto max-w-7xl lg:px-8 mt-52">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
}
