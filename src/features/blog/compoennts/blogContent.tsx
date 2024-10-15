import H1 from "@/components/typography/h1";
import H2 from "@/components/typography/h2";
import H3 from "@/components/typography/h3";
import H4 from "@/components/typography/h4";
import H5 from "@/components/typography/h5";
import H6 from "@/components/typography/h6";
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
            h1: ({ ...props }) => <H1 {...props} />,
            h2: ({ ...props }) => <H2 {...props} />,
            h3: ({ ...props }) => <H3 {...props} />,
            h4: ({ ...props }) => <H4 {...props} />,
            h5: ({ ...props }) => <H5 {...props} />,
            h6: ({ ...props }) => <H6 {...props} />,
            p: ({ ...props }) => (
              <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="ml-6 list-disc [&>li]:mt-0.5" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="ml-6 list-decimal [&>li]:mt-0.5" {...props} />
            ),
            blockquote: ({ ...props }) => (
              <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
            ),
            code: ({ ...props }) => (
              <code className="px-1 py-0.5 rounded bg-muted" {...props} />
            ),
            pre: ({ ...props }) => (
              <pre
                className="overflow-x-auto rounded bg-muted my-1.5 px-1 py-0.5"
                {...props}
              />
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
