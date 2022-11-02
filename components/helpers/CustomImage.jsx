import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageFallback({ src, fallbackSrc, alt, ...rest }) {
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt || ""}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(
            fallbackSrc ||
              "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
          );
        }
      }}
      onError={() => {
        set_imgSrc(
          fallbackSrc ||
            "https://playjor.ams3.digitaloceanspaces.com/upload/photos/d-cover.jpg"
        );
      }}
    />
  );
}
