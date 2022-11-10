import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

const LightboxComponent = ({ isOpen, setIsOpen, photoIndex, setPhotoIndex, images = [] }) => {
  return (
    <div>
      {isOpen && (
        <Lightbox
          mainSrc={`${images[photoIndex]?.baseUrl}=w1600`}
          nextSrc={images[(photoIndex + 1) % images.length]?.baseUrl}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]?.baseUrl}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex) => (photoIndex + images.length - 1) % images.length)?.baseUrl}
          onMoveNextRequest={() => setPhotoIndex((photoIndex) => (photoIndex + 1) % images.length)?.baseUrl}
        />
      )}
    </div>
  );
};

export default LightboxComponent;
