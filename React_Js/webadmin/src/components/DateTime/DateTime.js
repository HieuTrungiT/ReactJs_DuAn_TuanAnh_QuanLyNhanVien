import moment from 'moment';

export const TIME = new Date().toLocaleTimeString();
export const DATE = new Date().toLocaleDateString();
export const DATE_TIME = new Date().toISOString();

export const disabledDate = (current) => {
  return current && current > moment().endOf('day');
};

export const MOMENT_DATE = "YYYY-MM-DD";
export const MOMENT_TIME = "HH:mm:ss";
export const MOMENT_DATE_TIME = "YYYY-MM-DD HH:mm:ss";