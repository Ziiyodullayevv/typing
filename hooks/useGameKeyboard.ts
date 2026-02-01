import { useCallback, useEffect, useRef } from "react";

type UseGameKeyboardOptions = {
  onKey: (key: string) => void;
  onBackspace?: () => void;
  enabled?: boolean;
};

const ignoredKeys = new Set([
  "Shift", "Control", "Alt", "Meta", "CapsLock",
  "Tab", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
  "Fn", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
  " ",
]);

export function useGameKeyboard({ onKey, onBackspace, enabled = true }: UseGameKeyboardOptions) {
  const onKeyRef = useRef(onKey);
  const onBackspaceRef = useRef(onBackspace);
  onKeyRef.current = onKey;
  onBackspaceRef.current = onBackspace;

  // Prevent scroll when game is active
  useEffect(() => {
    if (!enabled) return;

    const preventScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventScroll, { passive: false });
    return () => window.removeEventListener("keydown", preventScroll);
  }, [enabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      if (ignoredKeys.has(e.key)) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        onBackspaceRef.current?.();
        return;
      }

      if (e.key.length !== 1) return;

      e.preventDefault();
      e.stopPropagation();
      onKeyRef.current(e.key.toLowerCase());
    },
    [enabled]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
