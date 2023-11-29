import { useState } from "react";

export function useConfirmDialog(submitCallback: any) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsConfirmDialogOpen(true);
  };

  const handleConfirm = async () => {
    setIsConfirmDialogOpen(false);
    setIsSubmitted(true);
    await submitCallback();
  };

  const handleCancel = async () => {
    setIsConfirmDialogOpen(false);
    setIsSubmitted(false);
  };

  return {
    isSubmitted,
    isConfirmDialogOpen,
    handleSubmit,
    handleConfirm,
    handleCancel,
  };
}
