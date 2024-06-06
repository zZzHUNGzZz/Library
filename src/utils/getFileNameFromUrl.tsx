export function getFileNameFromUrl(url: string) {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const decodedPath = decodeURIComponent(path);
    const fileName = decodedPath.substring(decodedPath.lastIndexOf('/') + 1);
    return fileName;
}