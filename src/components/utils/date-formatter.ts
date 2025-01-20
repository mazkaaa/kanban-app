export const formatDateToFulldate = (date: string) => {
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const parsedHours = hours < 10 ? `0${hours}` : hours;
  const parsedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${day} ${month} ${year} - ${parsedHours}:${parsedMinutes}`;
};
