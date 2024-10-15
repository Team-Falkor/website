import { CommandMap, TextController } from "../@types";

export class CommandController<CommandName extends string> {
  private readonly textController: TextController;
  private readonly commandMap: CommandMap<CommandName>;

  /**
   * Indicates whether there is a command currently executing
   */
  private isExecuting = false;

  constructor(
    textController: TextController,
    commandMap: CommandMap<CommandName>
  ) {
    this.textController = textController;
    this.commandMap = commandMap;
  }

  /**
   * Executes a command if not currently executing another.
   * If undo is available and needed, it will undo the last action instead.
   */
  async executeCommand(commandName: CommandName): Promise<void> {
    if (this.isExecuting) return;

    const command = this.commandMap[commandName];
    if (!command) {
      throw new Error(
        `Cannot execute command. Command not found: ${commandName}`
      );
    }

    this.isExecuting = true;

    const executeOptions = {
      initialState: this.textController.getState(),
      textApi: this.textController,
    };

    try {
      if (command.shouldUndo?.(executeOptions) && command.undo) {
        command.undo(executeOptions);
      } else {
        await command.execute(executeOptions);
      }
    } finally {
      this.isExecuting = false;
    }
  }
}
