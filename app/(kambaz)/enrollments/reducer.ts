import { createSlice } from "@reduxjs/toolkit";

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: [] as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }: { payload: Enrollment[] }) => {
      state.enrollments = payload;
    },
    enroll: (
      state,
      {
        payload: { userId, courseId },
      }: { payload: { userId: string; courseId: string } },
    ) => {
      const newEnrollment: Enrollment = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    unenroll: (
      state,
      {
        payload: { userId, courseId },
      }: { payload: { userId: string; courseId: string } },
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId),
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
