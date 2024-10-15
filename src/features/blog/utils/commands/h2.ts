import { Command } from "../../@types";
import { setHeader } from "../helpers/header";

export const headingLevel2Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, "## ");
  },
};
