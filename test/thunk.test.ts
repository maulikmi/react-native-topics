import {
  fetchBlogsStart,
  fetchBlogsSuccess,
  fetchBlogsFailure,
} from "@/redux/blogSlice";
import { AppDispatch } from "@/redux/store";
import { fetchBlogs } from "@/redux/thunk";

// Mock the fetch function globally
global.fetch = jest.fn();

describe("fetchBlogs action", () => {
  let dispatch: jest.MockedFunction<AppDispatch>;

  beforeEach(() => {
    dispatch = jest.fn().mockName("Dispatch"); // Mock the dispatch function
    (fetch as jest.Mock).mockClear(); // Clear mock calls
  });

  it("dispatches fetchBlogsStart and fetchBlogsSuccess on successful API call", async () => {
    const mockResponse = [
      { id: 1, title: "Blog 1", body: "Content 1" },
      { id: 2, title: "Blog 2", body: "Content 2" },
    ];

    // Mock the API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    await fetchBlogs()(dispatch);


    // Check that actions were dispatched in the correct order
    expect(dispatch).toHaveBeenCalledWith(fetchBlogsStart());
    expect(dispatch).toHaveBeenCalledWith(
      fetchBlogsSuccess([
        { id: "1", title: "Blog 1", content: "Content 1" },
        { id: "2", title: "Blog 2", content: "Content 2" },
      ])
    );
  });

  it("dispatches fetchBlogsStart and fetchBlogsFailure on failed API call", async () => {
    const mockError = new Error("API error");

    // Mock the API to throw an error
    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await fetchBlogs()(dispatch);

    // Check that actions were dispatched in the correct order
    expect(dispatch).toHaveBeenCalledWith(fetchBlogsStart());
    expect(dispatch).toHaveBeenCalledWith(fetchBlogsFailure(mockError.message));
  });
});
