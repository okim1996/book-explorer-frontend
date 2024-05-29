import styles from "./BookDetails.module.css";
import iso6391 from "iso-639-1";
function BookDetails({ bookInfo }) {
  console.log(bookInfo.volumeInfo);
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
  //date
  // const dateString = bookInfo?.volumeInfo?.publishedDate;
  // const date = new Date(dateString);
  // const year = date.getFullYear();
  // const month = date.getMonth();
  // const day = date.getDate() + 1;
  // console.log(Number("01"));
  // console.log(bookInfo?.volumeInfo?.publishedDate);
  // console.log(`month : ${month} , day : ${day} , year : ${year}`);
  // let publishedDate = "";
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // if (!year && !month && !day) {
  //   publishedDate = "N/A";
  // } else if (dateString.length === 4) {
  //   publishedDate = year + 1;
  // } else {
  //   publishedDate = `${months[month]} ${day}, ${year}`;
  // }

  const dateString = bookInfo?.volumeInfo?.publishedDate;
  let publishedDate = "";
  let year = "";
  let month = "";
  let day = "";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (dateString?.length === 4) {
    publishedDate = dateString;
  } else if (dateString === undefined) {
    publishedDate = "N/A";
  } else {
    let splits = dateString.split("-");
    year = Number(splits[0]);
    month = Number(splits[1]);
    day = Number(splits[2]);
    publishedDate = `${month ? months[month - 1] : ""}${day ? " " + day : ""}${
      year ? ", " + year : ""
    }`;
  }
  console.log(bookInfo?.volumeInfo?.publishedDate);
  //
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
  return (
    <div className={styles.container}>
      <p>ISBN-13: {isbn13 === undefined ? "N/A" : isbn13}</p>
      <p>ISBN-10: {isbn10 === undefined ? "N/A" : isbn10}</p>
      <p>Publisher: {publisher === undefined ? "N/A" : publisher}</p>
      <p>Publication Date: {publishedDate}</p>
      <p>Genre(s): {genres === undefined ? "N/A" : genres}</p>
      <p>Pages: {pages === undefined ? "N/A" : pages}</p>
      <p>Language: {language === "" ? "N/A" : language}</p>
    </div>
  );
}
export default BookDetails;
