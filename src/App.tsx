import React, { Component } from "react";
import { Presenter } from "lead2connect-presenter";
import axios from "axios";
import { getFormId } from "./adapter";

const formsApiUrltemplate = "http://localhost:3010/api/forms/:formId";

class App extends Component {
  state = { form: mock };

  async componentDidMount() {
    this.setState({ form: await this.fetchForm() });
  }

  fetchForm = async () => {
    const formId = getFormId();
    const url = formsApiUrltemplate.replace(":formId", formId);
    try {
      const response = await axios.get(url);
      console.log("response new", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  onSubmit = (data: any) => {
    console.log("SUBMIT DATA", data);
  };

  presenterWrapper = (form: any) => (
    <main>
      Presenter here
      {!!form && <Presenter onComplete={this.onSubmit} draft={form.draft} />}
    </main>
  );

  render() {
    const { form } = this.state;
    console.log("*********form", form);

    return <div className="App">{this.presenterWrapper(form)}</div>;
  }
}

export default App;

const mock = {
  "draftId" : "5c8f8b75449c8850e839a41c",
  "formId" : "5c8a63264540ae1abc6d96a7",
  "formSettings" : {
      "formName" : "test",
      "nextBtn" : "Continue",
      "finalStepBtn" : "Submit",
      "hiddenFields" : [ 
          {
              "captureValueFromUrl" : false,
              "id" : "8887ec04-7a23-4a73-9934-1f540b9b4a71",
              "name" : "some_important_hidden_field",
              "value" : "Value of some important hidden field"
          }
      ],
      "progressBar" : true
    },
  "steps" : [ 
      {
          "id" : "6b29bab5-dc63-4d44-80c9-8d21a6784969",
          "questions" : [ 
              {
                  "id" : "e7f14dc4-3368-49bc-a4ca-7f2b0a22e6e0",
                  "payload" : {
                      "fieldType" : "text",
                      "required" : {
                          "active" : true,
                          "errorMessage" : "First name is required."
                      },
                      "charLimit" : {
                          "min" : {
                              "active" : true,
                              "errorMessage" : "You must enter a value highter or equivalent to {minValue}",
                              "limit" : 1
                          },
                          "max" : {
                              "active" : true,
                              "errorMessage" : "You must enter a value lower or equivalent to {maxValue}",
                              "limit" : 40
                          }
                      },
                      "question" : "First Name",
                      "placeholder" : "Enter your First Name"
                  }
              }, 
              {
                  "id" : "753ba9ac-0e48-48a7-87dc-ca3505f50bbe",
                  "payload" : {
                      "fieldType" : "text",
                      "required" : {
                          "active" : true,
                          "errorMessage" : "Last Name is required."
                      },
                      "charLimit" : {
                          "min" : {
                              "active" : false,
                              "errorMessage" : "You must enter a value highter or equivalent to {minValue}"
                          },
                          "max" : {
                              "active" : false,
                              "errorMessage" : "You must enter a value lower or equivalent to {maxValue}"
                          }
                      },
                      "question" : "Last Name",
                      "placeholder" : "Enter your Last Name"
                  }
              }, 
              {
                  "id" : "9ed701f2-2a1e-44b7-8786-55d77d1b6b96",
                  "payload" : {
                      "fieldType" : "email",
                      "required" : {
                          "active" : true,
                          "errorMessage" : "This field is required."
                      },
                      "question" : "Email address",
                      "placeholder" : "Enter your email address"
                  }
              }, 
              {
                  "id" : "6fb0f082-a10b-4d3a-8640-3a8bb3297f6f",
                  "payload" : {
                      "fieldType" : "phoneNumber",
                      "required" : {
                          "active" : false,
                          "errorMessage" : "This field is required."
                      },
                      "question" : "Phone number",
                      "placeholder" : "Enter your phone number"
                  }
              },
          ]
      },
  ],
};