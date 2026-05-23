/**
 * Converts a Cloudinary video URL to a static thumbnail image URL.
 * Strips existing transformations, inserts so_0,f_jpg,q_auto, changes extension.
 *
 * Input:  https://res.cloudinary.com/CLOUD/video/upload/q_auto/f_auto/vVERSION/id.mp4
 * Output: https://res.cloudinary.com/CLOUD/video/upload/so_0,f_jpg,q_auto/vVERSION/id.jpg
 */
export function videoToThumbnail(url) {
  if (!url || !url.includes('cloudinary.com')) return '';
  return url
    .replace(
      /res\.cloudinary\.com\/([^/]+)\/video\/upload\/(?:[^/]+\/)*?(v\d+\/)/,
      'res.cloudinary.com/$1/video/upload/so_0,f_jpg,q_auto/$2'
    )
    .replace(/\.(mp4|webm|mov|ogg|avi)$/i, '.jpg');
}

/**
 * Serialize a Mongoose lean document for safe passing from Server Components
 * to Client Components. Converts ObjectId → string, Date → ISO string.
 * Required because Next.js rejects objects with toJSON methods as props.
 */
export function serializeDoc(doc) {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}
