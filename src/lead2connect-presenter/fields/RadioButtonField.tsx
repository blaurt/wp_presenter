import * as React from 'react';
import classnames from 'classnames';
import { DefaultFieldTypeProps, PresenterQuestion } from '../typings/types';
import { PresenterInput } from '../components/PresenterInput';
import { createStringSchema } from './shared/defaultSchemas';

export const createSchema = (question: PresenterQuestion) => {
  return createStringSchema(question.payload);
};

interface State {
  [id: string]: boolean;
}

export class Component extends React.Component<DefaultFieldTypeProps, State> {
  constructor(props: DefaultFieldTypeProps) {
    super(props);
    const { fieldOptions } = props.question.payload;
    const state = {};
    fieldOptions && fieldOptions!.forEach((option) => {
      state[option.optionValue] = false;
    });
    this.state = state;
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue, inputName } = this.props;
    const target = event.target;
    const currentState = { ...this.state };
    for (const key in currentState) {
      currentState[key] = false;
    }

    this.setState(
      Object.assign({ ...currentState }, { [target.value]: target.checked }),
      () => setFieldValue(inputName, target.value)
    );
  };

  render() {
    const { question, fieldOptions, fieldLayout } = this.props.question.payload;
    if (!fieldOptions) return null;
    return (
      <div
        className={classnames('field-wrapper text-field radioBtnQuestion', {
          oneColumn: fieldLayout === 'oneColumn'
        })}
      >
        <label className="label question-title">{question}</label>
        {fieldOptions.map(
          ({
            optionLabel, optionValue, icon, hideOptionLabel = false 
          }) => {
            const imageSelected = icon && icon.imageSelected;
            const imageUnselected = icon && icon.imageUnselected;
            const checked = this.state[optionValue];
            let inlineSizes;
            if (icon && icon.width && icon.height) {
              inlineSizes = { width: icon.width, height: icon.height };
            }
            let hidden = false;
            if ((checked && imageSelected) || (!checked && imageUnselected)) {
              hidden = true;
            }

            return (
              <label className={classnames('radio-input-wrapper', fieldLayout)} key={optionValue}>
                <PresenterInput
                  type="radio"
                  className={classnames('radio-button-input', {
                    hidden
                  })}
                  onChange={this.onChange}
                  onBlur={this.props.onBlur}
                  value={optionValue}
                  name={this.props.inputName}
                  hasError={!!this.props.error}
                />
                {checked && imageSelected && (
                  <img
                    style={inlineSizes}
                    src={imageSelected}
                    alt=""
                    className="radio-option-image"
                  />
                )}

                {!checked && imageUnselected && (
                  <img
                    style={inlineSizes}
                    src={imageUnselected}
                    alt=""
                    className="radio-option-image"
                  />
                )}

                {!hideOptionLabel && (
                  <span className="label-text">{optionLabel}</span>
                )}
              </label>
            );
          }
        )}

        <span className="error-message">{this.props.error}</span>
      </div>
    );
  }
}
