export const handleShare = (username: string, url: string) => {
  const message = `Check out this post from ${username}:\n${url}`;
  const encodedMessage = encodeURIComponent(message);

  const shareUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

  window.open(shareUrl, "_blank", "noopener,noreferrer");
};
