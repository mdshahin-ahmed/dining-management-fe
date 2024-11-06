import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
} from "semantic-ui-react";
import { useClient } from "../../hooks/pure/useClient";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import CardLoader from "../common/CardLoader";
import DeleteModal from "../common/DeleteModal";
import AsToast from "../common/AsToast";
import { FiTrash2 } from "react-icons/fi";
import NoDataAvailable from "../common/NoDataAvailable";

const MealListPage = () => {
  const { isOpen, onClose, setCustom } = useDisclosure();
  const client = useClient();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: mealList, isFetching: isMealListFetching } = useQuery({
    queryKey: ["meal-list"],
    queryFn: () => client("meal"),
  });

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: (id) => client(`meal/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["meal-list"],
        type: "active",
      });
      onClose();
      AsToast.error(
        <div className="errorToast">
          <FiTrash2 /> &nbsp;
          <span>Meal Deleted Successfully!</span>
        </div>
      );
    },
  });

  if (mealList?.length === 0 && !isMealListFetching) {
    return (
      <div className="previewLayout">
        <Button
          onClick={() => navigate("add")}
          className="d-flex ml-auto mb-5"
          primary
        >
          Add Meal
        </Button>
        <NoDataAvailable />;
      </div>
    );
  }

  return (
    <>
      <DeleteModal
        isLoading={isPending}
        confirmText="Delete"
        modalContent="Are you sure you want to Delete?"
        modalHeader="Delete"
        onClose={onClose}
        open={isOpen}
        onConfirm={() => deleteMutate(isOpen)}
      />
      <div className="previewLayout">
        <Button
          onClick={() => navigate("add")}
          className="d-flex ml-auto mb-5"
          primary
        >
          Add Meal
        </Button>
        <Grid>
          {isMealListFetching ? (
            <CardLoader />
          ) : (
            <>
              {mealList?.map((meal) => (
                <GridColumn key={meal?._id} mobile={16} computer={4}>
                  <Card className="w-100">
                    <CardContent className="p-0">
                      <CardHeader className="mealCardHeader">
                        {meal?.name}
                      </CardHeader>
                      <CardDescription className="px-3 mealDescHeight">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: meal?.description || "",
                          }}
                        />
                      </CardDescription>
                      <h5 className="mt-1 mb-0 px-3">Type: {meal?.type}</h5>
                      <h5 className="m-0 px-3">Price: {meal?.price}</h5>
                      <h4 className="mt-0 px-3">Available: {meal?.stock}</h4>
                    </CardContent>
                    <CardContent extra>
                      <Grid>
                        <GridColumn width={8}>
                          <Button
                            onClick={() => setCustom(meal?._id)}
                            className="meal-modify-btn"
                            fluid
                            color="red"
                          >
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
    </>
  );
};

export default MealListPage;
