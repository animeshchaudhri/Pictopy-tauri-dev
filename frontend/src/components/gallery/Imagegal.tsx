import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import BigImageView from "../bigview";

interface CustomImage {
  src: string;
  width: number;
  height: number;
  caption: string;
}

interface ImageGalleryProps {
  images: CustomImage[];
}

const ImageGalleryxd: React.FC<ImageGalleryProps> = (props) => {
  const [index, setIndex] = useState(-1);

  const handleClick = (index: number, _item: CustomImage) => setIndex(index);
  const handleClose = () => setIndex(-1);

  return (
    <div className="overflow-hidden h-70vh">
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
