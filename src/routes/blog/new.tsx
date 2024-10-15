import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import BlogContent from "@/features/blog/compoennts/blogContent";
import MarkdownToolbar from "@/features/blog/compoennts/mdToolbar";
import NewTags from "@/features/blog/compoennts/newTags/index";
import BlogTitle from "@/features/blog/compoennts/title";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/blog/new")({
  component: BlogNew,
});

function BlogNew() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("Post Title");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const maxTags = 4;

  // Function to handle adding a new empty tag
  const handleAddTag = () => {
    setTags([...tags, ""]); // Append a new empty tag
  };

  // Function to handle updating a tag's content
  const handleTagChange = (index: number, content: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = content;
    setTags(updatedTags);
  };

  return (
    <div className="px-6 mx-auto max-w-7xl lg:px-8 mt-10 flex flex-col">
      <Tabs defaultValue="edit" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <div className="mt-5 mb-3">
          <BlogTitle
            title={title}
            onChange={(e) => setTitle(e.currentTarget.innerHTML)}
            contentEditable={true}
            suppressContentEditableWarning={true}
            className="w-full focus-visible:outline-none"
          />

          {/* NEW TAGS SECTION */}
          <div className="w-full flex items-center gap-2">
            <NewTags tags={tags} onTagChange={handleTagChange} />
            <Button
              onClick={handleAddTag}
              variant="ghost"
              size="icon"
              disabled={tags.length >= maxTags}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>

        <TabsContent value="edit">
          <MarkdownToolbar textareaRef={textareaRef} />

          <Textarea
            ref={textareaRef}
            className="size-full min-h-[40rem] resize-y focus-visible:ring-0 p-3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
