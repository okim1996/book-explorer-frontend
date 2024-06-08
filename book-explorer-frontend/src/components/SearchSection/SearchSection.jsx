import SearchContainer from "./SearchContainer";
import SearchPhoto from "./SearchPhoto";
import styles from "./SearchSection.module.css";
function SearchSection() {
  return (
    <div id="search-section-container" className={styles.container}>
      <SearchContainer></SearchContainer>
    </div>
  );
}
export default SearchSection;
