export function formatTime(isoDate: string): string {
  const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);

  if (diff < 60) return "now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m `;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h `;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d `;

  const weeks = Math.floor(days / 7);
  if (weeks >= 1 && weeks < 5) return `${weeks}w`;

  const months = Math.floor(days / 30);
  if (months >= 1 && months < 12) return `${months}mo`;

  const years = Math.floor(days / 365);
  if (years >= 1) return `${years}y`;

  return `${years}y`;
}
