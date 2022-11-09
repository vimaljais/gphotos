import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import styles from "../styles/aww.module.css";
import Loader from "./Loader";

export default function Aww() {
  const [albumData, setAlbumData] = useState([]);

  const getAlbumData = async () => {
    const url = `http://localhost:3000/api/getImages`;
    const res = await fetch(url);
    const data = await res.json();
    setAlbumData(data);
  };

  useEffect(() => {
    try {
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
              {albumData.map((item) => (
                <ImageListItem className={styles.imageWrapper} key={item.id}>
                  <img
                    className={styles.singleImage}
                    src={`${item.baseUrl}`}
                    srcSet={`${item.baseUrl}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
        </Box>
      ) : (
        <div><Loader /></div>
      )}
    </div>
  );
}
