import { useContext, useEffect } from "react"
import { BookContext } from "../context/book.context"
import BookPreview from "../components/BookPreview"


const AllBooks = () => {

    const { books, getBooks } = useContext(BookContext)

    useEffect(() => {

        getBooks();

    }, [])

    return (
        <div className="container">
            <h1>Brillando Books</h1>

            <div className="details">
                {
                    books.map((book) => {
                        return (

                            <BookPreview key={book._id} book={book} />

                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllBooks