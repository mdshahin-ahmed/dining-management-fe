import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { hallOptions, RoleOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { userSchema } from "../../validations/user.schema";
import { AsForm, AsInput, AsSelect } from "../common/form";
import AsToast from "../common/AsToast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";

const ManageUser = () => {
  const { id } = useParams();
  console.log(id);
  const client = useClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      hostel: "",
      room: "",
      password: "",
      role: "",
      userId: "",
    },
    resolver: joiResolver(userSchema),
  });

  const { mutate: addUserMutate, isPending } = useMutation({
    mutationFn: (data) => client("auth/signup-admin", { data: data }),
    onSuccess: () => {
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>User Registered Successfully!</span>
        </div>
      );
    },
  });

  const handleUserSubmit = (data) => {
    addUserMutate(data);
  };

  return (
    <div className="previewLayout">
      <h2 className="mb-4">Create User</h2>
      <AsForm control={control} errors={errors} size="large">
        <AsInput
          maxLength={30}
          name="name"
          required
          label="Name"
          placeholder="Enter your name"
          computer={8}
        />
        <AsInput
          maxLength={100}
          name="email"
          required
          label="Email"
          placeholder="Enter your email"
          computer={8}
        />
        <AsInput
          maxLength={30}
          name="password"
          required
          label="Password"
          placeholder="Enter a password"
          computer={8}
        />
        <AsInput
          name="mobile"
          required
          label="Mobile"
          placeholder="Enter your mobile number"
          computer={8}
        />
        <AsSelect
          name="hostel"
          required
          label="Hostel"
          placeholder="Select Hostel"
          options={hallOptions}
        />
        <AsInput
          maxLength={4}
          name="room"
          required
          label="Room Number"
          placeholder="Room number"
          computer={8}
        />
        <AsInput
          maxLength={4}
          name="userId"
          required
          label="User Id"
          placeholder="Enter User Id"
          computer={8}
        />
        <AsSelect
          name="role"
          required
          label="Role"
          placeholder="Select Role"
          options={RoleOptions}
        />
      </AsForm>
      <Button
        className="mt-5"
        loading={isPending}
        onClick={handleSubmit(handleUserSubmit)}
        primary
      >
        Create
      </Button>
    </div>
  );
};

export default ManageUser;
