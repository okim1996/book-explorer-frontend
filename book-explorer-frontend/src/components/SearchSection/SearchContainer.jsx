import SearchBar from "../SearchBar/SearchBar";
import styles from "./SearchContainer.module.css";
function SearchContainer() {
  return (
    <div className={styles.container}>
      <h1 className={styles["main-text"]}>Search for your favourite books!</h1>
      <h3>Search by title, author, publisher, or ISBN with ease:</h3>
      <SearchBar></SearchBar>
    </div>
  );
}
export default SearchContainer;
