import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = { ...assignment, _id: uuidv4() };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any) => a._id === assignment._id ? assignment : a
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;