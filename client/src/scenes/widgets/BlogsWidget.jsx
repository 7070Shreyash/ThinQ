import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "state";
import BlogWidget from "./BlogWidget";

const BlogsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const token = useSelector((state) => state.token);

  const getBlogs = async () => {
    const response = await fetch("http://localhost:3001/blogspage", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setBlogs({ blogs: data }));
  };
  const getUserBlogs = async () => {
    const response = await fetch(
      `http://localhost:3001/blogspage/${userId}/blogs`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setBlogs({ blogs: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserBlogs();
    } else {
      getBlogs();
    }
  }, []);
  return (
    <>
      {blogs.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          title,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
        }) => (
          <BlogWidget
            key={_id}
            blogId={_id}
            userId={userId}
            name={`${firstName} ${lastName}`}
            title = {title}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
          />
        )
      )}
    </>
  );
};
export default BlogsWidget;
