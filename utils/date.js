const addZero = item => {
  return item < 10 ? `0${item}` : item;
};

export const formattedDate = date => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);

  return `${day}/${month}/${date.getFullYear()}`;
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
