export function convertDriveUrlToDirect(url) {
  const regex = /\/file\/d\/(.+?)\/view/;
  const match = url.match(regex);

  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  return null; // or return the original URL if preferred
}
