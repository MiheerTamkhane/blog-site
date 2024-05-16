import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Loader } from "../components/Loader";

type BlogPost = {
  title: string;
  id: number;
  content: string;
  published: boolean;
  author: {
    name: string;
  };
};
export const ReadBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost>({
    title: "",
    id: 0,
    content: "",
    published: false,
    author: {
      name: "",
    },
  });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  async function fetchBlog() {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/${params?.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setBlog(response.data.post);
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
          <div className="w-full mx-auto h-fit mt-10 flex justify-center items-start gap-12">
            <div className="w-8/12">
              <h1 className="text-3xl font-extrabold">{blog?.title}</h1>
              <p className=" text-gray-500 mt-5">{blog?.content}</p>
            </div>
            <div className="w-4/12 hidden md:block">
              <div className="mb-4 border-b p-2">Author</div>
              <div className="flex gap-4 justify-start items-start">
                <span className="border py-1 px-2.5 rounded-full">
                  {blog?.author?.name?.[0]?.toUpperCase()}
                </span>
                <div>
                  <h1 className="font-bold text-lg">{blog?.author?.name}</h1>
                  <p>
                    Bio. Lorem ipsum dolor, sit amet consectetur adipisicing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
