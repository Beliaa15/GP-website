import * as React from "react";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      style={{
        whiteSpace: "normal", // Prevent line wrapping
        maxHeight: "200px",
        overflowY: "auto", // Optional: Disable vertical scrolling if only horizontal is needed
      }}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
