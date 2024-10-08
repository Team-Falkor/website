import { ActiveFormats } from "@/@types";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Underline,
} from "lucide-react";

interface MDMenuBarProps {
  activeFormats: Record<ActiveFormats, boolean>;
  toggleFormat: (format: ActiveFormats) => void;
}

const MDMenuBar = ({ activeFormats, toggleFormat }: MDMenuBarProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-1">
        <div className="flex gap-4 items-center">
          {/* Text Styles */}
          <ToggleGroup type="multiple" className="flex gap-2">
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => toggleFormat("bold")}
              aria-pressed={activeFormats?.bold}
            >
              <Bold className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => toggleFormat("italic")}
              data-state={activeFormats?.italic ? "on" : "off"}
            >
              <Italic className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              data-state={activeFormats?.underline ? "on" : "off"}
              onClick={() => toggleFormat("underline")}
            >
              <Underline className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Headings */}
          <ToggleGroup type="single" className="flex gap-2">
            <ToggleGroupItem
              value="h1"
              aria-label="Toggle heading 1"
              data-state={activeFormats?.h1 ? "on" : "off"}
              onClick={() => toggleFormat("h1")}
            >
              <Heading1 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h2"
              aria-label="Toggle heading 2"
              data-state={activeFormats?.h2 ? "on" : "off"}
              onClick={() => toggleFormat("h2")}
            >
              <Heading2 className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h3"
              aria-label="Toggle heading 3"
              data-state={activeFormats?.h3 ? "on" : "off"}
              onClick={() => toggleFormat("h3")}
            >
              <Heading3 className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Lists */}
          <ToggleGroup type="multiple" className="flex gap-2">
            <ToggleGroupItem
              value="unordered-list"
              aria-label="Toggle unordered list"
            >
              <List className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="ordered-list"
              aria-label="Toggle ordered list"
            >
              <ListOrdered className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Blockquote and Code */}
          <ToggleGroup type="multiple" className="flex gap-2">
            <ToggleGroupItem value="blockquote" aria-label="Toggle blockquote">
              <Quote className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="code-block" aria-label="Toggle code block">
              <Code className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Links and Images */}
          <ToggleGroup type="multiple" className="flex gap-2">
            <ToggleGroupItem value="link" aria-label="Toggle link">
              <Link className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="image" aria-label="Toggle image">
              <Image className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default MDMenuBar;
