import { useSelection } from "./useSelection";

export function WrongSelectUsage() {
  const { select } = useSelection(null);

  return (
    <button
      onClick={() => {
        // @ts-expect-error select принимает только string, число 42 запрещено
        select(42);
      }}
    >
      Неверный вызов
    </button>
  );
}
