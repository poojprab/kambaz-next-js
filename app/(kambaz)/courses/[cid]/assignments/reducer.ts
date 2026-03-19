import { createSlice } from "@reduxjs/toolkit";

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  due: string;
  available: string;
  availableUntil: string;
  course: string;
}

const initialState = {
  assignments: [] as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }: { payload: Assignment[] }) => {
      state.assignments = payload;
    },
    addAssignment: (state, { payload }: { payload: Assignment }) => {
      state.assignments = [...state.assignments, payload];
    },
    deleteAssignment: (
      state,
      { payload: assignmentId }: { payload: string },
    ) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId,
      );
    },
    updateAssignment: (state, { payload }: { payload: Assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a,
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
