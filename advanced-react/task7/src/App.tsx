import "./App.css";
import { CourseCatalogContainer } from "./CourseCatalogContainer";
import { CourseListView } from "./CourseListView";
import courses from "./courses.json";

const logSelect = (id: string) => console.log("[onSelect]", id);

function App() {
  return (
    <main>
      <CourseCatalogContainer />
      <section className="block">
        <h2 className="block__title">View: полный список</h2>
        <CourseListView
          items={courses}
          emptyText="Курсов нет"
          onSelect={logSelect}
        />
      </section>
      <section className="block">
        <h2 className="block__title">View: пустой массив</h2>
        <CourseListView
          items={[]}
          emptyText="Курсов нет"
          onSelect={logSelect}
        />
      </section>
    </main>
  );
}

export default App;
