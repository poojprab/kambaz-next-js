/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: quizzes,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz = { ...quiz, _id: uuidv4() };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId
      );
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map(
        (q: any) => q._id === quiz._id ? quiz : q
      ) as any;
    },
    togglePublish: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map(
        (q: any) => q._id === quizId ? { ...q, published: !q.published } : q
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, togglePublish } = quizzesSlice.actions;
export default quizzesSlice.reducer;