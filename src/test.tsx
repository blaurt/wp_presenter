import * as React from "react";
import { PageHeaderLayout } from "~/FormBuilder/shared/components/layouts/PageHeaderLayout/PageHeaderLayout";
import { BackendFormData } from "~/FormBuilder/types/requests/data";
import { getAppState } from "~/FormBuilder/store/selectors";
import { RouteComponentProps } from "react-router";
import { compose } from "redux";

import { getPresenterFormAction, submitPresenterAction } from "./store/actions";
import { PageContentLayout } from "~/FormBuilder/shared/components/layouts/PageContentLayout/PageContentLayout";
import {
  startProps,
  myConnect
} from "~/FormBuilder/shared/reduxUtils/connectUtils";
import { Presenter } from "~/libs/lead2connect-presenter";

type InputProps = RouteComponentProps<{ formId: string }>;

interface PathParams {
  formId: string;
}

interface Props {
  form: BackendFormData | null;
  onMount: () => void;
  onSubmit: (payload: any, formId: string) => void;
}

type PropsWithRouter = Props & RouteComponentProps<PathParams>;

class PresenterPageDumb extends React.Component<PropsWithRouter> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { form } = this.props;
    return (
      <div>
        <PageHeaderLayout
          pageTitle={{
            pageName: "Presenter Page",
            subtitle: "Test form in action."
          }}
        />
        <PageContentLayout>
          {form ? (
            <Presenter
              draftId={form.draft._id}
              settings={form.draft.formSettings}
              steps={form.draft.steps}
              formId={form.id}
              onSubmit={submitPayload => {
                this.props.onSubmit(submitPayload, form.id);
              }}
            />
          ) : null}
        </PageContentLayout>
      </div>
    );
  }
}

export const PresenterPage = compose(
  startProps<InputProps>(),
  myConnect(
    state => {
      return { form: getAppState(state).presenterPage.activeForm || null };
    },
    (dispatch, ownProps) => {
      return {
        onMount: () =>
          dispatch(
            getPresenterFormAction({ formId: ownProps.match.params.formId })
          ),
        onSubmit: (payload: any, formId: string) =>
          dispatch(submitPresenterAction({ payload, formId }))
      };
    }
  )
)(props => <PresenterPageDumb {...props} />);
