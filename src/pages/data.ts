type ClassType = {
  id: number;
  name: string;
  studentsCount: number;
};

export const classesMock: ClassType[] = [
  { id: 1, name: "Class 1", studentsCount: 1 },
  { id: 2, name: "Class 2", studentsCount: 2 },
  { id: 3, name: "Class 3", studentsCount: 3 },
  { id: 4, name: "Class 4", studentsCount: 4 },
  { id: 5, name: "Class 5", studentsCount: 5 },
  { id: 6, name: "Class 6", studentsCount: 6 },
  { id: 7, name: "Class 7", studentsCount: 7 },
  { id: 8, name: "Class 8", studentsCount: 8 },
  { id: 9, name: "Class 9", studentsCount: 9 },
  { id: 10, name: "Class 10", studentsCount: 10 },
];

export const studentsMock = [
  { id: 1, name: "Student 1", classId: 1 },
  { id: 2, name: "Student 2", classId: 2 },
  { id: 3, name: "Student 3", classId: 3 },
  { id: 4, name: "Student 4", classId: 4 },
  { id: 5, name: "Student 5", classId: 5 },
  { id: 6, name: "Student 6", classId: 6 },
  { id: 7, name: "Student 7", classId: 7 },
  { id: 8, name: "Student 8", classId: 8 },
  { id: 9, name: "Student 9", classId: 9 },
  { id: 10, name: "Student 10", classId: 10 },
];
