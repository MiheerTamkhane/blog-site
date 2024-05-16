import { Loader } from "./Loader";
interface SubmitButtonTypes {
  loader: boolean;
  label: string;
}

export const SubmitButton = ({ loader, label }: SubmitButtonTypes) => {
  return (
    <button
      className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      type="submit"
      disabled={loader}
    >
      {loader ? <Loader /> : <>{label}</>}
    </button>
  );
};
