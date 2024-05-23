import styles from "./BookHeading.module.css";
function BookHeading({ bookInfo }) {
  const authors = bookInfo.volumeInfo?.authors;
  let authorsString = "";
  authorsString += authors?.[0];
  if (authors?.length !== undefined && authors.length > 1) {
    for (let i = 1; i < authors.length; i++) {
      authorsString += `, ${authors[i]}`;
    }
  }

  return (
    <div>
      <h4>{bookInfo.volumeInfo.title}</h4>
      <p>{`by ${authors === undefined ? "N/A" : authorsString}`}</p>
    </div>
  );
}
export default BookHeading;
