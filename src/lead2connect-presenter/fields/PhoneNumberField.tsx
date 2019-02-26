import * as React from 'react';
import { DefaultFieldTypeProps, PresenterQuestion } from '../typings/types';
import { PresenterInput } from '../components/PresenterInput';
import { createStringSchema } from './shared/defaultSchemas';

export const Component = (props: DefaultFieldTypeProps) => {
  const { question, placeholder } = props.question.payload;
  return (
    <div className="field-wrapper phonenumber-field">
      <label className="label">{question}</label>
      <PresenterInput
        type="text"
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        name={props.inputName}
        placeholder={placeholder}
        hasError={!!props.error}
        className="input phone-input"
      />
      <span className="error-message">{props.error}</span>
    </div>
  );
};

export const createSchema = (question: PresenterQuestion) => createStringSchema({ required: question.payload.required });
