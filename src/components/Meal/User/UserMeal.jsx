import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
import UserMealCard from "./UserMealCard";
import { useClient } from "../../../hooks/pure/useClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const UserMeal = () => {
  const [mealType, setMealType] = useState("");
  console.log(mealType);

  //   const navigate = useNavigate();
  const client = useClient();
  const { data: mealList, isFetching } = useQuery({
    queryKey: [`${mealType}-list`],
    queryFn: () => client(`meal?type=${mealType}`),
    enabled: !!mealType,
  });
  return (
    <div className="previewLayout">
      <div className="d-flex jcc mb-5">
        {/* <Button primary onClick={() => navigate("breakfast")}>
          Breakfast
        </Button>
        <Button primary onClick={() => navigate("lunch")} className="mx-3">
          Lunch
        </Button>
        <Button primary onClick={() => navigate("dinner")}>
          Dinner
        </Button> */}
        <Button primary onClick={() => setMealType("breakfast")}>
          Breakfast
        </Button>
        <Button primary onClick={() => setMealType("lunch")} className="mx-3">
          Lunch
        </Button>
        <Button primary onClick={() => setMealType("dinner")}>
          Dinner
        </Button>
      </div>
      {mealType && <h2>Choose your {mealType}</h2>}
      <UserMealCard mealList={mealList} isFetching={isFetching} />
    </div>
  );
};

export default UserMeal;
