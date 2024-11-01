import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Grid,
  GridColumn,
  Popup,
} from "semantic-ui-react";
import NoDataAvailable from "../../common/NoDataAvailable";
import { useAuth } from "../../../context/app/useAuth";
import CardLoader from "../../common/CardLoader";
import RechargeModal from "../../common/RechargeModal";
import { useDisclosure } from "../../../hooks/pure/useDisclosure";

const UserMealCard = ({ mealList, isFetching, setCustom }) => {
  const { user } = useAuth();
  const { isOpen, onClose, setCustom: setRechargeCustom } = useDisclosure();
  if (mealList?.length === 0 && !isFetching) {
    return (
      <div className="previewLayout">
        <NoDataAvailable />
      </div>
    );
  }
  return (
    <>
      <RechargeModal onClose={onClose} open={isOpen} />
      <Grid>
        {isFetching ? (
          <CardLoader />
        ) : (
          <>
            {mealList?.map((meal) => (
              <GridColumn key={meal?._id} mobile={16} computer={5}>
                <Card className="w-100">
                  <CardContent>
                    <CardHeader>{meal?.name}</CardHeader>
                    <CardDescription>{meal?.description}</CardDescription>
                    <h5 className="mt-1 mb-0">Type: {meal?.type}</h5>
                    <h5 className="mt-0">Price: {meal?.price}</h5>
                    <h4 className="mt-0">Available: {meal?.stock}</h4>
                  </CardContent>
                  <CardContent extra>
                    <Popup
                      content={
                        user?.balance < meal?.price
                          ? "You balance is low. Please recharge."
                          : "Purchase"
                      }
                      position="top center"
                      trigger={
                        meal?.stock < 1 ? (
                          <Button className="d-flex mx-auto" color="red">
                            Stock Out
                          </Button>
                        ) : (
                          <Button
                            color={user?.balance > meal?.price ? "blue" : "red"}
                            className={
                              user?.balance < meal?.price
                                ? `d-flex mx-auto`
                                : "d-flex mx-auto"
                            }
                            onClick={() => {
                              if (user?.balance > meal?.price) {
                                setCustom(meal?._id);
                              }
                              if (user?.balance < meal?.price) {
                                setRechargeCustom(true);
                              }
                            }}
                          >
                            {user?.balance > meal?.price
                              ? "Purchase"
                              : "Recharge"}
                          </Button>
                        )
                      }
                    />
                  </CardContent>
                </Card>
              </GridColumn>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default UserMealCard;
