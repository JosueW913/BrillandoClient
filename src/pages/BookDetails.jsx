import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { BookContext } from "../context/book.context"
import { AuthContext } from "../context/auth.context"
// import { CartContext } from "../context/cart.context"

import { post } from "../services/authService"


const BookDetails = () => {

    const [book, setBook] = useState(null)

    const { books, getBooks, setBooks } = useContext(BookContext)

    const { user } = useContext(AuthContext)

    // const { cart, setCart } = useContext(CartContext)

    const { bookId } = useParams()

    const navigate = useNavigate()

    const isOwner = () => {
        return user._id === book.owner._id
    }

    const deleteBook = () => {

        post(`/books/delete-book/${bookId}`, book)
            .then((response) => {
                let newBooks = books.filter(book => book._id !== response.data._id)
                setBooks(newBooks)
                navigate('/all-books')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // const addToCart = () => {
                
    //     if(cart.message) {
            
    //         const body = {
    //             sockId,
    //             sockCost: sock.cost,
    //             subtotal: sock.cost,
    //             total: sock.cost * 1.08
    //         }

    //         console.log("Body", body)

    //         console.log("User", user)

    //         post('/cart/create', body)
    //             .then((response) => {
    //                 console.log("New cart", response.data)
    //                 setCart(response.data)
    //                 navigate('/cart')
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //     } else {
    //         const body = {
    //             sockId,
    //             sockCost: sock.cost,
    //             // subtotal: sock.cost
    //             // subtotal: cart.subtotal + sock.cost,
    //             // total: (cart.subtotal + sock.cost) * 1.08,
    //             cartId: cart._id
    //         }

    //         console.log("CART EXISTS", cart.message)

    //         post('/cart/update', body)
    //         .then((response) => {
    //             console.log("Updated cart", response.data)
    //             setCart(response.data)
    //             navigate('/cart')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }
    //     // sockId, subtotal, total, cartId
    // }

    useEffect(() => {

        if(!books.length) {
            getBooks()
        }

        let thisBook = books.find((book) => book._id === bookId)

        setBook(thisBook)

    }, [bookId, books])


  return (
    <div className="container sign-up details">
        <h1>Book Details</h1>

        {
            book ?

            <div>

                {/* {!isOwner() &&  
                    <>
                        <button onClick={addToCart} >Add to Cart</button>
                    </>
                } */}

                <h1>{book.title} Details</h1>
                <br />

                <img id="book-detail" src={book.image} alt="book" />
                <p><span style={{ fontWeight: "bold" }}>Age Level:</span> {book.ageLevel}</p>
                <p><span style={{ fontWeight: "bold" }}>Subject:</span> {book.subject}</p>
                <p><span style={{ fontWeight: "bold" }}>Description: </span> {book.description}</p>
                <h4>Created by: {book.owner.username}</h4>

                {
                    user && isOwner() &&  
                    <>
                        <Link to={`/edit-book/${book._id}`}><button>Edit Book</button></Link>
                        <button onClick={deleteBook}>Delete Book</button>
                    </>
                }

                    <>

                            {

                                book.comments.length ? (

                                    <>
                                        {
                                            activity.comments.map((comment) => {
                                                return (
                                                    <>
                                                        <p>{comment.comment}</p>
                                                        <h6>-{comment.author.username}</h6>
                                                    </>
                                                )
                                            })
                                        }
                                    </>                                    

                                ) : null

  

                            }
                    </>
            </div>

            : <p>Loading...</p>

        }
    

    </div>

  )
}

export default BookDetails