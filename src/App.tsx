import React, { Component } from "react";
import { Presenter } from "./lead2connect-presenter";
import axios from "axios";

const formsApiUrltemplate = "http://localhost:3010/api/forms/:formId";

class App extends Component {
  state = { form: null };

  async componentDidMount() {
    this.setState({ form: await this.fetchForm() });
  }

  fetchForm = async () => {
    const formId = "5c4f0a4379277d1e142c36ca";
    const url = formsApiUrltemplate.replace(":formId", formId);
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  onSubmit = (data: any) => {
    console.log("SUBMIT DATA", data);
  };

  presenterWrapper = (form: any) => {
    return (
      <main>
        Presenter here
        {!!form && (
          <Presenter
            draftId={form.draft._id}
            settings={form.draft.formSettings}
            steps={form.draft.steps}
            formId={form.id}
            onSubmit={submitPayload => {
              this.onSubmit(submitPayload);
            }}
          />
        )}
      </main>
    );
  };

  render() {
    const { form } = this.state;

    return <div className="App">{this.presenterWrapper(form)}</div>;
  }
}

export default App;
