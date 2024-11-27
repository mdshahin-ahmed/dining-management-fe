import { useForm } from "react-hook-form";
import { AsForm, AsSelect, AsTextArea } from "../common/form";
import { Button } from "semantic-ui-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { cancelReqVSchema } from "../../validations/cancelReq.schema";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useClient } from "../../hooks/pure/useClient";
import { useNavigate } from "react-router-dom";
import AsToast from "../common/AsToast";
import {
  mealNameOptions,
  orderTypeOptions,
} from "../../constant/common.constant";

const AddCancelReq = () => {
  const client = useClient();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      mealName: "",
      mealType: "",
      reason: "",
    },
    resolver: joiResolver(cancelReqVSchema),
  });

  const { mutate: addUserMutate, isPending } = useMutation({
    mutationFn: (data) => client("cancel", { data: data }),
    onSuccess: () => {
      navigate("/cancel-req");
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Cancel Request Added Successfully!</span>
        </div>
      );
    },
  });

  const handleUserSubmit = (data) => {
    addUserMutate(data);
  };
  return (
    <div className="previewLayout">
      <AsForm control={control} errors={errors} size="large">
        <AsSelect
          name="mealType"
          required
          label="Meal Type"
          placeholder="Select Meal Type"
          options={orderTypeOptions || []}
        />
        <AsSelect
          name="mealName"
          required
          label="Meal Name"
          placeholder="Select Meal Name"
          options={mealNameOptions || []}
        />
        <AsTextArea
          maxLength={100}
          name="reason"
          required
          label="Cancel Reason"
          placeholder="Please provide a valid reason"
        />
      </AsForm>
      <Button
        className="mt-5"
        loading={isPending}
        onClick={handleSubmit(handleUserSubmit)}
        primary
      >
        Submit
      </Button>
    </div>
  );
};

export default AddCancelReq;
