export default function birthdayFilter(e) {
  let date = new Date(e);
  let options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleString("en-US", options);
}
