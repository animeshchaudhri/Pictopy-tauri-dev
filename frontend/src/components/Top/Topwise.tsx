import Topwiselinks from "./Topwiselinks";

import "react-image-gallery/styles/css/image-gallery.css";

import { Carousel2 } from "../gallery/Gallery";

function Topwise(props: any) {
  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-large">{props.title}</h1>
        <Topwiselinks
          location={props.location}
          size={props.size}
          date={props.date}
        />
        {/* <ImageGallery items={images} /> */}

        <Carousel2 />
      </div>
    </>
  );
}

export default Topwise;
