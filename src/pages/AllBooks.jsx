import { useContext, useEffect } from "react"
import { BookContext } from "../context/book.context"
import BookPreview from "../components/BookPreview"


const AllBooks = () => {

    const { books, getBooks } = useContext(BookContext)

    useEffect(() => {

        getBooks();

    }, [])

  return (
    <div id="all-books details"> 
        <h1>Brillando Books</h1>

        {
            books.map((book) => {
                return (

                    <BookPreview key={book._id} book={book} />

                )
            })
        }
    </div>
  )
}

export default AllBooks