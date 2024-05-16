import { Link } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  content: string;
  published?: boolean;
  author: string;
}

export const BlogCard = ({ id, title, content, author }: Blog) => {
  return (
    <div className="p-6 bg-white border-gray-100 border-b-2">
      <div className="flex gap-2 items-center mb-2">
        <span className="border rounded-full py-1 px-2.5">
          {author[0]?.toUpperCase()}
        </span>
        <h5>{author}</h5>
      </div>
      <Link to="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {id}. {title}
        </h5>
      </Link>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {content}
      </p>
      <Link
        to={`/blog/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800"
      >
        Read more
      </Link>
    </div>
  );
};
