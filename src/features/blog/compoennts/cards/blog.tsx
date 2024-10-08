import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const BlogCard = () => {
  return (
    <Card className="aspect-square hover:bg-muted cursor-pointer transition-all">
      <CardHeader className="pb-2">
        <h2 className="text-xl font-bold line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo vitae
          iure esse ratione natus, accusamus reiciendis doloremque eum similique
          laborum reprehenderit, illum exercitationem error aliquam animi
          expedita tempore atque ab.
        </h2>
        {/* TAGS */}
        <div className="flex gap-2 mt-1.5">
          <Badge variant="secondary" className="bg-pink-400">
            Read all about it
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-2">
        <div className="flex w-full h-full">
          <p className="line-clamp-[9] text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
            dolor! Harum vero exercitationem natus quasi id soluta, facilis,
            eius explicabo animi beatae ipsum? Ea necessitatibus consectetur est
            labore assumenda. Eum! Voluptatem maiores expedita eveniet illum
            rem, sint quidem ipsa molestias sapiente dolores optio ipsum
            adipisci dolorem praesentium quae ea error quasi dolor ducimus minus
            veniam in quis cupiditate enim? Atque!
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-start justify-between flex-col">
          <p className="text-sm text-muted-foreground">
            posted by <span className="font-bold">Falkor</span>
          </p>
          <p className="text-xs text-muted-foreground">
            At <time dateTime="2022-01-01">January 1, 2022</time>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
