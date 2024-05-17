function PaginationPrevSet({
  totalPages,
  currentPage,
  setCurrentPage,
  setInputValue,
}) {
  const set = Math.ceil(currentPage / 4) - 1;

  const handleClick = () => {
    const amount = totalPages - currentPage >= 4 ? 4 : totalPages - currentPage;
    setCurrentPage(currentPage + amount);
    setInputValue(currentPage + amount);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setInputValue(totalPages);
  };
  return (
    <div>
      {totalPages - set * 4 > 4 ? (
        <>
          <p onClick={() => handleClick()}>. . .</p>
          <p onClick={() => handleLastPage()}>{totalPages}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default PaginationPrevSet;
