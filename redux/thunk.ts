import {
  fetchBlogsFailure,
  fetchBlogsStart,
  fetchBlogsSuccess,
} from "./blogSlice";
import { AppDispatch } from "./store";

export const fetchBlogs = () => async (dispatch: AppDispatch) => {
  dispatch(fetchBlogsStart());
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const blogs = data.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      content: item.body,
    }));
    dispatch(fetchBlogsSuccess(blogs));
  } catch (error: any) {
    dispatch(fetchBlogsFailure(error.message));
  }
};
