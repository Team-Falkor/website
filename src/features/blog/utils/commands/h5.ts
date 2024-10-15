import { Command } from "../../@types";
import { setHeader } from "../helpers/header";

export const headingLevel5Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, "##### ");
  },
};
