import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils";
import { useRef, useState } from "react";

interface Props {
  tags: string[];
  onTagChange: (index: number, content: string) => void;
}

const NewTags = ({ tags, onTagChange }: Props) => {
  const [openTag, setOpenTag] = useState<number | null>(null);
  const [colors, setColors] = useState<string[]>(
    Array(tags.length).fill("#ffffff") // Default color for all tags
  );

  // Function to handle color change for a specific tag with debouncing
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleColorChange = (index: number, color: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const updatedColors = [...colors];
      updatedColors[index] = color; // Update color for the specific tag
      setColors(updatedColors);
    }, 500);
  };

  if (!tags.length) return null;

  return (
    <div className={cn("flex gap-2 items-center")}>
      {tags.map((tag, index) => (
        <Popover
          key={index}
          open={openTag === index}
          onOpenChange={(open) => {
            if (!open) setOpenTag(null);
          }}
        >
          <PopoverTrigger>
            <Badge
              contentEditable={true}
              variant={"secondary"}
              className={cn(
                "!outline-none !ring-0 !ring-offset-0 transition-all"
              )}
              style={{ backgroundColor: colors[index] }} // Apply background color
              suppressContentEditableWarning={true} // To avoid warnings for contentEditable
              onBlur={(e) => onTagChange(index, e.target.innerText)} // Update content on losing focus
              onDoubleClick={() => setOpenTag(index)} // Open color picker on double-click
            >
              {tag?.length < 1 ? "New Tag" : tag}
            </Badge>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <div className="flex items-center gap-5">
              <Label htmlFor={`color-${index}`}>Color</Label>
              <Input
                id={`color-${index}`}
                type="color"
                value={colors[index]}
                className="p-0 !ring-0 !ring-offset-0 !outline-none !border-none"
                onChange={(e) => handleColorChange(index, e.target.value)} // Update color for this tag
              />
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default NewTags;
