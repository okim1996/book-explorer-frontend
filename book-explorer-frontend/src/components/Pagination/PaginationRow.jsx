import styles from "./PaginationBar.module.css";
function PaginationRow({
  pages,
  currentPage,
  setCurrentPage,
  inputValue,
  setInputValue,
}) {
  const set = Math.ceil(currentPage / 4) - 1;
  let remainder = currentPage % 4;
  if (remainder === 0) remainder = 4;
  const value = set * 4 + remainder;
  let pagesRow = [];
  for (let i = 1; i <= 4; i++) {
    if (set * 4 + i <= pages) pagesRow.push(set * 4 + i);
  }

  const handleClickPage = (event) => {
    setCurrentPage(Number(event.target.innerHTML));
    setInputValue(Number(event.target.innerHTML));
  };

  return (
    <>
      {pagesRow.map((page) => {
        if (page === value) {
          return (
            <p
              onClick={(event) => handleClickPage(event)}
              key={page}
              className={styles.bold}
            >
              {page}
            </p>
          );
        } else {
          return (
            <p onClick={(event) => handleClickPage(event)} key={page}>
              {page}
            </p>
          );
        }
      })}
    </>
  );
}
export default PaginationRow;
