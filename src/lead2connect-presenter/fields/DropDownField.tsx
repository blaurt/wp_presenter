import * as React from 'react';
import Select from 'react-select';
import * as yup from 'yup';
import { DefaultFieldTypeProps, PresenterQuestion } from '../typings/types';
import { mapBackendSelectDataToSelect } from '../utils/common/mapSelectData';
import { getSingleSelectValue } from '../utils/common/selectUtils';
import { requiredFieldSchema } from './shared/defaultSchemas';

export const Component = (props: DefaultFieldTypeProps) => {
  const { onChange, onBlur, question } = props;
  const dataPayload = mapBackendSelectDataToSelect(
    question.payload.fieldOptions || []
  ); // TO DO remove [] after preview button validation
  return (
    <div className="field-wrapper dropdown-field">
      <label className="label">
        {question.payload.question}
      </label>
      <Select
        onChange={(e) => {
          onChange(props.inputName)(getSingleSelectValue(e));
        }}
        value={dataPayload.find(d => d.value === props.value)}
        onBlur={(e) => {
          if (!props.touched) {
            props.setTouched({ [props.inputName]: true });
            onBlur(e);
          }
        }}
        options={dataPayload}
        className="dropdown-input"
        placeholder={question.payload.placeholder}
      />
      <span className="error-message">{props.error}</span>
    </div>
  );
};

export const createSchema = (question: PresenterQuestion) => {
  return yup.lazy((value: string | undefined) => {
    const requiredSchema = requiredFieldSchema(question);
    if (!value && requiredSchema) return requiredSchema;
    return yup.string();
  });
};
