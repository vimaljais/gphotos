import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Aww() {
  const [albumData, setAlbumData] = useState([]);
  const [allUpdated, setAllUpdated] = useState(false);

  const getAlbumData = async (pageToken) => {
    const url =`http://localhost:3000/api/getImagesFromMongo`
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


    //   const url = pageToken
  //     ? `http://localhost:3000/api/getImagesFromGoogle?pageToken=${pageToken}`
  //     : `http://localhost:3000/api/getImagesFromGoogle`;
  //   const res = await fetch(url);
  // const [allUpdated, setAllUpdated] = useState(false);

  // const getAlbumData = async (pageToken) => {
  //   const url = pageToken
  //     ? `http://localhost:3000/api/getImagesFromGoogle?pageToken=${pageToken}`
  //     : `http://localhost:3000/api/getImagesFromGoogle`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data);
  //   setAlbumData((albumData) => albumData.concat(data?.mediaItems));

  //   if (data["nextPageToken"]) {
  //     getAlbumData(data["nextPageToken"]);
  //   } else {
  //     setAllUpdated(true);
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     getAlbumData();
  //   } catch (err) {
  //     console.log("error fetching album data", err);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("photos ", albumData);
  // }, [albumData]);

  // useEffect(() => {
  //   if (allUpdated)
  //     fetch("/api/updateDB", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ album: albumData })
  //     });
  // }, [allUpdated]);

  return (
    <div>
      {albumData?.length > 0 ? (
        <Box sx={{ width: "100%", height: "100%", overflowY: "auto" }}>
          <ImageList variant="masonry" cols={6} gap={8}>
            {albumData.map((item) => (
              <ImageListItem key={item.id}>
                <img src={`${item.baseUrl}`} srcSet={`${item.baseUrl}`} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
