import { useCallback, useState } from "react";

export function useSelectedInboxItemId() {
  const [selectedInboxItemId, setSelectedInboxItemId] = useState<string | null>(null);

  const handleSelectInboxItem = useCallback((inboxItemId: string) => {
    setSelectedInboxItemId(inboxItemId);
  }, []);

  const handleUnselectInboxItem = useCallback(() => {
    setSelectedInboxItemId(null);
  }, []);

  return {
    selectedInboxItemId,
    handleSelectInboxItem,
    handleUnselectInboxItem,
  };
}
