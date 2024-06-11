"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useFormik, FormikProps } from "formik";
import * as yup from "yup";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { createForm } from "../actions/form";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";
export type ICreateForm = {
  name: string;
  description?: string;
};
const CreateFormButton: React.FC = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string(),
    }),
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = formik;
  const handleSubmit = async (values: ICreateForm) => {
    try {
      const formId = await createForm(values);
      toast({
        title: "Success",
        description: "Add form successfully",
        variant: "default",
      });
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"outline"}
          className="w-full group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <div>Name</div>
          <Input
            value={values.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue("name", e.target.value);
            }}
          />
          {errors.name && touched.name && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.name}
            </p>
          )}
          <div>Description</div>
          <Textarea
            value={values.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setFieldValue("description", e.target.value);
            }}
          />
          {errors.description && touched.description && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.description}
            </p>
          )}
          <Button
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className={isSubmitting ? "disabled w-full" : "w-full"}
          >
            {isSubmitting && <ImSpinner2 className="animate-spin" />}
            {!isSubmitting && <span>Save</span>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;
