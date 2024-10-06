import logo from "@/assets/logo.png";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Image } from "semantic-ui-react";
import { AsForm, AsInput } from "../../components/common/form";
import signinSchema from "../../validations/signin/signin.schema";
import { useEffect } from "react";
const SignUp = () => {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log("Signup component rendered");
    console.log("Current URL:", location.pathname);
  }, [location]);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: joiResolver(signinSchema),
  });
  const handleSignin = (data) => {
    console.log(data);
  };

  return (
    <div className="loginPageWrap d-flex jcc aic">
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column className="loginCardWrap">
          <Image src={logo} />
          <Header as="h3" color="teal" textAlign="center">
            Create an account!
          </Header>
          <AsForm control={control} errors={errors} size="large">
            <AsInput name="name" required label="Enter your name" />
            <AsInput name="email" required label="Enter your email" />
            <GridColumn width={16}>
              <Button onClick={handleSubmit(handleSignin)} primary fluid>
                Sign Up
              </Button>
            </GridColumn>
            <span className="mx-auto pb-2">
              Already have an account?{" "}
              <span
                className="c-primary c-pointer"
                onClick={() => history.push("/signin")}
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
