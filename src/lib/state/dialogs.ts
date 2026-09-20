import { writable } from "svelte/store";
import type { DialogInfo } from '../types/dialog.js';

// Store holds a single dialog or null
export const dialog = writable<DialogInfo | null>(null);

export function createDialog(newDialog: DialogInfo) {
    dialog.set(newDialog);
}

export function killDialog() {
    dialog.set(null);
}
