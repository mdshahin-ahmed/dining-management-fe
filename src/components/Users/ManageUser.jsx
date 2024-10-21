import { useForm } from "react-hook-form";
import { AsForm, AsInput, AsSelect } from "../common/form";
import { RoleOptions } from "../../constant/common.constant";
import { Button } from "semantic-ui-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { userSchema } from "../../validations/user.schema";

const ManageUser = () => {
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
    },
    resolver: joiResolver(userSchema),
  });

  const handleUserSubmit = (data) => {
    console.log(data);
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
        <AsInput
          maxLength={30}
          name="hostel"
          required
          label="Hostel Name"
          placeholder="Enter your hall name"
          computer={8}
        />
        <AsInput
          maxLength={4}
          name="room"
          required
          label="Room Number"
          placeholder="Room number"
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
        // loading={isAddMealPending}
        onClick={handleSubmit(handleUserSubmit)}
        primary
      >
        Create
      </Button>
    </div>
  );
};

export default ManageUser;
