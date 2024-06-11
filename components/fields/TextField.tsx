"use client";
import React from "react";
import { ElementsType, FormElement } from "../FormElement";
import { MdTextFields } from "react-icons/md";
const type: ElementsType = "TextField";
export const TextFieldFormElement: FormElement = {
  type: "TextField",
  designerComponent: () => <div className="text-white">designer component</div>,
  formComponent: () => <div>form component</div>,
  propertiesComponent: () => <div>properties component</div>,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  designerButtonElement: {
    icon: MdTextFields,
    label: "Text field",
  },
};
