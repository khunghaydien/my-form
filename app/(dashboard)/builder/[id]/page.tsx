import { getFormById } from "@/app/actions/form";
import FormBuilder from "@/app/components/FormBuilder";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const form = await getFormById(Number(id));

  if (!form) throw new Error("Form not found");

  return <FormBuilder form={form} />;
}

export default page;
