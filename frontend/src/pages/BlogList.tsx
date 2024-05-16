import { useEffect, useState } from "react";
import axios from "axios";
import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { Loader } from "../components/Loader";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const BlogList = () => {
  const [blogList, setBlogList] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogList(response.data.blogs);
      setLoader(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Navbar onClick={() => navigate("/publish")} />
      <div className="max-w-screen-md h-fit my-10 flex justify-center mx-auto">
        {loader ? (
          <Loader />
        ) : (
          <div className="w-full flex justify-center flex-col">
            {blogList?.map((blog) => (
              <BlogCard
                key={blog?.id}
                id={blog?.id}
                title={blog?.title}
                content={blog?.content}
                published={blog?.published}
                author={blog?.author?.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
