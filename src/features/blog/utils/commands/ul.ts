import { Command } from "../../@types";
import { makeList } from "../helpers/list";

export const unorderedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, "- ");
  },
};
