import { FormEvent, RefObject } from "react";

type SearchProps = {
  handleSubmit: (e: FormEvent) => void;
  searchRef: RefObject<HTMLInputElement | null>;
  selectRef: RefObject<HTMLSelectElement | null>;
};

export default function SearchStudent({
  handleSubmit,
  searchRef,
  selectRef,
}: SearchProps) {
  return (
    <form onSubmit={handleSubmit} className="ml-auto max-w-md">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-3 top-0 my-auto h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          ref={searchRef}
          className="w-full rounded-md border bg-gray-50 py-3 pl-12 pr-4 text-gray-500 outline-none focus:border-indigo-600 focus:bg-white"
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <select
            ref={selectRef}
            className="h-full rounded-lg bg-transparent text-sm outline-none"
          >
            <option value={"name"}>By name</option>
            <option value={"class"}>By class name</option>
          </select>
        </div>
      </div>
    </form>
  );
}
