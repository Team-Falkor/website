import { Badge } from "@/components/ui/badge";
import BlogContent from "@/features/blog/compoennts/blogContent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$id")({
  component: BlogId,
});

const code =
  "```javascript\nconsole.log('hello world');\nconst foo = 'bar';\n```";

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

      
![Alt text](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHZydnd6NG5ub3h3eDQ3ajQxb3NmeDJkZTcybzR3bWg5d3FkN3FoMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0ErCmOYrV5xEtfY4/giphy.webp)

${code}

A table:

| a | b |
| - | - |
`;

function BlogId() {
  return (
    <div className="px-4 mx-auto max-w-7xl lg:px-8 mt-20">
      {/* BLOG HEADER */}
      <div className="flex flex-col mb-6 space-y-4 ">
        <h1 className="text-4xl font-bold leading-tight text-primary mb-1 lg:text-5xl">
          Blog Post Title
        </h1>
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
    </div>
  );
}

export default BlogId;
