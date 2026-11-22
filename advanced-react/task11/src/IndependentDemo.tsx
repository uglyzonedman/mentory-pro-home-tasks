import { useFavorites } from "./useFavorites";

const Box = ({ name }: { name: string }) => {
  const { ids, toggle } = useFavorites();
  return (
    <li className="courses__item">
      <span className="courses__title">
        {name}: <span className="block__code">[{ids.join(", ")}]</span>
      </span>
      <button onClick={() => toggle("react")}>toggle react</button>
    </li>
  );
};

export const IndependentDemo = () => (
  <section className="block">
    <h2 className="block__title">Демо: два независимых вызова hook</h2>
    <ul className="courses">
      <Box name="Вызов A" />
      <Box name="Вызов B" />
    </ul>
  </section>
);
