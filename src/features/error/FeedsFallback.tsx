import { WarningIcon } from "@phosphor-icons/react";

export default function FeedsFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex h-lvh flex-col items-center justify-center gap-3 p-4">
      <WarningIcon size={40} />
      <div className="flex flex-col items-center gap-1">
        <h2 className="heading-2-semibold">Something went wrong</h2>
        <p className="text-muted-foreground text-s-regular">
          We are unable to load the Feeds{" "}
        </p>
      </div>

      {onRetry && (
        <button onClick={onRetry} className="mt-2">
          Retry
        </button>
      )}
    </div>
  );
}
