export type ClassType = {
  id: number;
  name: string;
  studentsCount: number;
};

export type StudentType = {
  id: number;
  name: string;
  classId: number;
  className: string;
};
