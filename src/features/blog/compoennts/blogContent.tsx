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
              <h1
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="scroll-m-20 text-2xl font-semibold tracking-tight"
                {...props}
              />
            ),
            h4: ({ ...props }) => (
              <h4
                className="scroll-m-20 text-xl font-semibold tracking-tight"
                {...props}
              />
            ),
            h5: ({ ...props }) => (
              <h5
                className="scroll-m-20 text-lg font-semibold tracking-tight"
                {...props}
              />
            ),
            h6: ({ ...props }) => (
              <h6
                className="scroll-m-20 text-base font-semibold tracking-tight"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="ml-6 list-disc [&>li]:mt-2" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal ml-6 space-y-1" {...props} />
            ),
            blockquote: ({ ...props }) => (
              <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
            ),
            code: ({ ...props }) => (
              <code className="px-1 py-0.5 rounded" {...props} />
            ),
            table: ({ ...props }) => (
              <table className="my-6 w-full overflow-y-auto" {...props} />
            ),
            tr: ({ ...props }) => (
              <tr className="m-0 border-t p-0 even:bg-muted" {...props} />
            ),
            th: ({ ...props }) => (
              <th
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                {...props}
              />
            ),
            td: ({ ...props }) => (
              <td
                className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                {...props}
              />
            ),
            br: ({ ...props }) => <br {...props} />,
            a: ({ ...props }) => (
              <a className="text-primary underline" {...props} />
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
