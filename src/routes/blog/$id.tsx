import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogContent from "@/features/blog/compoennts/blogContent";
import BlogTitle from "@/features/blog/compoennts/title";
import { createFileRoute } from "@tanstack/react-router";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export const Route = createFileRoute("/blog/$id")({
  component: BlogId,
});

const markdown = `test`;
function BlogId() {
  return (
    <div className="px-4 mx-auto max-w-7xl lg:px-8 mt-20 pb-10">
      {/* BLOG HEADER */}
      <div className="flex flex-col mb-6 space-y-4 items-start">
        {/* AUTHOR AND TIME */}
        <div className="flex gap-2 items-center -mb-2">
          <p className="text-sm text-gray-300">By flww at 2/2/2022</p>
        </div>

        <BlogTitle title="STEAM DECK PIRATES RETRODECK GUIDE" />

        {/* TAGS */}
        <div className="flex gap-3 mt-0.5">
          <Badge variant="secondary" className="bg-pink-500 text-white">
            Read all about it
          </Badge>
          <Badge variant="secondary" className="bg-green-500 text-white">
            Featured
          </Badge>
        </div>
      </div>

      {/* BLOG CONTENT */}
      <BlogContent content={markdown} />

      <div className="flex justify-start py-5 gap-2">
        <Button variant={"ghost"}>
          <div className="flex gap-2 items-center">
            <ThumbsUp />
            <p>25</p>
          </div>
        </Button>

        <Button variant={"ghost"}>
          <div className="flex gap-2 items-center">
            <ThumbsDown />
            <p>1</p>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default BlogId;
