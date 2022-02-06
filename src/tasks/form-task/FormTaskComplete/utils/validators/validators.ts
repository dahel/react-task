export const validateDateStringFormat = (value: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
};

export const validateDateString = (value: string): boolean => {
  return !!Date.parse(value);
};

export const isDateInThePast = (value: string): boolean => {
  return new Date(value).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
};
