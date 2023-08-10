import { Link } from "react-router-dom";

const BookPreview = ({ book }) => {
    
  return (


        <Link to={`/book-details/${book._id}`}>
          <div>
            <img id="preview" src={book.image} alt="book" />
            <h4>{book.title}</h4>
            <p>{book.subject}</p>
            <p>{book.ageLevel}</p>
            <p>Created by: {book.owner.username}</p>
          </div>
        </Link>


  );
};

export default BookPreview;