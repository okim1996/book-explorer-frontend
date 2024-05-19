function PaginationPrevSet({
  pages,
  currentPage,
  setCurrentPage,
  setInputValue,
}) {
  const set = Math.ceil(currentPage / 4) - 1;

  const handleClick = () => {
    const amount = pages - currentPage >= 4 ? 4 : pages - currentPage;
    setCurrentPage(currentPage + amount);
    setInputValue(currentPage + amount);
  };
  const handleLastPage = () => {
    setCurrentPage(pages);
    setInputValue(pages);
  };
  return (
    <div>
      {pages - set * 4 > 4 ? (
        <>
          <p onClick={() => handleClick()}>. . .</p>
          <p onClick={() => handleLastPage()}>{pages}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default PaginationPrevSet;
