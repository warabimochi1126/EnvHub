export function fileSizeByteToKB(fileSizeByte: number): string {
  const fileSizeInKB = (fileSizeByte / 1024).toFixed(2);
  return `${fileSizeInKB} KB`;
}
