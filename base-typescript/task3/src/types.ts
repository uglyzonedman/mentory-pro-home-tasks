export interface Course {
  id: string;
  title: string;
  category: string;
  seats: number;
  version: number;
}

export interface CourseEditFormProps {
  onSave: React.Dispatch<React.SetStateAction<Course>>;
  course: Course;
}

export interface FormValues {
  title: string;
  seats: string;
}

export interface FormErrors {
  title?: string;
  seats?: string;
}

export type ValidResult = { ok: true; title: string; seats: number };

export type InvalidResult = { ok: false; errors: FormErrors };

export interface UseSelectionResult {
  selectedId: string | null;
  reset: () => void;
  select: (id: string) => void;
}
