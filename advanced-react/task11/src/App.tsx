import { useFavorites } from "./useFavorites";
import { CourseList } from "./CourseList";
import { FavoritesPanel } from "./FavoritesPanel";
import { IndependentDemo } from "./IndependentDemo";

export default function App() {
  const { ids, toggle, clear } = useFavorites();

  return (
    <main>
      <CourseList ids={ids} onToggle={toggle} />
      <FavoritesPanel ids={ids} onToggle={toggle} onClear={clear} />
      <IndependentDemo />
    </main>
  );
}
