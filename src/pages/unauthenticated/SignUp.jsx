import logo from "@/assets/logo.png";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Image } from "semantic-ui-react";
import { AsForm, AsInput } from "../../components/common/form";
import { signupSchema } from "../../validations/signin/signin.schema";
import { useAuth } from "../../context/app/useAuth";
const SignUp = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      hostel: "",
      room: "",
      password: "",
    },
    resolver: joiResolver(signupSchema),
  });
  const { setUser } = useAuth();
  const handleSignin = (data) => {
    setUser(data);
    navigate("/home");
    console.log(data);
  };

  return (
    <div className="loginPageWrap d-flex jcc aic">
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column className="loginCardWrap signupCard">
          <Image src={logo} />
          <Header as="h3" color="teal" textAlign="center">
            Create an account!
          </Header>
          <AsForm control={control} errors={errors} size="large">
            <AsInput
              maxLength={30}
              name="name"
              required
              label="Name"
              placeholder="Enter your name"
            />
            <AsInput
              maxLength={100}
              name="email"
              required
              label="Email"
              placeholder="Enter your email"
            />
            <AsInput
              maxLength={30}
              name="password"
              required
              label="Password"
              placeholder="Enter a password"
            />
            <AsInput
              name="mobile"
              required
              label="Mobile"
              placeholder="Enter your mobile number"
            />
            <AsInput
              maxLength={30}
              name="hostel"
              required
              label="Hostel Name"
              placeholder="Enter your hall name"
            />
            <AsInput
              maxLength={4}
              name="room"
              required
              label="Room Number"
              placeholder="Room number"
            />

            <GridColumn width={16}>
              <Button onClick={handleSubmit(handleSignin)} primary fluid>
                Sign Up
              </Button>
            </GridColumn>
            <span className="mx-auto pb-2">
              Already have an account?{" "}
              <span
                className="c-primary c-pointer"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </span>
            </span>
          </AsForm>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SignUp;
