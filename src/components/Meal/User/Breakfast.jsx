import { useQuery } from "@tanstack/react-query";
import UserMealCard from "./UserMealCard";
import { useClient } from "../../../hooks/pure/useClient";

const Breakfast = () => {
  const client = useClient();
  const { data: mealList, isFetching } = useQuery({
    queryKey: ["breakfast-list"],
    queryFn: () => client("meal?type=breakfast"),
  });

  return (
    <div className="previewLayout">
      <h2>Choose your breakfast</h2>
      <UserMealCard mealList={mealList} isFetching={isFetching} />
    </div>
  );
};

export default Breakfast;
