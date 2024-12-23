import { FormEvent, RefObject } from "react";

type CreateClassFormProps = {
  nameRef: RefObject<HTMLInputElement | null>;
  handleSubmit: (e: FormEvent) => void;
  formSubmitted: boolean;
};

export default function CreateClassForm({
  nameRef,
  handleSubmit,
  formSubmitted,
}: CreateClassFormProps) {
  return (
    <main className="flex w-full flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Create a class
            </h3>
          </div>
        </div>
        <div className="bg-white p-4 py-6 shadow sm:rounded-lg sm:p-6">
          <form onSubmit={handleSubmit} method="post" className="space-y-5">
            <div>
              <label className="font-medium" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                ref={nameRef}
                required
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            <button
              disabled={formSubmitted}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
