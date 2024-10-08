import { Badge } from "@/components/ui/badge";

interface Props {
  tags: string[];
}

const BlogTags = ({ tags }: Props) => {
  return (
    <div className="flex gap-3 mt-0.5">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="bg-pink-500 text-white">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default BlogTags;
