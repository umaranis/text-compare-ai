import type { CompareResult } from "$lib/aiModel";
import { writable } from "svelte/store";

export const compareResult = writable<CompareResult | null>();