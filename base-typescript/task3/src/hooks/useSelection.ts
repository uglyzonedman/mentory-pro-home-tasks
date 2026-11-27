import { useCallback, useState } from "react";
import type { UseSelectionResult } from "../types";

export const useSelection = (initValue: string | null): UseSelectionResult => {
  const [selectedId, setSelectedId] = useState(initValue);

  const select = useCallback((id: string) => setSelectedId(id), []);

  const reset = useCallback(() => setSelectedId(null), []);

  return { selectedId, reset, select };
};
