export async function fetchData(query) {
  try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}
