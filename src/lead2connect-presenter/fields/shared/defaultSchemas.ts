import * as yup from 'yup';
import { formatErrorText } from './formatErrorText';
import { ValidationErrorField, PresenterQuestion } from '../../typings/types';


const defaultRequiredMessage = "This field is required."

export const requiredFieldSchema = (question: PresenterQuestion) => {
  const { required } = question.payload;
  if (required && required.active) {
    return yup.string().required(required.errorMessage || defaultRequiredMessage);
  }
}

interface StringSchemaParams {
  charLimit_min?: ValidationErrorField;
  charLimit_max?: ValidationErrorField;
  required?: ValidationErrorField;
}

export const createStringSchema = (
  payload: StringSchemaParams
): yup.StringSchema => {
  const { charLimit_min, charLimit_max, required } = payload;
  let schemaInitial = yup.string();
  if (required && required.active) {
    schemaInitial = schemaInitial.concat(
      yup.string().required(required.errorMessage)
    );
  }
  if (charLimit_min && charLimit_min.active) {
    schemaInitial = schemaInitial.concat(
      schemaInitial.min(
        charLimit_min.limit,
        formatErrorText(charLimit_min.errorMessage, charLimit_min.limit)
      )
    );
  }
  if (charLimit_max && charLimit_max.active) {
    schemaInitial = schemaInitial.concat(
      schemaInitial.max(
        charLimit_max.limit,
        formatErrorText(charLimit_max.errorMessage, charLimit_max.limit)
      )
    );
  }
  return schemaInitial;
};
