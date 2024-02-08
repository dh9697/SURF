import { Icon } from "@iconify/react";

export function Util() {
  return <></>;
}

export function formatDateTimeStamp(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const date = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}

export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const date = String(dateTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(price);
}

export function StarRating({ averageRating }) {
  const rating = Math.round(averageRating);

  const validRating = Number.isNaN(rating) || rating < 0 ? 0 : rating;

  const filledStars = Array(validRating)
    .fill()
    .map((_, index) => (
      <Icon key={`filled-${index}`} icon={"ph:star-fill"} color="#3182f6" />
    ));
  const emptyStars = Array(5 - validRating)
    .fill()
    .map((_, index) => (
      <Icon key={`empty-${index}`} icon={"ph:star"} color="#3182f6" />
    ));

  return (
    <span>
      {filledStars}
      {emptyStars}
    </span>
  );
}
