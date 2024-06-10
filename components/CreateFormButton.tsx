"use client";
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';

interface MyFormValues {
  name: string;
  description: string;
}

const CreateFormButton: React.FC = () => {
  const formik: FormikProps<MyFormValues> = useFormik<MyFormValues>({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      description: yup.string(),
    }),
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        {/* <form onSubmit={formik.handleSubmit} className="space-y-2">
          <Button type="submit">Submit</Button>
        </form> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;