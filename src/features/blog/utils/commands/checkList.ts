import { Command } from "../../@types";
import { makeList } from "../helpers/list";

export const checkedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, () => `- [ ] `);
  },
};
