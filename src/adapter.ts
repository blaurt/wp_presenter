export interface PresenterSettings {
  formId?: string;
  mountPoint?: string;
}

export function getFormId(): string {
  let formId: string | undefined = undefined;
  const presenterSettings = window["presenterSettings"] as PresenterSettings;
  console.log("presenterSettings", presenterSettings);

  if (presenterSettings) {
    formId = presenterSettings.formId;
  }
  console.log("formId", formId);

  if (!formId) throw new Error("FormPresenter error: FormId is not provided");
  return formId;
}

export function getMountPointSelector() {
  const defaultMountPoint = "#root";
  let mountPoint: string | undefined = undefined;
  if ("presenterSettings" in window) {
    mountPoint = (window["presenterSettings"] as PresenterSettings).mountPoint;
  }
  console.log('window["presenterSettings"]', window["presenterSettings"]);

  console.log("mountPoint", mountPoint);

  return mountPoint || defaultMountPoint;
}
