import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import BigImageView from "../bigview";

interface CustomImage {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  caption: string;
}

interface ImageGalleryProps {
  images: CustomImage[];
}

const ImageGalleryxd: React.FC<ImageGalleryProps> = (props) => {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number, item: CustomImage) => setIndex(index);
  const handleClose = () => setIndex(-1);

  return (
    <div>
      {index === -1 ? (
        <Gallery
          images={props.images}
          onClick={handleClick}
          enableImageSelection={false}
        />
      ) : (
        <BigImageView
          images={props.images.map((image) => image.src)}
          initialIndex={index}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ImageGalleryxd;
