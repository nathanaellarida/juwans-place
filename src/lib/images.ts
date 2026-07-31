import {
  imageManifest,
  type ImageManifestItem,
} from "@/generated/image-manifest";

export const imagesInCategory = (category: string) =>
  imageManifest.filter((image) => image.category === category);

export const imageForSlot = (
  category: string,
  preferredFileName?: string,
): ImageManifestItem | null => {
  const images = imagesInCategory(category);

  if (preferredFileName) {
    const preferred = images.find(
      (image) =>
        image.fileName.toLowerCase() === preferredFileName.toLowerCase(),
    );
    if (preferred) return preferred;
  }

  return images[0] ?? null;
};
