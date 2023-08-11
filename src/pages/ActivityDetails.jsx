import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ActContext } from "../context/act.context"
import { AuthContext } from "../context/auth.context"
// import { CartContext } from "../context/cart.context"

import { post } from "../services/authService"


const ActivityDetails = () => {

    const [activity, setActivity] = useState(null)

    const { activities, getActivities, setActivities } = useContext(ActContext)

    const { user } = useContext(AuthContext)

    // const { cart, setCart } = useContext(CartContext)

    const { activityId } = useParams()

    const navigate = useNavigate()

    const isOwner = () => {
        return user._id === activity.owner._id
    }

    const deleteActivity = () => {

        post(`/activities/delete-activity/${activityId}`, activity)
            .then((response) => {
                let newActivities = activities.filter(activity => activity._id !== response.data._id)
                setActivities(newActivities)
                navigate('/all-activities')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
          postRoute(`/posts/add-comment/${post._id}`, {comment})
          .then((response) => {
            console.log("Comment", response.data)
            let newPosts = [...posts]
            newPosts.splice(index, 1, response.data)
            console.log("NewPosts", newPosts)
            setPosts(newPosts)
            setComment('')
          })
          .catch((err) => {
            console.log(err)
          })
      }

    useEffect(() => {

        if(!activities.length) {
            getActivities()
        }

        let thisActivity = activities.find((activity) => activity._id === activityId)

        setActivity(thisActivity)

    }, [activityId, activities])


  return (
    <div>

        {
            activity ?
            
            <div className="details sign-up">

                <h1>{activity.title} Details</h1>
                <br />

                <img id="activity-detail" src={activity.image} alt="activity" />
                <p><span style={{ fontWeight: "bold" }}>Activity Name:</span> {activity.title}</p>
                <p><span style={{ fontWeight: "bold" }}>Age Level:</span> {activity.ageLevel}</p>
                <p><span style={{ fontWeight: "bold" }}>Subject:</span> {activity.subject}</p>
                <p><span style={{ fontWeight: "bold" }}>Materials Required: </span> {activity.materials}</p>
                <p><span style={{ fontWeight: "bold" }}>Directions:</span> {activity.procedures}</p>
                <h4>Created by: {activity.owner.username}</h4>

                {
                    user && isOwner() &&  
                    <>
                        <Link to={`/edit-activity/${activity._id}`}><button>Edit activity</button></Link>
                        <button onClick={deleteActivity}>Delete Activity</button>
                    </>
                }

                    <>

                            {

                                activity.comments.length ? (

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

export default ActivityDetails