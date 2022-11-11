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
  const [noData, setNoData] = useState(false);

  const getAlbumData = async () => {
    let res = await fetch(`/api/getImages`);
    res = await res.json();
    if (res.length === 0) {
      setNoData(true);
    }
    setAlbumData(res);
  };

  useEffect(() => {
    try {
      getAlbumData();
    } catch (err) {
      console.log("error fetching album data", err);
    }
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {albumData?.length > 0 ? (
        <Box sx={{ width: "80%", height: "80%", overflowY: "hidden" }}>
          <ImageList variant="masonry" cols={6} gap={8}>
            {albumData.map((image, i) => (
              <ImageListItem className={styles.imageWrapper} key={i}>
                <img
                  onClick={() => {
                    setIsLightBoxOpen(true);
                    setPhotoIndex(i);
                  }}
                  className={styles.singleImage}
                  src={image["imgurData"]["data"]["display_url"]}
                  srcSet={image["imgurData"]["data"]["display_url"]}
                  // alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        <div>{noData ? <div>No Data Found</div> : <Loader />} </div>
      )}
      {albumData.length > 0 && (
        <LightboxComponent
          isOpen={isLightBoxOpen}
          setIsOpen={setIsLightBoxOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          images={albumData}
        />
      )}
    </div>
  );
}
