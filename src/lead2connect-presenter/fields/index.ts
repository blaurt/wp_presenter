import * as React from "react";
import * as yup from "yup";

import { Schema } from "yup";
import * as number from "./NumberField";
import * as text from "./TextField";
import * as email from "./EmailField";
import * as phoneNumber from "./PhoneNumberField";
import * as dropDown from "./DropDownField";
import * as birthDate from "./BirthdateField";
import * as checkBoxDescription from "./CheckboxDescription";
import * as radioButton from "./RadioButtonField";
import { PresenterQuestion } from "../typings/types";

interface PresenterField {
  Component: React.ComponentType<any>;
  createSchema(q: PresenterQuestion): Schema<any>;
  initialValue?: any;
}

interface PresenterFields {
  [k: string]: PresenterField | undefined;
}

export const presenterFields = {
  email,
  number,
  text,
  phoneNumber,
  dropDown,
  birthDate,
  checkBoxDescription,
  radioButton
};

export const missingPresenterField: PresenterField = {
  Component: () => React.createElement("span", null, "Not implemented yet"),
  createSchema: () => yup.bool()
};

type FieldKeys = keyof typeof presenterFields;

export function getPresenterField(fieldType: string): PresenterField {
  return presenterFields[fieldType] || missingPresenterField;
}
