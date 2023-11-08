import { DEFAULT_USER } from "@/constants";
import { atomWithStorage } from 'jotai/utils'

export const loggedUserAtom = atomWithStorage('loggedUser',DEFAULT_USER);