import { Command } from "../../@types";
import { makeList } from "../helpers/list";

export const orderedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, (item, index) => `${index + 1}. `);
  },
};
