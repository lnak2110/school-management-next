import CreateClassForm from "@/components/CreateClassForm";
import { axiosInstance } from "@/utils/axios-config";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useRef, FormEvent } from "react";

export default function CreateClass() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nameValue = nameRef.current?.value;
    setFormSubmitted(true);

    try {
      await axiosInstance.post("/classes", { name: nameValue });

      if (nameRef.current) {
        nameRef.current.value = "";
      }
      alert("Class created successfully. You will be redirected.");
      router.push("/classes");
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

  return (
    <CreateClassForm
      nameRef={nameRef}
      handleSubmit={handleSubmit}
      formSubmitted={formSubmitted}
    />
  );
}
