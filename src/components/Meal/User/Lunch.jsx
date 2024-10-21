import { useQuery } from "@tanstack/react-query";
import { useClient } from "../../../hooks/pure/useClient";
import UserMealCard from "./UserMealCard";

const Lunch = () => {
  const client = useClient();
  const { data: mealList, isFetching } = useQuery({
    queryKey: ["breakfast-list"],
    queryFn: () => client("meal?type=lunch"),
  });

  return (
    <div className="previewLayout">
      <h2>Choose your lunch</h2>
      <UserMealCard mealList={mealList} isFetching={isFetching} />
    </div>
  );
};

export default Lunch;
