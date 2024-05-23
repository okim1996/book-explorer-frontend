import StarRating from "../StarRating";
function BookCover({ bookInfo }) {
  const imageLink = bookInfo.volumeInfo?.imageLinks?.thumbnail;
  const rating = bookInfo?.volumeInfo?.averageRating;
  const ratingCount = bookInfo?.volumeInfo?.ratingsCount;
  //   console.log(bookInfo);
  //   console.log(
  //     `this is the rating ${rating} and this is the review count ${ratingCount}`
  //   );

  return (
    <div>
      <img
        src={imageLink === undefined ? "/images/missing_cover.png" : imageLink}
        alt={
          imageLink === undefined
            ? "Cover Not Available"
            : bookInfo.volumeInfo.title
        }
      />
      {rating === undefined ? (
        <p>No User Ratings</p>
      ) : (
        <StarRating rating={rating} reviewCount={ratingCount}></StarRating>
      )}
      {/* <StarRating></StarRating> */}
    </div>
  );
}
export default BookCover;
