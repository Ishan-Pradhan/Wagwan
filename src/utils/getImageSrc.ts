export function getImageSrc(image: { url?: string; localPath?: string }) {
  return image.url || image.localPath || "";
}
