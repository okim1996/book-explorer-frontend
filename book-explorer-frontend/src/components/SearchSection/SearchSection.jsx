import SearchContainer from "./SearchContainer";
import SearchPhoto from "./SearchPhoto";
import styles from "./SearchSection.module.css";
function SearchSection() {
  return (
    <div className={styles.container}>
      <SearchContainer></SearchContainer>
    </div>
  );
}
export default SearchSection;
