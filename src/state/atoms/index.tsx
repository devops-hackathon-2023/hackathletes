import { DEFAULT_USER } from "@/constants";
import { atom } from "jotai";

export const loggedUserAtom = atom(DEFAULT_USER);