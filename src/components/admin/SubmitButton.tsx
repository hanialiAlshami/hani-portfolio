"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";

interface SubmitButtonProps {
  idleText: string;
  pendingText?: string;
  className?: string;
}

export function SubmitButton({ idleText, pendingText = "Saving...", className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      className={className}
    >
      {pending ? pendingText : idleText}
    </Button>
  );
}
