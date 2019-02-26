import * as React from 'react';
import * as yup from 'yup';
import Select from 'react-select';
import {
  DefaultFieldTypeProps,
  ExctractKeys,
  DefaultSelectValue,
  PresenterQuestion
} from '../typings/types';
import {
  createDays,
  createMonths,
  createYears
} from './shared/createSelectViewData';
import { getSingleSelectValue } from '../utils/common/selectUtils';
import { requiredFieldSchema } from './shared/defaultSchemas';

const selectOptions = {
  dd: {
    options: createDays(),
    placeholder: 'Day'
  },
  mm: {
    options: createMonths(),
    placeholder: 'Month'
  },
  yyyy: {
    options: createYears(99),
    placeholder: 'Year'
  }
};

type SelectOptionKeys = keyof typeof selectOptions;

function getOption<K extends SelectOptionKeys>(
  key: K
): typeof selectOptions[K] {
  return selectOptions[key];
}

interface BirthdateProps extends ExctractKeys<DefaultFieldTypeProps, 'value'> {
  value: { [k: string]: any } | string;
}

export const Component = (props: BirthdateProps) => {
  const { dateFormat, question } = props.question.payload;
  return (
    <div className="field-wrapper birthdate-field">
      <label className="label">{question}</label>
      <div className="select-wrapper">
        {dateFormat
          .split('-')
          .map((format: SelectOptionKeys, index: number) => {
            format = format.toLocaleLowerCase() as SelectOptionKeys;
            const { options } = getOption(format);
            return (
              <Select
                options={options}
                placeholder={`- ${selectOptions[format].placeholder} -`}
                onChange={(e) => {
                  props.setFieldValue(props.inputName, {
                    ...(typeof props.value === 'object' ? props.value : {}),
                    ...{ [format]: getSingleSelectValue(e as any) }
                  });
                }}
                value={options.find(o => o.value === props.value[format])}
                key={index}
                onBlur={(e) => {
                  if (!props.touched) {
                    props.setTouched({ [props.inputName]: true });
                  }
                  props.onBlur(e);
                }}
                name={props.inputName}
                className={`select select-${format}`}
              />
            );
          })}
      </div>
      <span className="error-message">{props.error}</span>
    </div>
  );
};

export const createSchema = (() => {
  const initialSchema = yup.object();
  return (q: PresenterQuestion) => {
    return yup.lazy((value: any) => {
      const { required } = q.payload;
      if (!value) {
        return requiredFieldSchema(q) || initialSchema;
      }
      const { dd, mm, yyyy } = value;
      return initialSchema.test('date', 'Please enter correct date', () => {
        const date = new Date(yyyy, mm + 1, 0);
        return dd <= date.getDate();
      });
    });
  };
})();
