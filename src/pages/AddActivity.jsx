import { useState, useContext } from "react"
import { AuthContext } from "../context/auth.context"

import { useNavigate } from "react-router-dom"

import { post } from "../services/authService"
import { fileChange } from "../services/fileChange"




const AddActivity = () => {

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const { user } = useContext(AuthContext)

    const [activity, setActivity] = useState({
        owner: user._id,
        image: "",
        title: "",
        ageLevel: "",
        subject: "",
        materials: "",
        procedures: ""
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        post('/activities/new-activity', activity)
            .then((response) => {
                console.log("New Activity", response.data)
                navigate('/all-activities')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleTextChange = (e) => {
        setActivity((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFileChange = (e) => {

        setButtonDisabled(true)

        fileChange(e)
            .then((response) => {

                setButtonDisabled(false)

                setActivity((prev) => ({ ...prev, [e.target.name]: response.data.image }))
            })
            .catch((err) => {
                console.log(err)
                setButtonDisabled(false)
            })

    }

    // const handleNumberChange = (e) => {
    //     setActivity((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    // }

    return (
        <div className="forms sign-up">
            <div className="form-layout">
                <div className="form-container">
                    <h1>Add a Kids Activities</h1>

                    <form onSubmit={handleSubmit}>

                        <label>Upload Image:</label>
                        <input type="file" name="image" onChange={handleFileChange} />

                        <label>Title:</label>
                        <input type="text" name="title" value={activity.title} onChange={handleTextChange} />

                        <label>Age Level:</label>
                        <input type="text" name="ageLevel" value={activity.ageLevel} onChange={handleTextChange} />

                        <label>Select Subject:</label>
                        <input type="text" name="subject" value={activity.subject} onChange={handleTextChange} />

                        <label>Materials Needed:</label>
                        <input type="text" name="materials" value={activity.materials} onChange={handleTextChange} />

                        <label>Directions:</label>
                        <input type="text" name="procedures" value={activity.procedures} onChange={handleTextChange} />

                        <button type="submit" disabled={buttonDisabled}>Submit Activity</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddActivity
