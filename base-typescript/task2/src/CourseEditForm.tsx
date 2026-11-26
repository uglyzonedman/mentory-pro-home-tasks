import { useState, type ChangeEvent, type FormEvent } from "react";
import type {
  CourseEditFormProps,
  FormErrors,
  FormValues,
} from "./types";
import { validateCourseForm } from "./lib/validateCourseForm";

export const CourseEditForm = ({ course, onSave }: CourseEditFormProps) => {
  const [values, setValues] = useState<FormValues>({
    title: course.title,
    seats: String(course.seats),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const results = validateCourseForm(values);

    if (!results.ok) {
      setErrors(results.errors);
      return;
    }

    setErrors({});
    onSave({ ...course, title: results.title, seats: results.seats });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <p
        className={
          errors.title ? "form__field form__field--invalid" : "form__field"
        }
      >
        <label className="form__label">
          Название
          <input
            name="title"
            value={values.title}
            onChange={(e) => handleChange(e)}
          />
        </label>
        {errors.title && (
          <span className="form__error" role="alert">
            {errors.title}
          </span>
        )}
      </p>
      <p
        className={
          errors.seats ? "form__field form__field--invalid" : "form__field"
        }
      >
        <label className="form__label">
          Места
          <input
            name="seats"
            inputMode="numeric"
            value={values.seats}
            onChange={(e) => handleChange(e)}
          />
        </label>
        {errors.seats && (
          <span className="form__error" role="alert">
            {errors.seats}
          </span>
        )}
      </p>
      <button type="submit">Сохранить</button>
    </form>
  );
};
