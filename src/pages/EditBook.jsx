import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BookContext } from "../context/book.context"

import { get, post } from "../services/authService"


const EditBook = () => {

    const [book, setBook] = useState(null)

    const { books, setBooks } = useContext(BookContext)

    const { bookId } = useParams()

    const navigate = useNavigate()


    const handleTextChange = (e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    // const handleNumberChange = (e) => {
    //     setActivity((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    // }

    const handleSubmit = (e) => {

        e.preventDefault()

        post(`/books/book-update/${bookId}`, book)
            .then((response) => {

                let newBooks = [...books]
                let bookIndex = books.findIndex(book => book._id === response.data._id)
                newBooks[bookIndex] = response.data
                
                setBooks(newBooks)

                navigate(`/book-details/${response.data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    useEffect(() => {

        if(!books.length) {

            get(`/books/book-detail/${bookId}`)
                .then((response) => {
                    console.log("Found Book ===>", response.data)
                    setBook(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {

            let thisBook = books.find((book) => book._id === bookId)
    
            setBook(thisBook)
        }

    }, [])

  return (
    <div className="forms sign-up">
    <div className="form-layout">
      <div className="form-container">
       <h1>Edit Book Post</h1>

       {book ? 
       
       <form onSubmit={handleSubmit}>

            <label>Upload Image:</label>
            <input type="text" name="image" value={book.image} onChange={handleTextChange} /> 

            <label>Title: </label>
            <input type="text" name="title" value={book.title} onChange={handleTextChange} /> 

            <label>Age Level:</label>
            <input type="text" name="ageLevel" value={book.ageLevel} onChange={handleTextChange} /> 

            <label>Select Subject:</label>
            <input type="text" name="subject" value={book.subject} onChange={handleTextChange} /> 

            <label>Book Description:</label>
            <input type="text" name="description" value={book.description} onChange={handleTextChange} /> 

            <button type="submit">Save Book</button>

       </form>

       : <p>Loading...</p>
       
       }

    </div>
    </div>
    </div>
  )
}

export default EditBook