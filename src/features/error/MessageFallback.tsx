import { ArrowCounterClockwiseIcon, WarningIcon } from "@phosphor-icons/react";

function MessageFallback({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex h-lvh flex-col items-center justify-center gap-3 p-4">
      <WarningIcon size={40} />
      <div className="flex flex-col items-center gap-1">
        <h2 className="heading-2-semibold">Something went wrong</h2>
        <p className="text-muted-foreground text-s-regular">
          We are unable to load the Messages{" "}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 flex cursor-pointer items-center gap-2 hover:text-gray-500"
        >
          <span>Retry</span>
          <ArrowCounterClockwiseIcon />
        </button>
      )}
    </div>
  );
}

export default MessageFallback;
