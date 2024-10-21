import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

const UserMeal = () => {
  const navigate = useNavigate();
  return (
    <div className="previewLayout d-flex jcc">
      <Button primary onClick={() => navigate("breakfast")}>
        Breakfast
      </Button>
      <Button primary onClick={() => navigate("lunch")} className="mx-3">
        Lunch
      </Button>
      <Button primary onClick={() => navigate("dinner")}>
        Dinner
      </Button>
    </div>
  );
};

export default UserMeal;
