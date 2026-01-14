/**
 * Converts bytes to a human-readable file size string
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted size string (e.g., "2.5 MB", "1.2 GB")
 */
export const formatSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  if (bytes < 0) return 'Invalid size';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Ensure i is within bounds
  if (i >= sizes.length) {
    return (bytes / Math.pow(k, sizes.length - 1)).toFixed(decimals) + ' ' + sizes[sizes.length - 1];
  }

  return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + sizes[i];
};

export const generateUUID = () => crypto.randomUUID();

