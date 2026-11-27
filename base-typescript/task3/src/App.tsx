import { CourseButtonsView } from "./CourseButtonsView";
import { CourseDropdownView } from "./CourseDropdownView";

const App = () => {
  return (
    <main>
      <h1>Выбор курса</h1>
      <CourseButtonsView />
      <CourseDropdownView />
    </main>
  );
};

export default App;
