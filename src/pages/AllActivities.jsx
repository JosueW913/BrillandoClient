import { useContext, useEffect } from "react"
import { ActContext } from "../context/act.context"
import ActPreview from "../components/ActPreview"

const AllActivities = () => {

    const { activities, getActivities } = useContext(ActContext)

    useEffect(() => {

        getActivities();

    }, [])

    return (
        <div className="container">

            <h1>All Kids Activities</h1>

            <div className="details">

                {
                    activities.map((activity) => {
                        return (

                            <ActPreview key={activity._id} activity={activity} />

                        )
                    })
                }
            </div>

        </div>
    )
}

export default AllActivities