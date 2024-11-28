import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import {
  mealNameOptions,
  orderTypeOptions,
} from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { cancelReqVSchema } from "../../validations/cancelReq.schema";
import AsToast from "../common/AsToast";
import { AsForm, AsSelect, AsTextArea } from "../common/form";

const CreateCancelReqModal = ({ onClose, open = true }) => {
  const client = useClient();
  const queryClient = useQueryClient();
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
      onClose();
      queryClient.refetchQueries({
        queryKey: ["cancel-list"],
        type: "active",
      });
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
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to create cancel request?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsSelect
            name="mealType"
            required
            label="Meal Type"
            placeholder="Select Meal Type"
            options={orderTypeOptions || []}
            mobile={16}
            computer={16}
          />
          <AsSelect
            name="mealName"
            required
            label="Meal Name"
            placeholder="Select Meal Name"
            options={mealNameOptions || []}
            mobile={16}
            computer={16}
          />
          <AsTextArea
            maxLength={100}
            name="reason"
            required
            label="Cancel Reason"
            placeholder="Please provide a valid reason"
            mobile={16}
            computer={16}
          />
        </AsForm>
      </ModalContent>
      <ModalActions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="mt-5"
          loading={isPending}
          onClick={handleSubmit(handleUserSubmit)}
          primary
        >
          Submit
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default CreateCancelReqModal;
