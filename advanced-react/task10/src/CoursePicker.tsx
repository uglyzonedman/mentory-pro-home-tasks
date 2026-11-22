import { memo, useEffect, useRef } from "react";
import type { PickerProps } from "./types";

export const CoursePicker = memo(function CoursePicker(props: PickerProps) {
  const { items, selectedIds, onSelect, options } = props;
  console.log("[render] CoursePicker");

  const prevProps = useRef(props);
  useEffect(() => {
    const changed = (Object.keys(props) as (keyof PickerProps)[]).filter(
      (key) => prevProps.current[key] !== props[key],
    );
    if (changed.length) console.log("[props] изменились:", changed.join(", "));
    prevProps.current = props;
  });

  return (
    <ul className="courses">
      {items.map((c) => {
        const isSelected = selectedIds.includes(c.id);
        return (
          <li key={c.id} className="courses__item">
            <span className="courses__title">{c.title}</span>
            {options.showSeats && (
              <span className="courses__meta">мест: {c.seats}</span>
            )}
            <button onClick={() => onSelect(c.id)} disabled={isSelected}>
              {isSelected ? "Выбран" : "Выбрать"}
            </button>
          </li>
        );
      })}
    </ul>
  );
});
