import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough } from "lucide-react";
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
    <div className="toolbar flex gap-2 p-2 ring-1 ring-border rounded-md mb-2">
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
  );
};

export default MarkdownToolbar;
