export type ClassType = {
  id: number;
  name: string;
  students: StudentType[];
  studentsCount: number;
};

export type StudentType = {
  id: number;
  name: string;
  classId: number;
  class: ClassType;
};
