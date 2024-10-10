import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import renarkReHyupe from "remark-rehype";

interface Props {
  content: string;
  className?: string;
}

const BlogContent = ({ content, className }: Props) => {
  return (
    <Card className="shadow-lg">
      <CardContent className={cn("py-3 min-h-24", className)}>
        <Markdown
          allowElement={() => true}
          remarkPlugins={[remarkGfm, remarkBreaks, renarkReHyupe]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-3xl font-bold my-4 lg:my-6" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-2xl font-semibold my-3 lg:my-5" {...props} />
            ),
            p: ({ ...props }) => (
              <p
                className="text-base leading-relaxed my-2 whitespace-pre-wrap"
                {...props}
              />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc ml-6 space-y-1" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal ml-6 space-y-1" {...props} />
            ),
            blockquote: ({ ...props }) => (
              <blockquote className="border-l-4 pl-4 italic  my-4" {...props} />
            ),
            code: ({ ...props }) => (
              <code className="px-1 py-0.5 rounded" {...props} />
            ),
            table: ({ ...props }) => (
              <table
                className="min-w-full text-left border-collapse my-6"
                {...props}
              />
            ),
            th: ({ ...props }) => (
              <th className="px-4 py-2 font-semibold border" {...props} />
            ),
            td: ({ ...props }) => (
              <td className="px-4 py-2 border" {...props} />
            ),
            br: ({ ...props }) => <br {...props} />,
            a: ({ ...props }) => (
              <a
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
          }}
        >
          {content}
        </Markdown>
      </CardContent>
    </Card>
  );
};

export default BlogContent;
