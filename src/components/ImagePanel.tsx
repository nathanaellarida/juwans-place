import Image from "next/image";
import { imageForSlot } from "@/lib/images";
import { cn } from "@/lib/styles";

type ImagePanelProps = {
  category: string;
  preferredFileName?: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
};

export function ImagePanel({
  category,
  preferredFileName,
  alt,
  label,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  overlay = false,
}: ImagePanelProps) {
  const image = imageForSlot(category, preferredFileName);

  return (
    <div
      className={cn(
        "image-panel relative isolate overflow-hidden bg-[#183e44]",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <div
          className="placeholder-art absolute inset-0"
          role="img"
          aria-label={`${alt}. Photography will be added soon.`}
        >
          <span className="placeholder-sun" aria-hidden="true" />
          <span className="placeholder-wave placeholder-wave-one" aria-hidden />
          <span className="placeholder-wave placeholder-wave-two" aria-hidden />
          <span className="placeholder-house" aria-hidden="true">
            <span />
          </span>
          <span className="absolute bottom-5 left-5 z-10 max-w-[70%] text-xs font-bold uppercase tracking-[0.18em] text-white/80">
            {label ?? "Property photography coming soon"}
          </span>
        </div>
      )}
      {overlay ? (
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
