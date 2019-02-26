const regExp = /({\w+})/g;

export const formatErrorText = (errText: string, replaceWith: any): string => errText.replace(regExp, String(replaceWith));
