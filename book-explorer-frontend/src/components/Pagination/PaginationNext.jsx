import styles from "./PaginationBar.module.css";
function PaginationNext({
  pages,
  currentPage,
  setCurrentPage,
  inputValue,
  setInputValue,
}) {
  const handleNext = () => {
    setCurrentPage(Number(currentPage + 1));
    setInputValue(Number(currentPage + 1));
  };
  return (
    <button
      className={`${currentPage === pages ? styles["disable-button"] : ""}`}
      onClick={() => handleNext()}
    >
      Next
    </button>
  );
}
export default PaginationNext;
