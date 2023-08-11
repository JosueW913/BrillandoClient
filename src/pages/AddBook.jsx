import { useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"

import { useNavigate } from "react-router-dom"

import { post } from "../services/authService"

import { fileChange } from "../services/fileChange"


const AddBook = () => {

    const { user } = useContext(AuthContext)

    const [book, setBook] = useState({
        owner: user._id,
        image: "",
        title: "",
        ageLevel: "",
        subject: "",
        description: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/books/new-book', book)
            .then((response) => {
                console.log("New Book", response.data)
                navigate('/all-books')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleTextChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // const handleNumberChange = (e) => {
    //     setBook((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    // }

    const handleFileChange = (e) => {

        setButtonDisabled(true)

        fileChange(e)
            .then((response) => {

                setButtonDisabled(false)

                setBook((prev) => ({ ...prev, [e.target.name]: response.data.image }))
            })
            .catch((err) => {
                console.log(err)
                setButtonDisabled(false)
            })

    }

    return (
        <div className="forms sign-up">
            <div className="form-layout">
                <div className="form-container">
                    <h1>Add a Book to our Collection</h1>

                    <form onSubmit={handleSubmit}>

                        <label>Upload Image(s):</label>
                        <input type="file" name="image" onChange={handleFileChange} />

                        <label>Title:</label>
                        <input type="text" name="title" value={book.title} onChange={handleTextChange} />

                        <label>Age Level:</label>
                        <input type="text" name="ageLevel" value={book.ageLevel} onChange={handleTextChange} />

                        <label>Select Subject:</label>
                        <input type="text" name="subject" value={book.subject} onChange={handleTextChange} />

                        <label>Description:</label>
                        <input type="text" name="description" value={book.description} onChange={handleTextChange} />

                        <button type="submit" disabled={buttonDisabled} >Submit Book</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBook
