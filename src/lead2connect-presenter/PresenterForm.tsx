import * as React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import * as classnames from "classnames";
import {
  PresenterInputProps,
  PresenterOutputPayload,
  PresenterQuestion
} from "./typings/types";
import {
  presenterFields,
  missingPresenterField,
  getPresenterField
} from "./fields";
import { ProgressBar } from "./components/ProgressBar";
import { parseQueryParams } from "./utils/common/parse";

import "./core.theme.css";

interface State {
  activeStepIndex: number;
  stepSubmitResults: { [k: string]: any }[];
  hiddenFields: { [name: string]: string; value: string }[];
  passedSteps: number;
}

export class Presenter extends React.Component<PresenterInputProps, State> {
  totalSteps = this.props.steps.length;
  state = {
    activeStepIndex: 0,
    stepSubmitResults: [],
    hiddenFields: [{ name: "draftId", value: this.props.draftId }],
    passedSteps: 0
  };

  canSubmitForm = () => {
    const totalSteps = this.props.steps.length;
    const { activeStepIndex } = this.state;

    if (totalSteps == 1) return true;

    if (activeStepIndex + 1 == totalSteps) return true;

    return false;
  };

  mapHiddenFieldsToData = () => {
    const { hiddenFields } = this.state;
    const payload: { [k: string]: string } = {};
    hiddenFields.forEach(({ name, value }) => {
      payload[name] = value;
    });
    return payload;
  };

  getQuestionValues = () => {
    const { steps } = this.props;
    const questionValues: { [k: string]: PresenterQuestion } = {};

    Object.values(steps).forEach(({ questions }) => {
      questions.forEach(question => {
        questionValues[question.id] = question;
      });
    });
    return questionValues;
  };

  processQuestionData = (stepSubmitResults: any, questionValues: any) => {
    const data = {};

    stepSubmitResults.forEach((questionResult: any) => {
      const questionIds = Object.keys(questionResult);

      for (const questionId of questionIds) {
        const questionPayload = questionValues[questionId];
        if (!questionPayload) throw new Error("Question not found.");

        if (questionPayload.payload.fieldType === "customText") continue;
        if (
          questionPayload.payload.fieldType === "birthDate" &&
          questionResult[questionId]
        ) {
          const { yyyy, mm, dd } = questionResult[questionId];
          data[questionId] = Date.UTC(yyyy, mm, dd);
          continue;
        }

        if (questionPayload.payload.fieldType === "checkBoxDescription") {
          data[questionId] = Boolean(questionResult[questionId]);
          continue;
        }
        if (questionResult[questionId]) {
          data[questionId] = questionResult[questionId];
        }
      }
    });

    return data;
  };

  mapDataToSubmitPayload = (): PresenterOutputPayload => {
    const { draftId } = this.props;
    const { stepSubmitResults } = this.state;
    const questionValues = this.getQuestionValues();
    const data = {
      ...this.processQuestionData(stepSubmitResults, questionValues)
    };

    return { draftId, ...data, ...this.mapHiddenFieldsToData() };
  };

  submitForm = () => {
    this.props.onSubmit(this.mapDataToSubmitPayload());
  };

  handleFormSubmit = (stepSubmitData: any) => {
    const nextStepIndex = this.state.activeStepIndex + 1;
    const submitResults: any[] = [...this.state.stepSubmitResults];
    submitResults[this.state.activeStepIndex] = stepSubmitData;

    this.setState({
      stepSubmitResults: submitResults,
      passedSteps: nextStepIndex
    });

    if (this.canSubmitForm()) {
      this.submitForm();
    } else {
      this.setState({ activeStepIndex: nextStepIndex });
    }
  };

  createHiddenFieldValues = (): { value: string; name: string }[] => {
    const { settings } = this.props;
    const hiddenFieldsPayload = [...this.state.hiddenFields];
    let urlParams: { [k: string]: string };

    settings.hiddenFields.forEach(hiddenField => {
      const { value, name, captureValueFromUrl } = hiddenField;
      if (captureValueFromUrl) {
        if (!urlParams) urlParams = parseQueryParams();

        hiddenFieldsPayload.push({
          name,
          value: urlParams[name] // Getting value from Url
        });
      } else {
        hiddenFieldsPayload.push({
          name,
          value
        });
      }
    });
    return hiddenFieldsPayload;
  };

  createInitialValues = () => {
    const { steps } = this.props;

    const currentPayloadState: { [k: string]: any }[] = [];
    steps.forEach((step, index) => {
      const payload: { [k: string]: any } = {};

      step.questions.forEach(question => {
        const { fieldType } = question.payload;
        const init = getPresenterField(fieldType).initialValue;
        if (typeof init !== undefined) {
          payload[question.id] = init;
        }
      });

      currentPayloadState[index] = payload;
    });

    this.setState({
      stepSubmitResults: currentPayloadState,
      hiddenFields: this.createHiddenFieldValues()
    });
  };

  composeSchemas = () => {
    const { questions } = this.props.steps[this.state.activeStepIndex];
    const schema = {};
    questions.forEach(q => {
      const key = q.id;
      const { fieldType } = q.payload;
      if (!fieldType) {
        return;
      }
      schema[key] = getPresenterField(fieldType).createSchema(q);
    });
    return yup.object(schema);
  };

  componentDidMount() {
    this.createInitialValues();
  }

  render() {
    console.log("PRESENTER RENDER");

    const step = this.props.steps[this.state.activeStepIndex];
    if (!step) throw new Error("Step list cannot be empty");
    const { questions } = this.props.steps[this.state.activeStepIndex];
    const { settings, className, isSubmiting } = this.props;
    const { activeStepIndex, hiddenFields, stepSubmitResults } = this.state;
    return (
      <div className={classnames("form-presenter", className)}>
        {this.totalSteps > 1 ? (
          <p className="form-presenter-header">
            {`Step ${activeStepIndex + 1} of ${this.totalSteps}`}
          </p>
        ) : null}
        {settings.progressBar && (
          <div className="form-presenter-progress-bar">
            <ProgressBar
              progressOfTotal={this.state.passedSteps}
              total={this.totalSteps}
            />
          </div>
        )}
        <Formik
          initialValues={stepSubmitResults[activeStepIndex]}
          onSubmit={this.handleFormSubmit}
          validationSchema={this.composeSchemas()}
          enableReinitialize
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setTouched,
            touched
          }) => (
            <form className="presenter-form" onSubmit={handleSubmit}>
              {questions.map(question => {
                const { fieldType } = question.payload;
                const { id } = question;
                const key = `input-${fieldType}-${id}`;
                const Input = (
                  presenterFields[fieldType] || missingPresenterField
                ).Component;
                return (
                  <Input
                    key={key}
                    value={values[id] || ""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputName={id}
                    error={touched[id] ? errors[id] : ""}
                    question={question}
                    values={values}
                    setFieldValue={setFieldValue}
                    setTouched={setTouched}
                    touched={touched[id]}
                  />
                );
              })}
              {hiddenFields.map((field, i) => (
                <input
                  value={field.value}
                  name={field.name}
                  key={i}
                  type="hidden"
                />
              ))}
              <span>
                {this.canSubmitForm() ? (
                  <button
                    type="submit"
                    className="presenter-form-control-btn"
                    disabled={!!Object.keys(errors).length || isSubmiting}
                  >
                    {settings.finalStepBtn || "Submit"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="presenter-form-control-btn"
                    disabled={!!Object.keys(errors).length || isSubmiting}
                  >
                    {settings.nextBtn || "Next"}
                  </button>
                )}
              </span>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
