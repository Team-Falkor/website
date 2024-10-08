import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import BlogContent from "@/features/blog/compoennts/blogContent";
import BlogTitle from "@/features/blog/compoennts/title";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/blog/new")({
  component: BlogNew,
});

function BlogNew() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("Post Title");
  const [content, setContent] = useState("");

  return (
    <div className="px-6 mx-auto max-w-7xl lg:px-8 mt-10 flex flex-col">
      <Tabs defaultValue="edit" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <div className="mt-5 mb-1">
          <BlogTitle
            title={title}
            onChange={(e) => setTitle(e.currentTarget.innerHTML)}
            contentEditable={true}
            className="w-full  p-2 focus-visible:outline-none"
          />
        </div>

        <TabsContent value="edit">
          <Textarea
            ref={textAreaRef}
            className="size-full min-h-[40rem] resize-y focus-visible:ring-0 p-3"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </TabsContent>

        <TabsContent value="preview">
          <BlogContent content={content} className="min-h-[40rem]" />
        </TabsContent>
      </Tabs>
      <div className="w-full flex justify-end mt-5 gap-2.5">
        <Button variant={"destructive"}>Delete</Button>
        <Button variant={"secondary"}>Draft</Button>
        <Button variant={"secondary"}>Publish</Button>
      </div>
    </div>
  );
}

export default BlogNew;
