import { RefObject } from "react";
import { SelectionRange, TextController, TextState } from "../@types";

export class TextAreaTextController implements TextController {
  private textAreaRef: RefObject<HTMLTextAreaElement>;

  constructor(textAreaRef: RefObject<HTMLTextAreaElement>) {
    this.textAreaRef = textAreaRef;
  }

  // Method to replace selected text in the textarea
  replaceSelection(text: string): TextState {
    const textArea = this.getTextArea();
    insertText(textArea, text);
    return getStateFromTextArea(textArea);
  }

  // Method to set the selection range of the textarea
  setSelectionRange(selection: SelectionRange): TextState {
    const textArea = this.getTextArea();
    textArea.focus();
    textArea.setSelectionRange(selection.start, selection.end);
    return getStateFromTextArea(textArea);
  }

  // Method to get the current state of the textarea
  getState(): TextState {
    return getStateFromTextArea(this.getTextArea());
  }

  // Private method to get the textarea and handle ref errors
  private getTextArea(): HTMLTextAreaElement {
    const textArea = this.textAreaRef.current;
    if (!textArea) {
      throw new Error("TextArea reference is not set or is unavailable.");
    }
    return textArea;
  }
}

// Utility function to get the current state (selection and text) from a textarea
export function getStateFromTextArea(textArea: HTMLTextAreaElement): TextState {
  return {
    selection: {
      start: textArea.selectionStart,
      end: textArea.selectionEnd,
    },
    text: textArea.value,
  };
}

// Function to insert text into a textarea or input field
export function insertText(
  input: HTMLTextAreaElement | HTMLInputElement,
  text: string
): void {
  input.focus();

  // Try using document.execCommand for webkit + Edge browsers
  const isExecSuccess = document.execCommand("insertText", false, text);
  if (!isExecSuccess) {
    insertTextFallback(input, text);
  }

  // Dispatch input event after the change
  input.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
}

// Fallback insertion method for browsers that don't support execCommand
function insertTextFallback(
  input: HTMLTextAreaElement | HTMLInputElement,
  text: string
): void {
  const { selectionStart = 0, selectionEnd = 0 } = input;
  if (selectionStart === null || selectionEnd === null) return;

  if (typeof input.setRangeText === "function") {
    input.setRangeText(text);
  } else if (canManipulateViaTextNodes(input)) {
    insertViaTextNodes(input, text, selectionStart, selectionEnd);
  } else {
    const value = input.value;
    input.value =
      value.slice(0, selectionStart) + text + value.slice(selectionEnd);
  }

  // Set cursor position after inserted text
  input.setSelectionRange(
    selectionStart + text.length,
    selectionStart + text.length
  );
}

// Helper function to check if we can manipulate text nodes directly
function canManipulateViaTextNodes(
  input: HTMLTextAreaElement | HTMLInputElement
): boolean {
  if (input.nodeName !== "TEXTAREA") return false;
  const textarea = document.createElement("textarea");
  textarea.value = "1";
  return textarea.firstChild !== null;
}

// Function to insert text via text nodes when supported
function insertViaTextNodes(
  input: HTMLTextAreaElement | HTMLInputElement,
  text: string,
  start: number,
  end: number
): void {
  const textNode = document.createTextNode(text);
  let node = input.firstChild;

  if (!node) {
    input.appendChild(textNode);
    return;
  }

  const range = document.createRange();
  let offset = 0;

  // Find the correct start and end nodes based on selection
  while (node && (start || end)) {
    const nodeLength = node.nodeValue?.length || 0;

    if (start >= offset && start <= offset + nodeLength) {
      range.setStart(node, start - offset);
    }

    if (end >= offset && end <= offset + nodeLength) {
      range.setEnd(node, end - offset);
    }

    offset += nodeLength;
    node = node.nextSibling;
  }

  if (start !== end) {
    range.deleteContents();
  }

  range.insertNode(textNode);
}
