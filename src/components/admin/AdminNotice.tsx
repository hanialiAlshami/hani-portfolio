type AdminNoticeProps = {
  tone?: "success" | "error" | "info";
  children: React.ReactNode;
  className?: string;
};

const toneClasses = {
  success: "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400",
  error: "bg-destructive/10 border-destructive/30 text-destructive",
  info: "bg-primary/10 border-primary/30 text-primary",
};

export function AdminNotice({ tone = "info", children, className = "" }: AdminNoticeProps) {
  return (
    <div className={`rounded-lg border p-4 text-sm font-medium ${toneClasses[tone]} ${className}`}>
      {children}
    </div>
  );
}
