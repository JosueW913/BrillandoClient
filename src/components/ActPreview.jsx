import { Link } from "react-router-dom";

const ActPreview = ({ activity }) => {
    
  return (


        <Link to={`/activity-details/${activity._id}`}>
          <div>
            <img id="preview" src={activity.image} alt="activity" />
            <h3>{activity.title}</h3>
            <p>{activity.subject}</p>
            <p>{activity.ageLevel}</p>
            <p>Created by: {activity.owner.username}</p>
          </div>
        </Link>


  );
};

export default ActPreview;