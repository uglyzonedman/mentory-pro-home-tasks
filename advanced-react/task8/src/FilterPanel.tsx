type FilterPanelProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
};

export const FilterPanel = ({
  category,
  onCategoryChange,
  onQueryChange,
  onReset,
  query,
}: FilterPanelProps) => {
  return (
    <section className="block">
      <h2 className="block__title">Фильтры</h2>
      <div className="block__row">
        <label className="block__label">
          Поиск
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </label>
        <label className="block__label">
          Категория
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="frontend">frontend</option>
            <option value="fullstack">fullstack</option>
            <option value="quality">quality</option>
          </select>
        </label>
        <button onClick={() => onReset()}>Сбросить фильтры</button>
      </div>
    </section>
  );
};
