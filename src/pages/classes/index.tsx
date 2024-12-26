import Link from "next/link";
import ClassesTable from "@/components/ClassesTable";
import { axiosInstance } from "@/utils/axios-config";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ClassType } from "@/lib/types";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import Search from "@/components/Search";
import axios from "axios";

export const getServerSideProps = (async (context) => {
  const { name } = context.query;
  let res;

  try {
    if (name) {
      res = await axiosInstance.get("/classes/name", {
        params: { keyword: name },
      });
    } else {
      res = await axiosInstance.get("/classes");
    }

    const classes: ClassType[] = res?.data?.data || [];
    return { props: { classes } };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data.devMessage || "An error occurred");
      return { props: { classes: [] } };
    } else {
      alert("An error occurred");
      return { notFound: true };
    }
  }
}) satisfies GetServerSideProps<{ classes: ClassType[] }>;

export default function Classes({
  classes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = searchRef.current?.value;
    if (value) {
      router.push(`/classes?name=${value}`);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Are you sure you want to delete class ${name}?`)) {
      return;
    }
    try {
      await axiosInstance.delete(`/classes`, { data: { id } });
      router.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.devMessage || "An error occurred");
      } else {
        alert("An error occurred");
      }
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-4 md:px-8">
      <div className="items-center justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Classes
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href="/classes/new"
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Class
          </Link>
        </div>
      </div>
      <ClassesTable classes={classes} handleDelete={handleDelete}>
        <Search handleSubmit={handleSubmit} searchRef={searchRef} />
      </ClassesTable>
    </div>
  );
}
