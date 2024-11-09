import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { hallOptions, RoleOptions } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { updateUserSchema, userSchema } from "../../validations/user.schema";
import { AsForm, AsInput, AsSelect } from "../common/form";
import AsToast from "../common/AsToast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ManageUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      hostel: "",
      room: "",
      role: "",
      userId: "",
    },
    resolver: joiResolver(id ? updateUserSchema : userSchema),
  });

  const { data } = useQuery({
    queryKey: [`${id}`],
    queryFn: () => client(`user/${id}`), // Fetch function
    enabled: Boolean(id), // Run the query only if the token is available
  });
  useEffect(() => {
    if (data) {
      const { name, email, hostel, room, role, userId, mobile } = data;
      reset({
        name,
        email,
        hostel,
        room,
        role,
        userId,
        mobile,
      });
    }
  }, [data]);

  const { mutate: addUserMutate, isPending } = useMutation({
    mutationFn: (data) => client("auth/signup-admin", { data: data }),
    onSuccess: () => {
      navigate("/users");
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>User Registered Successfully!</span>
        </div>
      );
    },
  });
  const { mutate: updateMutateUser, isPending: isUpdatePending } = useMutation({
    mutationFn: (data) => client(`user/${id}`, { data: data, method: "PATCH" }),
    onSuccess: () => {
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>User Updated Successfully!</span>
        </div>
      );
    },
  });

  const handleUserSubmit = (data) => {
    if (id) {
      updateMutateUser(data);
    } else {
      addUserMutate(data);
    }
  };

  return (
    <div className="previewLayout">
      <h2 className="mb-4"> {id ? "Update" : "Create"} User</h2>
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
          disabled={id}
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
        loading={isPending || isUpdatePending}
        onClick={handleSubmit(handleUserSubmit)}
        primary
      >
        {id ? "Update" : "Create"}
      </Button>
    </div>
  );
};

export default ManageUser;
