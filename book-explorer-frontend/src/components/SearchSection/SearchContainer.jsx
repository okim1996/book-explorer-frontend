import SearchBar from "../SearchBar/SearchBar";
import styles from "./SearchContainer.module.css";
function SearchContainer() {
  return (
    <div className={styles.container}>
      <h1 className={styles["main-text"]}>
        Amazing deals on bestselling ebooks
      </h1>
      <h3>Join for FREE to never miss a deal:</h3>
      <SearchBar></SearchBar>
    </div>
  );
}
export default SearchContainer;
