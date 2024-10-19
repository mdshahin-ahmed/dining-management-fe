import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Grid,
  GridColumn,
  Image,
  Popup,
} from "semantic-ui-react";
import { useAuth } from "../../context/app/useAuth";
import DeleteModal from "../common/DeleteModal";

const mealList = [
  {
    _id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJ01i-YVlRenJDi0ZhDErlOIV1nxPdXF_Ig&s",
    title: "Matthew",
    description: "Matthew is a musician living in Nashville.",
    price: 50,
  },
  {
    _id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJ01i-YVlRenJDi0ZhDErlOIV1nxPdXF_Ig&s",
    title: "Matthew",
    description: "Matthew is a musician living in Nashville.",
    price: 51,
  },
  {
    _id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJ01i-YVlRenJDi0ZhDErlOIV1nxPdXF_Ig&s",
    title: "Matthew",
    description: "Matthew is a musician living in Nashville.",
    price: 10,
  },
];
const loading = false;

if (mealList?.length === 0 && !loading) {
  <span>No Data available</span>;
}

const Home = () => {
  const { user } = useAuth();
  console.log(user?.balance);
  // const {i}

  return (
    <div className="previewLayout">
      <DeleteModal
      // onClose={}
      />
      <Grid>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            {mealList?.map((meal) => (
              <GridColumn key={meal?._id} mobile={16} computer={5}>
                <Card className="w-100">
                  <Image src={meal?.image} wrapped ui={false} />
                  <CardContent>
                    <CardHeader>{meal?.title}</CardHeader>
                    <CardDescription>{meal?.description}</CardDescription>
                    <h5 className="mt-1">Price: {meal?.price}</h5>
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
                        <Button
                          className={
                            user?.balance < meal?.price
                              ? `d-flex mx-auto disable-btn`
                              : "d-flex mx-auto"
                          }
                          primary
                        >
                          Purchase
                        </Button>
                      }
                    />
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

export default Home;
