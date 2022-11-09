import { getToken } from "./auth/getToken";

export default async function handler(req, res) {
  const pageToken = req.query.pageToken;
  const tokens = await getToken();

  const tok = "Bearer " + tokens.access_token;
  var myHeaders = new Headers();
  myHeaders.append(
    "Accept",
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
  );

  myHeaders.append("Authorization", tok);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    pageSize: "15",
    albumId: "AMND833QGlt8Sm6WxzTLREhtgDTyNa5tbBxhLoIgXe1rhZ1StnOJeM4NQcusL3upbgmgwsVYq_e8", //bonky
    // albumId: "AMND830mjd32Qp6DhHililc7Kj65T9NvBzNnFzMwPicu7K8wagEYJC2ozooDR5j5NDULgLHJT8_P",
    ...(pageToken && { pageToken: pageToken })
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  const response = await fetch("https://photoslibrary.googleapis.com/v1/mediaItems:search", requestOptions);

  const result = await response.json();
  res.status(200).send(result);
  // } else {
  //   res.status(401).json({ message: "Unauthorized" });
  // }
}
