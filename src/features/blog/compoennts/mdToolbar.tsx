import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bold,
  Heading,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  Italic,
  Strikethrough,
} from "lucide-react";
import { RefObject } from "react";
import { useMDEditor } from "../hooks";
import {
  boldCommand,
  codeCommand,
  headingLevel1Command,
  headingLevel2Command,
  headingLevel3Command,
  headingLevel4Command,
  headingLevel5Command,
  headingLevel6Command,
  italicCommand,
  strikethroughCommand,
} from "../utils";

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
}

const MarkdownToolbar = ({ textareaRef }: Props) => {
  const { commandController } = useMDEditor({
    commandMap: {
      bold: boldCommand,
      italic: italicCommand,
      stikethrough: strikethroughCommand,
      code: codeCommand,
      h1: headingLevel1Command,
      h2: headingLevel2Command,
      h3: headingLevel3Command,
      h4: headingLevel4Command,
      h5: headingLevel5Command,
      h6: headingLevel6Command,
    },
    textAreaRef: textareaRef,
  });

  return (
    <div className="toolbar flex gap-5 p-2 ring-1 ring-border rounded-md mb-2">
      <div className="flex gap-2">
        <Button
          key={"bold"}
          onClick={() => commandController.executeCommand("bold")}
          variant={"ghost"}
          size="icon"
        >
          <Bold />
        </Button>

        <Button
          key={"italic"}
          onClick={() => commandController.executeCommand("italic")}
          variant={"ghost"}
          size="icon"
        >
          <Italic />
        </Button>

        <Button
          key={"strikethrough"}
          onClick={() => commandController.executeCommand("stikethrough")}
          variant={"ghost"}
          size="icon"
        >
          <Strikethrough />
        </Button>
      </div>
      <div>
        <Popover>
          <PopoverTrigger>
            <Button key="headers" variant={"ghost"} size="icon">
              <Heading />
            </Button>
          </PopoverTrigger>
          <PopoverContent asChild sideOffset={5} className="w-20">
            <div className="flex flex-col gap-0.5 justify-center items-center">
              <Button
                key="h1"
                variant={"ghost"}
                size="icon"
                onClick={() => commandController.executeCommand("h1")}
              >
                <Heading1Icon />
              </Button>
              <Button
                variant={"ghost"}
                key="h2"
                size="icon"
                onClick={() => commandController.executeCommand("h2")}
              >
                <Heading2Icon />
              </Button>
              <Button
                variant={"ghost"}
                key="h3"
                onClick={() => commandController.executeCommand("h3")}
                size="icon"
              >
                <Heading3Icon />
              </Button>
              <Button
                variant={"ghost"}
                key="h4"
                onClick={() => commandController.executeCommand("h4")}
                size="icon"
              >
                <Heading4Icon />
              </Button>
              <Button
                key="h5"
                variant={"ghost"}
                onClick={() => commandController.executeCommand("h5")}
                size="icon"
              >
                <Heading5Icon />
              </Button>
              <Button
                key="h6"
                variant={"ghost"}
                onClick={() => commandController.executeCommand("h6")}
                size="icon"
              >
                <Heading6Icon />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MarkdownToolbar;
