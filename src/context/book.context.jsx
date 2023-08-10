import { useState, createContext } from "react";
import { get } from "../services/authService";

const BookContext = createContext()

const BookProvider = ({ children }) => {

    const [books, setBooks] = useState([])

    const getBooks = () => {

        get('/books')
            .then((response) => {
                console.log("Books", response.data)
                setBooks(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <BookContext.Provider value={{ books, getBooks, setBooks }}>
            {children}
        </BookContext.Provider>
    )
}

export { BookContext, BookProvider};