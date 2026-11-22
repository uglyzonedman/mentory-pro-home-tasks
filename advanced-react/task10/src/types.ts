import courses from './courses.json'

export type Course = (typeof courses)[number]
export type Options = { showSeats: boolean }

export type PickerProps = {
  items: Course[]
  selectedIds: string[]
  onSelect: (id: string) => void
  options: Options
}
