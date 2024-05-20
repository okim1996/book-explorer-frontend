import { useDispatch } from "react-redux";
import { setBooks } from "../../store/booksSlice";

function PaginationPrevSet({ store, setInputValue }) {
  const dispatch = useDispatch();
  const set = Math.ceil(store.currentPage / 4) - 1;

  const handleClick = () => {
    const amount =
      store.pages - store.currentPage >= 4
        ? 4
        : store.pages - store.currentPage;
    setInputValue(store.currentPage + amount);
    dispatch(setBooks({ ...store, currentPage: store.currentPage + amount }));
  };
  const handleLastPage = () => {
    setInputValue(store.pages);
    dispatch(setBooks({ ...store, currentPage: store.pages }));
  };
  return (
    <div>
      {store.pages - set * 4 > 4 ? (
        <>
          <p onClick={() => handleClick()}>. . .</p>
          <p onClick={() => handleLastPage()}>{store.pages}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default PaginationPrevSet;
