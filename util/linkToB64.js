var https = require("https");

export const linkToB64 = async (link) => {
  
  const res = await fetch(link+"=w1280").then(r => r.buffer()).then(buf => `data:image/jpg;base64,`+buf.toString('base64'));
  return res
};
