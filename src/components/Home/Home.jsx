import { useAuth } from "../../context/app/useAuth";

const Home = () => {
  const { user } = useAuth();
  console.log(user?.balance);
  // const {i}

  return <div className="previewLayout">This is home page</div>;
};

export default Home;
