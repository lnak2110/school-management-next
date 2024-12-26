import Link from "next/link";
import StudentsTable from "@/components/StudentsTable";
import { StudentType } from "@/lib/types";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { axiosInstance } from "@/utils/axios-config";
import SearchStudent from "@/components/SearchStudent";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const getServerSideProps = (async (context) => {
  const { searchby, name } = context.query;
  let res;

  try {
    if (searchby && name) {
      if (searchby === "name") {
        res = await axiosInstance.get("/students/name", {
          params: { keyword: name },
        });
      }
      if (searchby === "class") {
        res = await axiosInstance.get(`/students/class/${name}`);
      }
    } else {
      res = await axiosInstance.get("/students");
    }
    const students: StudentType[] = res?.data?.data || [];
    return { props: { students } };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { props: { students: [] } };
    } else {
      return { notFound: true };
    }
  }
}) satisfies GetServerSideProps<{ students: StudentType[] }>;

export default function Students({
  students,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const searchRefValue = searchRef.current?.value;
    const selectRefValue = selectRef.current?.value;
    if (searchRefValue && selectRefValue) {
      router.push(
        `/students?searchby=${selectRefValue}&name=${searchRefValue}`,
      );
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Are you sure you want to delete student ${name}?`)) {
      return;
    }
    try {
      await axiosInstance.delete(`/students`, { data: { id } });
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
            Students
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href="/students/new"
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Student
          </Link>
        </div>
      </div>
      <StudentsTable students={students} handleDelete={handleDelete}>
        <SearchStudent
          handleSubmit={handleSubmit}
          searchRef={searchRef}
          selectRef={selectRef}
        />
      </StudentsTable>
    </div>
  );
}
