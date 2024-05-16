import { Link } from "react-router-dom";

interface NavbarType {
  isPublished?: boolean;
  onClick?: () => void;
}
export const Navbar = ({ isPublished, onClick }: NavbarType) => {
  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/blog"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Blogging
          </span>
        </Link>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
            onClick={onClick}
          >
            {isPublished ? "Publish" : "New"}
          </button>
          <span className="rounded-full bg-slate-100 py-2.5 px-4">M</span>
        </div>
      </div>
    </nav>
  );
};
