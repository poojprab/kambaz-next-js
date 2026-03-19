import { createSlice } from "@reduxjs/toolkit";

export interface Lesson {
  _id: string;
  name: string;
}

export interface Module {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
  lessons: Lesson[];
}

const initialState = {
  modules: [] as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload: modules }: { payload: Module[] }) => {
      state.modules = modules;
    },
    addModule: (state, { payload: module }: { payload: Partial<Module> }) => {
      const newModule: Module = {
        _id: new Date().getTime().toString(),
        lessons: [],
        name: module.name || "",
        course: module.course || "",
      };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }: { payload: Module }) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? module : m,
      );
    },
    editModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m,
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
