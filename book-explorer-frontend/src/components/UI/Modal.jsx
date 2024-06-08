import { useEffect, useState, useRef } from "react";
import styles from "./Modal.module.css";
import BookView from "../BookView/BookView";
import { setBooks } from "../../store/booksSlice";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
function Modal({ children, index, isOpen, onClose }) {
  const store = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const leftRef = useRef();
  const rightRef = useRef();
  const [slideFrom, setSlideFrom] = useState("");
  const [render, setRender] = useState(0);
  if (modalRef.current) {
    if (slideFrom == "left") {
      modalRef.current.classList.add(styles["slide-from-left"]);
    }
    if (slideFrom == "right") {
      modalRef.current.classList.add(styles["slide-from-right"]);
    }
  }
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.classList.remove(styles["slide-from-left"]);
      modalRef.current.classList.remove(styles["slide-from-right"]);
    }
    setRender(render + 1);
  }, [store.modalIndex]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (
          !leftRef.current.contains(event.target) &&
          !rightRef.current.contains(event.target)
        ) {
          dispatch(setBooks({ ...store, hideSticky: false }));
          onClose();
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  const clickLeft = () => {
    if (store.modalIndex > 0) {
      const page = Math.floor(store.modalIndex / store.showNum) + 1;
      dispatch(
        setBooks({
          ...store,
          modalIndex: store.modalIndex - 1,
          currentPage: page,
        })
      );
      setSlideFrom("left");
    }
  };
  const clickRight = () => {
    if (store.modalIndex < store.totalItems - 1) {
      const page = Math.floor(store.modalIndex / store.showNum) + 1;
      dispatch(
        setBooks({
          ...store,
          modalIndex: store.modalIndex + 1,
          currentPage: page,
        })
      );
      setSlideFrom("right");
    }
  };
  if (!isOpen) return null;
  return (
    <div className={`${styles.modal}`}>
      <svg
        onClick={clickLeft}
        ref={leftRef}
        className={`${
          store.modalIndex === 0 ? styles["disable-left"] : styles["left-arrow"]
        }`}
        fill="#000000"
        height="70px"
        width="70px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g>
            <g>
              <path
                d="M256,5.333C114.88,5.333,0,117.76,0,256s114.88,250.667,256,250.667S512,394.24,512,256S397.12,5.333,256,5.333z
				 M256,485.333C126.613,485.333,21.333,382.4,21.333,256S126.613,26.667,256,26.667S490.667,129.493,490.667,256
				S385.387,485.333,256,485.333z"
              />
              <path
                d="M337.387,381.013c-0.107-0.107-0.32-0.213-0.427-0.32L167.36,256l169.6-124.8c4.8-3.413,5.76-10.133,2.347-14.827
				c-3.52-4.8-10.133-5.76-14.933-2.24L143.04,247.467c-4.693,3.52-5.76,10.133-2.24,14.933c0.64,0.853,1.387,1.6,2.24,2.24
				l181.333,133.227c4.693,3.627,11.307,2.773,14.933-1.92C342.933,391.253,342.08,384.64,337.387,381.013z"
              />
            </g>
          </g>
        </g>
      </svg>
      <div className={`${styles.modalContent}`} ref={modalRef}>
        <div className={styles["button-container"]} onClick={onClose}>
          <span className={styles.button}>&times;</span>
        </div>
        <BookView></BookView>
      </div>
      <svg
        onClick={clickRight}
        ref={rightRef}
        className={`${
          store.modalIndex === store.totalItems - 1
            ? styles["disable-right"]
            : styles["right-arrow"]
        }`}
        fill="#000000"
        height="70px"
        width="70px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g>
            <g>
              <path
                d="M256,5.333C114.88,5.333,0,117.76,0,256s114.88,250.667,256,250.667S512,394.24,512,256S397.12,5.333,256,5.333z
				 M256,485.333C126.613,485.333,21.333,382.4,21.333,256S126.613,26.667,256,26.667S490.667,129.493,490.667,256
				S385.387,485.333,256,485.333z"
              />
              <path
                d="M369.28,247.467l-181.653-133.44c-4.693-3.627-11.307-2.773-14.933,1.92c-3.627,4.693-2.773,11.307,1.92,14.933
				c0.107,0.107,0.32,0.213,0.427,0.32L344.96,256L175.04,380.693c-4.8,3.52-5.76,10.133-2.24,14.933
				c3.52,4.8,10.133,5.76,14.933,2.24L369.387,264.64c4.8-3.52,5.76-10.133,2.24-14.933
				C370.88,248.853,370.133,248.107,369.28,247.467z"
              />
            </g>
          </g>
        </g>
      </svg>{" "}
    </div>
  );
}
export default Modal;
