import styles from "./PaginationBar.module.css";
function PaginationPrev({
  totalPages,
  currentPage,
  setCurrentPage,
  inputValue,
  setInputValue,
}) {
  const handlePrev = () => {
    setCurrentPage(Number(currentPage + 1));
    setInputValue(Number(currentPage + 1));
  };
  return (
    <button
      className={`${
        currentPage === totalPages ? styles["disable-button"] : ""
      }`}
      onClick={() => handlePrev()}
    >
      Next
    </button>
  );
}
export default PaginationPrev;
