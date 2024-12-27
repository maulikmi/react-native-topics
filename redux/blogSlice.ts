import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Blog {
  id: string;
  title: string;
  content: string;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
}

const initialsState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialsState,
  reducers: {
    fetchBlogsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBlogsSuccess(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
      state.loading = false;
    },
    fetchBlogsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchBlogsStart, fetchBlogsSuccess, fetchBlogsFailure } = blogSlice.actions;

export default blogSlice.reducer;
