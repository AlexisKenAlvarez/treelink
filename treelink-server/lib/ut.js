export function getFileKey(url) {
  const parts = url.split('/f/');
  if (parts.length < 2) return null; // If the URL format is incorrect

  const fileKey = parts[1] // Extracting the file key
  return fileKey;
}