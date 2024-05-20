import { useDispatch } from "react-redux";
import { setBooks } from "../../store/booksSlice";

function PaginationPrevSet({ store, setInputValue }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    setInputValue(store.currentPage - 4);
    dispatch(setBooks({ ...store, currentPage: store.currentPage - 4 }));
  };
  const handleFirstPage = () => {
    setInputValue(1);
    dispatch(setBooks({ ...store, currentPage: 1 }));
  };
  return (
    <div>
      {store.currentPage > 4 ? (
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
