import {
  FormikErrors,
  FormikHandlers,
  FormikActions,
  FormikTouched
} from 'formik';

export interface ValidationErrorField {
  active: boolean;
  limit: number;
  errorMessage: string;
}

export interface PresenterQuestion {
  id: string;
  payload: {
    placeholder?: string;
    question?: string;
    charLimit_min: ValidationErrorField;
    charLimit_max: ValidationErrorField;
    required: ValidationErrorField;
    fieldType: string;
    checkboxValue?: string;
    isCustomizeActive: string;
    isLabelHiden?: boolean;
    isCheckedByDefault?: boolean;
    description?: string;
    customText?: string;
    dateFormat?: any;
    currency?: string;
    fieldLayout?: string;
    fieldOptions?: {
      hideOptionLabel?: boolean;
      optionLabel: string;
      optionValue: string;
      id?: string;
      icon?: IconPayloadProps;
    }[];
  };
}

export interface IconPayloadProps {
  imageSelected: string;
  imageUnselected: string;
  width?: number;
  height?: number;
}

export interface HTMLInputEvent {
  target: HTMLInputElement;
}

export interface HTMLInputCallback {
  target: HTMLElement;
}
/* FIELDS */

export interface DefaultFieldTypeProps {
  question: PresenterQuestion;
  error: FormikErrors<any> | string | undefined;
  onChange: FormikHandlers['handleChange'];
  onBlur: (event: React.ChangeEvent<any>) => void;
  value: any;
  inputName: string;
  values: { [k: string]: any };
  setFieldValue: FormikActions<
    DefaultFieldTypeProps['values']
  >['setFieldValue'];
  setTouched: FormikActions<DefaultFieldTypeProps['values']>['setTouched'];
  touched: boolean | undefined | FormikTouched<any>;
}

/* FIELDS */

/* UTILS */
export type ExctractKeys<TInterface, TKeys extends keyof TInterface> = Pick<
  TInterface,
  Exclude<keyof TInterface, TKeys>
>;
/* UTILS */

/* SELECT */
export interface DefaultSelectValue {
  label: string;
  value: string | number;
}
/* SELECT */

export type DataState = { [stepId: string]: { [questionId: string]: any } }[];

interface HiddenField {
  id: string;
  name: string;
  value: string;
  captureValueFromUrl?: boolean;
}

interface Settings {
  formName: string;
  nextBtn?: string;
  finalStepBtn?: string;
  hiddenFields: HiddenField[];
  progressBar?: boolean;
}

interface Step {
  id: string;
  questions: PresenterQuestion[];
}

export interface PresenterOutputPayload {
  draftId: string;
  [field: string]: any;
}

export interface PresenterInputProps {
  formId: string;
  draftId: string;
  settings: Settings;
  steps: Step[];
  isSubmiting?: boolean;
  className?: string;
  onSubmit: (p: PresenterOutputPayload) => void;
}
