import CreateStudentForm from "@/components/CreateStudentForm";
import { ClassType } from "@/lib/types";
import { axiosInstance } from "@/utils/axios-config";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useRef, FormEvent, useEffect } from "react";

export default function CreateStudent() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const classIdRef = useRef<HTMLSelectElement>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nameValue = nameRef.current?.value;
    const classIdValue = +classIdRef.current!.value;
    setFormSubmitted(true);

    try {
      await axiosInstance.post("/students", {
        name: nameValue,
        classId: classIdValue,
      });
      formRef.current?.reset();
      alert("Student created successfully. You will be redirected.");
      router.push("/students");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data.devMessage || "An error occurred");
      } else {
        alert("An error occurred");
      }
    } finally {
      setFormSubmitted(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/classes");
        setClasses(res.data?.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data.devMessage || "An error occurred");
        } else {
          alert("An error occurred");
        }
      }
    })();
  }, []);

  return (
    <CreateStudentForm
      formRef={formRef}
      nameRef={nameRef}
      classIdRef={classIdRef}
      handleSubmit={handleSubmit}
      classes={classes}
      formSubmitted={formSubmitted}
    />
  );
}
