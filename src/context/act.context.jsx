import { useState, createContext } from "react";
import { get } from "../services/authService";

const ActContext = createContext()

const ActProvider = ({ children }) => {

    const [activities, setActivities] = useState([])

    const getActivities = () => {

        get('/activities')
            .then((response) => {
                console.log("Activities", response.data)
                setActivities(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <ActContext.Provider value={{ activities, getActivities, setActivities }}>
            {children}
        </ActContext.Provider>
    )
}

export { ActContext, ActProvider};