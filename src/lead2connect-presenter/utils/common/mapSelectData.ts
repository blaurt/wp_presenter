interface Params {
  optionLabel: string;
  optionValue: string;
  id?: string;
}

export const mapBackendSelectDataToSelect = (payload: Params[]) => {
  return payload
    .map((param) => {
      return {
        label: param.optionLabel,
        value: param.optionValue,
        ...(param.id && { id: param.id })
      };
    })
    .filter(data => data.value && data.label);
};

export const mapSelectToBackendData = (payload: {
value: string;
label: string;
id?: string;
}) => {
  const { label, value, id } = payload;
  return {
    optionLabel: label,
    optionValue: value,
    id
  };
};
