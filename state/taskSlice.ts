// taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  name: string;
}

interface TestState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  dataLoaded: boolean;
}

const initialState: TestState = {
  tasks: [{ id: 1, name: 'test' }],
  isLoading: false,
  error: null,
  dataLoaded: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setDataLoaded: (state, action: PayloadAction<boolean>) => {
      state.dataLoaded = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
      state.dataLoaded = false;
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  setLoading,
  setError,
  setDataLoaded,
  clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
