import React, { Component } from "react";
import { Presenter } from "lead2connect-presenter";
import axios from "axios";
import { getFormId } from "./adapter";

const formsApiUrltemplate = "http://localhost:3010/api/forms/:formId";

class App extends Component {
  state = { form: null };

  async componentDidMount() {
    this.setState({ form: await this.fetchForm() });
  }

  fetchForm = async () => {
    const formId = getFormId();
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

  presenterWrapper = (form: any) => (
    <main>
      Presenter here
      {!!form && <Presenter onComplete={this.onSubmit} draft={form.draft} />}
    </main>
  );

  render() {
    const { form } = this.state;

    return <div className="App">{this.presenterWrapper(form)}</div>;
  }
}

export default App;
