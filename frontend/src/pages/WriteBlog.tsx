import { useState } from "react";
import axios from "axios";
import { CreatePostInput } from "@photon-rex/blog-common";
import { Navbar } from "../components/Navbar";
import { SubmitButton } from "../components/SubmitButton";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const WriteBlog = () => {
  const [blog, setBlog] = useState<CreatePostInput>({
    title: "",
    content: "",
    published: false,
    authorId: "",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  async function publishBlogHandler() {}
  async function postBlockHandler(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      setLoader(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, blog, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "text/plain",
        },
      });
      const id = response.data.post.id;
      navigate(`/blog/${id}`);
      setLoader(false);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div>
      <Navbar isPublished onClick={publishBlogHandler} />
      <div className="mt-10 max-h-svh">
        <form
          className="max-w-4xl mx-auto min-h-96 mt-10 flex gap-4 flex-col"
          method="submit"
          onSubmit={postBlockHandler}
        >
          <input
            type="text"
            placeholder="Title"
            className="text-4xl focus:outline-none font-bold"
            onChange={(e) =>
              setBlog((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            placeholder="Tell your story..."
            className="focus:outline-none text-gray-600 resize-none min-h-96"
            onChange={(e) =>
              setBlog((prev) => ({ ...prev, content: e.target.value }))
            }
          ></textarea>
          <div className="w-full flex justify-end border-t-2 p-2">
            <div className="w-fit">
              <SubmitButton label="Post" loader={loader} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
