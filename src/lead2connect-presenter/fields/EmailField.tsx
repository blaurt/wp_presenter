import * as React from 'react';
import * as yup from 'yup';
import { DefaultFieldTypeProps, PresenterQuestion } from '../typings/types';
import { PresenterInput } from '../components/PresenterInput';
import { concatSchemas } from './shared/yupUtils';
import { requiredFieldSchema } from './shared/defaultSchemas';

export const createSchema = (question: PresenterQuestion) => {
  const validation = yup.string().email('Please enter valid email adress');
  return concatSchemas([validation, requiredFieldSchema(question)]);
};

export const Component = (props: DefaultFieldTypeProps) => {
  const { question, placeholder } = props.question.payload;
  return (
    <div className="field-wrapper text-field">
      <label className="label">{question}</label>
      <PresenterInput
        type="email"
        className="text-input"
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        name={props.inputName}
        placeholder={placeholder}
        hasError={!!props.error}
      />
      <span className="error-message">{props.error}</span>
    </div>
  );
};
