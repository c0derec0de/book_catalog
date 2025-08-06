const API_URL = "https://www.googleapis.com/books/v1/volumes";
const MAX_ITEMS = 14;

export const fetchBooks = async (
  query,
  startIndex: number = 0,
  additionalFilters: string = ""
) => {
  try {
    const params = {
      q: query,
      startIndex: startIndex,
      maxResults: MAX_ITEMS,
      ...(additionalFilters && { filter: additionalFilters }),
    };

    const response = await fetch(`${API_URL}?${new URLSearchParams(params)}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBook = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};
