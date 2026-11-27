export type RequestStatus = "new" | "approved" | "rejected";

export interface CourseRequest {
  id: string;
  status: RequestStatus;
}

export const requests: CourseRequest[] = [
  { id: "r1", status: "new" },
  { id: "r2", status: "approved" },
  { id: "r3", status: "new" },
  { id: "r4", status: "rejected" },
  { id: "r5", status: "approved" },
];
