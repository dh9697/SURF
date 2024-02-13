import { Icon } from "@iconify/react";

export function Util() {
  return <></>;
}

// timeStamp 초단위
export function formatDateTimeStamp(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const date = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}

// timeStamp 날짜
export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const date = String(dateTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
}

export function formatTime(mins) {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}시간 ${minutes}분`;
}

export function formatTimeSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // 문자열 앞에 0을 추가하고, 뒤에서 두 자리를 가져옵니다. 이렇게 하면 항상 두 자리 수가 됩니다.
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${paddedMinutes}:${paddedSeconds}`;
}

// 한화
export function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    minimumFractionDigits: 0,
  }).format(price);
}

// 별점
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
