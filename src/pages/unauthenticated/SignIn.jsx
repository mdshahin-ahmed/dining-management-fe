import logo from "@/assets/logo.png";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Image } from "semantic-ui-react";
import { AsForm, AsInput } from "../../components/common/form";
import { login } from "../../utils/auth/auth-methods";
import { signinSchema } from "../../validations/signin/signin.schema";
import { setToken } from "../../utils/auth/auth-utils";
import { useAuth } from "../../context/app/useAuth";
const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(signinSchema),
  });

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data?.token);
      setUser(data?.isUserExists);
      navigate("/home");
    },
    onError: () => {},
  });

  const handleSignin = (data) => {
    mutateLogin(data);
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
              maxLength={100}
              name="email"
              required
              label="Email"
              placeholder="Enter your email"
            />
            <AsInput
              maxLength={100}
              name="password"
              required
              label="Password"
              placeholder="Enter your password"
            />
            <GridColumn width={16}>
              <Button
                loading={isPending}
                onClick={handleSubmit(handleSignin)}
                primary
                fluid
              >
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
