import { TextController, TextState } from "../../@types";
import {
  getBreaksNeededForEmptyLineAfter,
  getBreaksNeededForEmptyLineBefore,
  getSelectedText,
  insertBeforeEachLine,
  selectWord,
} from "./text";

export type AlterLineFunction = (line: string, index: number) => string;

/**
 * Transforms the selected text into a list format by inserting the given prefix (or applying a custom function)
 * before each line, and adjusts the text selection accordingly.
 */
export function makeList(
  state0: TextState,
  textController: TextController,
  insertBefore: string | AlterLineFunction
): void {
  // Adjust the selection to encompass the whole word if the caret is inside one
  const { text: initialText, selection: initialSelection } = state0;
  const newSelectionRange = selectWord({
    text: initialText,
    selection: initialSelection,
  });
  const state1 = textController.setSelectionRange(newSelectionRange);

  const { text: updatedText, selection } = state1;

  // Calculate the number of breaks needed before and after the selection
  const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
    updatedText,
    selection.start
  );
  const breaksAfterCount = getBreaksNeededForEmptyLineAfter(
    updatedText,
    selection.end
  );

  // Generate the line breaks as strings
  const breaksBefore = "\n".repeat(breaksBeforeCount);
  const breaksAfter = "\n".repeat(breaksAfterCount);

  // Modify the selected text by inserting the desired prefix (string or function) before each line
  const selectedText = getSelectedText(state1);
  const { modifiedText, insertionLength } = insertBeforeEachLine(
    selectedText,
    insertBefore
  );

  // Replace the selected text with the newly modified text
  textController.replaceSelection(
    `${breaksBefore}${modifiedText}${breaksAfter}`
  );

  // If the text is a single line, adjust the selection to exclude any prefixes added
  const isSingleLine = selectedText.indexOf("\n") === -1;
  const oneLinerOffset = isSingleLine ? insertionLength : 0;

  const selectionStart = selection.start + breaksBeforeCount + oneLinerOffset;
  const selectionEnd = selectionStart + modifiedText.length - oneLinerOffset;

  // Set the new selection range to exclude the prefix characters
  textController.setSelectionRange({
    start: selectionStart,
    end: selectionEnd,
  });
}
