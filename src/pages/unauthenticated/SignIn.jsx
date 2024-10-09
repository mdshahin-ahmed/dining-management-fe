import logo from "@/assets/logo.png";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Image } from "semantic-ui-react";
import { AsForm, AsInput } from "../../components/common/form";
import { signinSchema } from "../../validations/signin/signin.schema";
const SignIn = () => {
  const navigate = useNavigate();
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
            Log-in to your account
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
            <GridColumn width={16}>
              <Button onClick={handleSubmit(handleSignin)} primary fluid>
                Sign In
              </Button>
            </GridColumn>
            <span className="mx-auto pb-2">
              Don&apos;t have an account?{" "}
              <span
                className="c-primary c-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </span>
            </span>
          </AsForm>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default SignIn;
