import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

const MealListPage = () => {
  const navigate = useNavigate();
  return (
    <div className="previewLayout">
      <Button
        onClick={() => navigate("add")}
        className="d-flex ml-auto"
        primary
      >
        Add Meal
      </Button>
    </div>
  );
};

export default MealListPage;
