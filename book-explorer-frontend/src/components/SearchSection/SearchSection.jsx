import SearchContainer from "./SearchContainer";
import SearchPhoto from "./SearchPhoto";
import styles from "./SearchSection.module.css";
function SearchSection({ setBooksLoading }) {
  return (
    <div id="search-section-container" className={styles.container}>
      <SearchContainer setBooksLoading={setBooksLoading}></SearchContainer>
    </div>
  );
}
export default SearchSection;
