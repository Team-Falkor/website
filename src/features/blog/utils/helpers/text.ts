import { SelectionRange, TextState } from "../../@types";
import { AlterLineFunction } from "./list";

/**
 * Gets the surrounding word based on the cursor position in the given text.
 * @throws Will throw an error if the provided text is falsy.
 */
export function getSurroundingWord(
  text: string,
  position: number
): SelectionRange {
  if (!text) throw new Error("Argument 'text' should be truthy");

  const isWordDelimiter = (c: string) => c === " " || c.charCodeAt(0) === 10;

  let start = 0;
  let end = text.length;

  // Iterate left to find the start of the word
  for (let i = position; i - 1 >= 0; i--) {
    if (isWordDelimiter(text[i - 1])) {
      start = i;
      break;
    }
  }

  // Iterate right to find the end of the word
  for (let i = position; i < text.length; i++) {
    if (isWordDelimiter(text[i])) {
      end = i;
      break;
    }
  }

  return { start, end };
}

/**
 * Selects a word at the current cursor position if the selection is collapsed.
 * Otherwise, returns the original selection.
 */
export function selectWord({ text, selection }: TextState): SelectionRange {
  return text && selection.start === selection.end
    ? getSurroundingWord(text, selection.start)
    : selection;
}

/**
 * Determines how many line breaks are needed before the given position to ensure an empty line.
 */
export function getBreaksNeededForEmptyLineBefore(
  text = "",
  startPosition: number
): number {
  if (startPosition === 0) return 0;

  let neededBreaks = 2;
  let isInFirstLine = true;

  for (let i = startPosition - 1; i >= 0 && neededBreaks > 0; i--) {
    const charCode = text.charCodeAt(i);
    if (charCode === 32) continue; // Space
    if (charCode === 10) {
      // Line break
      neededBreaks--;
      isInFirstLine = false;
    } else {
      break;
    }
  }

  return isInFirstLine ? 0 : neededBreaks;
}

/**
 * Determines how many line breaks are needed after the given position to ensure an empty line.
 */
export function getBreaksNeededForEmptyLineAfter(
  text = "",
  startPosition: number
): number {
  if (startPosition === text.length - 1) return 0;

  let neededBreaks = 2;
  let isInLastLine = true;

  for (let i = startPosition; i < text.length && neededBreaks > 0; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode === 32) continue; // Space
    if (charCode === 10) {
      // Line break
      neededBreaks--;
      isInLastLine = false;
    } else {
      break;
    }
  }

  return isInLastLine ? 0 : neededBreaks;
}

/**
 * Retrieves the selected text based on the provided text state.
 */
export function getSelectedText({ text, selection }: TextState): string {
  return text.slice(selection.start, selection.end);
}

/**
 * Retrieves the characters before the current selection.
 */
export function getCharactersBeforeSelection(
  textState: TextState,
  characters: number
): string {
  const { text, selection } = textState;
  return text.slice(Math.max(0, selection.start - characters), selection.start);
}

/**
 * Retrieves the characters after the current selection.
 */
export function getCharactersAfterSelection(
  textState: TextState,
  characters: number
): string {
  const { text, selection } = textState;
  return text.slice(
    selection.end,
    Math.min(text.length, selection.end + characters)
  );
}

/**
 * Inserts a string or result of a function before each line of the selected text.
 */
export function insertBeforeEachLine(
  selectedText: string,
  insertBefore: string | AlterLineFunction
): { modifiedText: string; insertionLength: number } {
  const lines = selectedText.split("\n");

  let insertionLength = 0;

  const modifiedText = lines
    .map((line, index) => {
      const insertion =
        typeof insertBefore === "function"
          ? insertBefore(line, index)
          : insertBefore;
      insertionLength += insertion.length;
      return insertion + line;
    })
    .join("\n");

  return { modifiedText, insertionLength };
}
