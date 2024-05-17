export async function fetchData(query) {
  try {
    const response = await fetch(query);
    // console.log(`this is the url from paginationbar ${query}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // for (const key in data) {
    //   console.log(`paginationbar : ${key} : ${data[key]}`);
    // }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}
