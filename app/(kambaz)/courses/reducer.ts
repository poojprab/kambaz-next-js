import { createSlice } from "@reduxjs/toolkit";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image?: string;
}

const initialState = {
  courses: [] as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, { payload: course }: { payload: Course }) => {
      state.courses = [...state.courses, course];
    },
    deleteCourse: (state, { payload: courseId }: { payload: string }) => {
      state.courses = state.courses.filter((course) => course._id !== courseId);
    },
    updateCourse: (state, { payload: course }: { payload: Course }) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c,
      );
    },
    setCourses: (state, { payload: courses }: { payload: Course[] }) => {
      state.courses = courses;
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
