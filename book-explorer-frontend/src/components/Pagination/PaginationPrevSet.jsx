function PaginationPrevSet({ currentPage, setCurrentPage, setInputValue }) {
  const handleClick = () => {
    setCurrentPage(currentPage - 4);
    setInputValue(currentPage - 4);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
    setInputValue(1);
  };
  return (
    <div>
      {currentPage > 4 ? (
        <>
          <p onClick={() => handleFirstPage()}>1</p>{" "}
          <p onClick={() => handleClick()}>. . .</p>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default PaginationPrevSet;
