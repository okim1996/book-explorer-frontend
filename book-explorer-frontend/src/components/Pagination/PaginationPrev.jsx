import styles from "./PaginationBar.module.css";
function PaginationPrev({
  currentPage,
  setCurrentPage,
  inputValue,
  setInputValue,
}) {
  const handlePrev = () => {
    setCurrentPage(Number(currentPage - 1));
    setInputValue(Number(currentPage - 1));
  };
  return (
    <button
      className={`${currentPage === 1 ? styles["disable-button"] : ""}`}
      onClick={() => handlePrev()}
    >
      Previous
    </button>
  );
}
export default PaginationPrev;
