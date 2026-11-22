type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onClear: () => void;
};

export const SearchPanel = ({ query, onQueryChange, onClear }: Props) => (
  <section className="block">
    <h2 className="block__title">Поиск</h2>
    <div className="block__row">
      <label className="block__label">
        Название
        <input value={query} onChange={(e) => onQueryChange(e.target.value)} />
      </label>
      <button onClick={onClear} disabled={query === ""}>
        Очистить поиск
      </button>
    </div>
  </section>
);
