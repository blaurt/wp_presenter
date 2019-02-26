import * as React from 'react';
import * as yup from 'yup';
import { DefaultFieldTypeProps, PresenterQuestion } from '../typings/types';

export class Component extends React.Component<
  DefaultFieldTypeProps,
  { checked: boolean }
  > {
  constructor(props: DefaultFieldTypeProps) {
    super(props);
    const { isCheckedByDefault } = props.question.payload;
    this.state = {
      checked: !!isCheckedByDefault
    };
  }

  componentDidMount() {
    if (this.state) {
      this.setValue(this.state.checked); // If checked by default need to set value in formik on mount
    }
  }

  setValue = (value: any) => {
    const { inputName, setFieldValue } = this.props;
    setFieldValue(inputName, value);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    this.setState({ checked }, () => this.setValue(checked));
  };

  render() {
    const { question, inputName, error } = this.props;
    const { checked } = this.state;
    const { isLabelHiden, checkboxValue, description } = question.payload;
    return (
      <div className="field-wrapper checkbox-field">
        <div className="checkbox-field-line-wrapper">
          <input
            type="checkbox"
            checked={checked}
            onChange={this.handleChange}
            name={inputName}
            value={checkboxValue}
          />
          {!isLabelHiden && <label className="label">{checkboxValue}</label>}
        </div>
        <div className="checkbox-field-description">{description}</div>
        <span className="error-message">{error}</span>
      </div>
    );
  }
}

export const createSchema = (question: PresenterQuestion) => yup.bool();
