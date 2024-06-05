import styles from "./BookDetails.module.css";
import iso6391 from "iso-639-1";
function BookDetails({ bookInfo }) {
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
      <h4 className={styles.title}>Book Details</h4>
      <div className={styles["details-container"]}>
        <div className={styles["left-portion"]}>
          <p className={styles.text}>ISBN-13:</p>
          <p className={styles.text}>ISBN-10:</p>
          <p className={styles.text}>Publisher:</p>
          <p className={styles.text}>Publication Date:</p>
          <p className={styles.text}>Genre(s):</p>
          <p className={styles.text}>Pages:</p>
          <p className={styles.text}>Language:</p>
        </div>
        <div className={styles["right-portion"]}>
          <p className={styles.text}>{isbn13 === undefined ? "N/A" : isbn13}</p>
          <p className={styles.text}>{isbn10 === undefined ? "N/A" : isbn10}</p>
          <p className={styles.text}>
            {publisher === undefined ? "N/A" : publisher}
          </p>
          <p className={styles.text}>{publishedDate}</p>
          <p className={styles.text}>{genres === undefined ? "N/A" : genres}</p>
          <p className={styles.text}>{pages === undefined ? "N/A" : pages}</p>
          <p className={styles.text}>{language === "" ? "N/A" : language}</p>
        </div>
      </div>
    </div>
  );
}
export default BookDetails;
