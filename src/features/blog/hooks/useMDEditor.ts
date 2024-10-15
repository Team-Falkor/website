import { RefObject, useMemo } from "react";
import { CommandMap, TextController } from "../@types";
import { CommandController, TextAreaTextController } from "../utils";

export type useMDEditorResult<CommandName extends string> = {
  ref: React.RefObject<HTMLTextAreaElement>;
  textController: TextController;
  commandController: CommandController<CommandName>;
};

export type useMDEditorOptions<CommandName extends string> = {
  commandMap: CommandMap<CommandName>;
  textAreaRef: RefObject<HTMLTextAreaElement>;
};

export const useMDEditor = <CommandName extends string>(
  options: useMDEditorOptions<CommandName>
): useMDEditorResult<CommandName> => {
  const textAreaRef = options.textAreaRef;

  const textController = useMemo(() => {
    return new TextAreaTextController(textAreaRef);
  }, [textAreaRef]);

  const commandController = useMemo(
    () => new CommandController(textController, options.commandMap),
    [options.commandMap, textController]
  );

  return {
    textController,
    commandController,
    ref: textAreaRef,
  };
};
