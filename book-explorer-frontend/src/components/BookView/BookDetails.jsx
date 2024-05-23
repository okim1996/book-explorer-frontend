import iso6391 from "iso-639-1";
function BookDetails({ bookInfo }) {
  console.log(bookInfo);
  const identifiers = bookInfo?.volumeInfo?.industryIdentifiers;
  const isbn13 =
    identifiers?.[0]?.type === "ISBN_13"
      ? identifiers?.[0]?.identifier
      : identifiers?.[1]?.identifier;
  const isbn10 =
    identifiers?.[0]?.type === "ISBN_10"
      ? identifiers?.[0]?.identifier
      : identifiers?.[1]?.identifier;

  const publisher = bookInfo?.volumeInfo?.publisher;
  const publishedDate = bookInfo?.volumeInfo?.publishedDate;
  const categories = bookInfo?.volumeInfo?.categories;
  let genres = categories === undefined ? "N/A" : categories[0];
  if (categories !== undefined && categories.length > 1) {
    for (let i = 1; i < categories.length; i++) {
      genres += `, ${categories[i]}`;
    }
  }
  const pages = bookInfo?.volumeInfo?.pageCount;
  const languageCode = bookInfo?.volumeInfo?.language;
  const language = iso6391.getName(languageCode);
  console.log(pages);
  return (
    <div>
      <p>ISBN-13: {isbn13 === undefined ? "N/A" : isbn13}</p>
      <p>ISBN-10: {isbn10 === undefined ? "N/A" : isbn10}</p>
      <p>Publisher: {publisher === undefined ? "N/A" : publisher}</p>
      <p>
        Publication Date: {publishedDate === undefined ? "N/A" : publishedDate}
      </p>
      <p>Genre(s): {genres === undefined ? "N/A" : genres}</p>
      <p>Pages: {pages === undefined ? "N/A" : pages}</p>
      <p>Language: {language === "" ? "N/A" : language}</p>
    </div>
  );
}
export default BookDetails;
