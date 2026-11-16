import { useRef, useState } from "react";
import { CoursesList } from "./CoursesList";

export const UncontrolledFilter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [applied, setApplied] = useState("");

  const handleApply = () => {
    setApplied(inputRef.current?.value ?? "");
  };

  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    setApplied("");
  };

  return (
    <section className="filter">
      <h2 className="filter__title">Неуправляемый компонент</h2>
      <div className="filter__controls">
        <label className="filter__label">
          Название курса
          <input
            ref={inputRef}
            defaultValue=""
            placeholder="Введите название курса"
          />
        </label>
        <button onClick={handleApply}>Применить</button>
        <button onClick={handleReset}>Сбросить</button>
      </div>

      <CoursesList query={applied} />
    </section>
  );
};
