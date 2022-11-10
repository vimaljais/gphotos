import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import styles from "../styles/aww.module.css";
import Loader from "./Loader";
import LightboxComponent from "./LightBox";

export default function Aww() {
  const [albumData, setAlbumData] = useState([]);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const getAlbumData = async () => {
    const url = `/api/getImages`;
    const res = await fetch(url);
    const data = await res.json();
    setAlbumData(data);
  };

  // const updating = async () => {
  //   const url = `/api/updateMongoFromGoogle`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data)
  // };


  useEffect(() => {
    try {
      // await updating();
      getAlbumData();
    } catch (err) {
      console.log("error fetching album data", err);
    }
  }, []);

  useEffect(() => {
    console.log("photos ", albumData);
  }, [albumData]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {albumData?.length > 0 ? (
        <Box sx={{ width: "80%", height: "80%", overflowY: "hidden" }}>
          <ImageList variant="masonry" cols={6} gap={8}>
            {albumData.map((item, i) => (
              <ImageListItem className={styles.imageWrapper} key={item.id}>
                <img
                  onClick={() => {
                    setIsLightBoxOpen(true);
                    setPhotoIndex(i);
                  }}
                  className={styles.singleImage}
                  src={`${item.img64}`}
                  srcSet={`${item.img64}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        <div>
          <Loader />
        </div>
      )}
      <LightboxComponent
        isOpen={isLightBoxOpen}
        setIsOpen={setIsLightBoxOpen}
        photoIndex={photoIndex}
        setPhotoIndex={setPhotoIndex}
        images={albumData}
      />
    </div>
  );
}
