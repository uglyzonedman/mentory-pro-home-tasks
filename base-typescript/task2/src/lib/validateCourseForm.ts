import type {
  FormErrors,
  FormValues,
  InvalidResult,
  ValidResult,
} from "../types";

export const validateCourseForm = (
  values: FormValues,
): ValidResult | InvalidResult => {
  const errors: FormErrors = {};

  const title = values.title.trim();

  const seats = values.seats.trim();

  if (title === "") errors.title = "Название не может быть пустым";

  if (seats === "") {
    errors.seats = "Введите количество мест";
  } else if (!/^\d+$/.test(seats)) {
    errors.seats = "Места — целое число от 0 (без минуса и дробей)";
  }

  if (errors.title || errors.seats) return { ok: false, errors };

  return { ok: true, title: title, seats: Number(seats) };
};
