import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "semantic-ui-react";
import { useClient } from "../../../hooks/pure/useClient";
import UserMealCard from "./UserMealCard";
import NoDataAvailable from "../../common/NoDataAvailable";

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
        <Button
          primary={mealType === "breakfast"}
          onClick={() => setMealType("breakfast")}
        >
          Breakfast
        </Button>
        <Button
          primary={mealType === "lunch"}
          onClick={() => setMealType("lunch")}
          className="mx-3"
        >
          Lunch
        </Button>
        <Button
          primary={mealType === "dinner"}
          onClick={() => setMealType("dinner")}
        >
          Dinner
        </Button>
      </div>
      {mealType ? (
        mealList?.length > 0 && <h2 className="tac">Choose your {mealType}</h2>
      ) : (
        <h2 className="tac">Please Choose Meal</h2>
      )}
      {mealList?.length === 0 && !isFetching && mealType ? (
        <NoDataAvailable />
      ) : (
        <UserMealCard mealList={mealList} isFetching={isFetching} />
      )}
    </div>
  );
};

export default UserMeal;
