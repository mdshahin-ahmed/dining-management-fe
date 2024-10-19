import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Grid,
  GridColumn,
  Image,
} from "semantic-ui-react";
import { useClient } from "../../hooks/pure/useClient";

const MealListPage = () => {
  const client = useClient();
  const navigate = useNavigate();
  const { data: mealList, isLoading } = useQuery({
    queryKey: ["meal-list"],
    queryFn: () => client("meal"),
  });
  return (
    <div className="previewLayout">
      <Button
        onClick={() => navigate("add")}
        className="d-flex ml-auto mb-5"
        primary
      >
        Add Meal
      </Button>
      <Grid>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            {mealList?.map((meal) => (
              <GridColumn key={meal?._id} mobile={16} computer={5}>
                <Card className="w-100">
                  <Image
                    className="meal-card-image"
                    src={meal?.image}
                    wrapped
                    ui={false}
                  />
                  <CardContent>
                    <CardHeader>{meal?.name}</CardHeader>
                    <CardDescription>{meal?.description}</CardDescription>
                    <h5 className="mt-1">Price: {meal?.price}</h5>
                  </CardContent>
                  <CardContent extra>
                    <Grid>
                      <GridColumn width={8}>
                        <Button className="meal-modify-btn" fluid color="red">
                          <MdDelete /> Delete
                        </Button>
                      </GridColumn>
                      <GridColumn width={8}>
                        <Button
                          onClick={() => navigate(`${meal?._id}/edit`)}
                          className="meal-modify-btn"
                          fluid
                          primary
                        >
                          <FaEdit /> Edit
                        </Button>
                      </GridColumn>
                    </Grid>
                  </CardContent>
                </Card>
              </GridColumn>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

export default MealListPage;
