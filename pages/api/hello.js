


export default async function handler(req, res) {
  if (1) {
    const blogData = [
      {
        id: 1,
        title: "Blog 1",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        image: "/images/blog1.jpg",
      },
      {
        id: 2,
        title: "Blog 2",  
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
        image: "/images/blog2.jpg",
      },
    ]
    res.status(200).json(blogData)
  } else {
    res.status(401).json({ message: "Unauthorized" })
  }
}