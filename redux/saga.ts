import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchBlogsFailure,
  fetchBlogsStart,
  fetchBlogsSuccess,
} from "./blogSlice";

//Effect : Functions (like call, put, takeLatest) used to describe side effects (e.g., API calls, dispatching actions).
function* fetBlogsSaga() {
  try {
    const response = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = yield response.json();
    const blogs = data.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      content: item.body,
    }));
    yield put(fetchBlogsSuccess(blogs));
  } catch (error: any) {
    yield put(fetchBlogsFailure(error.message));
  }
}

//Saga : Functions that watch for specific actions dispatched to the Redux store and handle them.
export default function* blogSaga(){
    yield takeLatest(fetchBlogsStart.type, fetBlogsSaga);
}
