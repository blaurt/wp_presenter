export const createDays = () => {
  return new Array(31).fill({}).map((item, index) => {
    const val = index + 1;
    return { value: val, label: String(val) };
  });
};

export const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const createMonths = () => monthsOfYear.map((month, index) => ({ value: index, label: month }));

export const createYears = (pastLimit: number) => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - pastLimit;
  return new Array(pastLimit).fill({}).map((item, index) => {
    const val = startYear + (index + 1);
    return { value: val, label: String(val) };
  });
};
