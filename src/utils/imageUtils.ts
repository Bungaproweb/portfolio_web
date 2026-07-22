/**
 * Helper utility to format and convert image URLs, with full automatic support
 * for public Google Drive shareable links.
 */

export function formatImageUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();

  // Match Google Drive File ID from various shareable URL formats:
  // 1. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // 2. https://drive.google.com/uc?id=FILE_ID
  // 3. https://drive.google.com/open?id=FILE_ID
  // 4. https://lh3.googleusercontent.com/d/FILE_ID
  const driveMatch = trimmed.match(
    /(?:drive\.google\.com\/(?:file\/d\/|uc\?(?:.*&)?id=|open\?(?:.*&)?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]{20,})/
  );

  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    // Modern Google Drive Direct Image CDN URL
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

/**
 * Checks if a given string is a Google Drive link
 */
export function isGoogleDriveUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('drive.google.com') || url.includes('lh3.googleusercontent.com/d/');
}
