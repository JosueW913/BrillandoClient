import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ActContext } from "../context/act.context"

import { get, post } from "../services/authService"


const EditActivity = () => {

    const [activity, setActivity] = useState(null)

    const { activities, setActivities } = useContext(ActContext)

    const { activityId } = useParams()

    const navigate = useNavigate()


    const handleTextChange = (e) => {
        setActivity((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    // const handleNumberChange = (e) => {
    //     setActivity((prev) => ({...prev, [e.target.name]: Number(e.target.value)}))
    // }

    const handleSubmit = (e) => {

        e.preventDefault()

        post(`/activities/activity-update/${activityId}`, activity)
            .then((response) => {

                let newActs = [...activities]
                let actIndex = activities.findIndex(activity => activity._id === response.data._id)
                newActs[actIndex] = response.data
                
                setActivities(newActs)

                navigate(`/activity-details/${response.data._id}`)
            })
            .catch((err) => {
                console.log(err)
            })


    }

    useEffect(() => {

        if(!activities.length) {

            get(`/activities/activities-detail/${activityId}`)
                .then((response) => {
                    console.log("Found Act ===>", response.data)
                    setActivity(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } else {

            let thisAct = activities.find((activity) => activity._id === activityId)
    
            setActivity(thisAct)
        }

    }, [])

  return (
    <div>
       <h1>Edit Activity</h1>

       {activity ? 
       
       <form onSubmit={handleSubmit}>

            <label>Upload Image:</label>
            <input type="text" name="image" value={activity.image} onChange={handleTextChange} /> 

            <label>Title: </label>
            <input type="text" name="title" value={activity.title} onChange={handleTextChange} /> 

            <label>Age Level:</label>
            <input type="text" name="ageLevel" value={activity.ageLevel} onChange={handleTextChange} /> 

            <label>Select Subject:</label>
            <input type="text" name="subject" value={activity.subject} onChange={handleTextChange} /> 

            <label>Materials Needed:</label>
            <input type="text" name="materials" value={activity.materials} onChange={handleTextChange} /> 

            <label>Directions:</label>
            <input type="text" name="procedures" value={activity.procedures} onChange={handleTextChange} /> 

            <button type="submit">Save Activity</button>

       </form>

       : <p>Loading...</p>
       
       }

    </div>
  )
}

export default EditActivity