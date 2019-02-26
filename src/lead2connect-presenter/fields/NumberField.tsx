import * as React from 'react';
import { DefaultFieldTypeProps, PresenterQuestion } from '../typings/types';
import { PresenterInput } from '../components/PresenterInput';
import { createStringSchema } from './shared/defaultSchemas';

const convertCurrencyValue = (val: string) => {
  switch (val) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    case 'pound':
      return '£';
    case 'yen':
      return '¥';
    default:
      return '';
  }
};

export const Component = (props: DefaultFieldTypeProps) => {
  const { question, placeholder, currency } = props.question.payload;
  return (
    <div className="field-wrapper text-field">
      <label className="label">{question}</label>

      <div className="field-wrapper field-wrapper-with-prepend">
        {currency && currency !== 'none' && (
          <div className="input-prepend">
            <span>{convertCurrencyValue(currency)}</span>
          </div>
        )}

        <PresenterInput
          onChange={props.onChange}
          placeholder={placeholder}
          onBlur={props.onBlur}
          type="number"
          value={props.value}
          className="text-input currency"
          name={props.inputName}
          hasError={!!props.error}
        />
      </div>
      <span className="error-message">{props.error}</span>
    </div>
  );
};

export const createSchema = (question: PresenterQuestion) => createStringSchema(question.payload); // Replace with actual validation schema;
