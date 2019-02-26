import * as React from 'react';
import { DefaultFieldTypeProps, PresenterQuestion } from '../typings/types';
import { PresenterInput } from '../components/PresenterInput';
import { createStringSchema } from './shared/defaultSchemas';

export const createSchema = (question: PresenterQuestion) => {
  return createStringSchema(question.payload);
};

export const Component = (props: DefaultFieldTypeProps) => {
  const { question, placeholder } = props.question.payload;
  return (
    <div className="field-wrapper text-field">
      <label className="label">{question}</label>
      <PresenterInput
        type="text"
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
