"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => Promise<void>;
  confirmText: string;
  buttonText: string;
}

export function DeleteButton({ id, onDelete, confirmText, buttonText }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button 
      type="button"
      variant="destructive" 
      size="sm" 
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        if (isPending) return;
        if (window.confirm(confirmText)) {
          startTransition(async () => {
            await onDelete(id);
          });
        }
      }}
    >
      {isPending ? "Deleting..." : buttonText}
    </Button>
  );
}
