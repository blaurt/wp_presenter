import { ValueType } from 'react-select/lib/types';

export const getSingleSelectValue = (
  e: ValueType<{ label: string; value: string }>
) => {
  if (Array.isArray(e)) {
    throw new Error('not supported');
  }

  if (e) {
    return e.value;
  }

  return '';
};
