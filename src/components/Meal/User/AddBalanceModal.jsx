import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { AsForm, AsInput } from "../../common/form";
import { joiResolver } from "@hookform/resolvers/joi";
import { addBalanceSchema } from "../../../validations/user.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../../../hooks/pure/useClient";
import AsToast from "../../common/AsToast";
import { FiTrash2 } from "react-icons/fi";

const AddBalanceModal = ({ onClose, open = true }) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: joiResolver(addBalanceSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => client("user/add-balance", { data, method: "PATCH" }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["user/all-list"],
        type: "active",
      });
      onClose();
      AsToast.success(
        <div className="errorToast">
          <FiTrash2 /> &nbsp;
          <span>Balance Added Successfully!</span>
        </div>
      );
    },
  });

  const handleAddBalance = (data) => {
    mutate({ ...data, id: open });
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to add balance?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="balance"
            required
            label="Balance"
            placeholder="Enter your balance"
            mobile={16}
            computer={16}
            type="number"
          />
        </AsForm>
      </ModalContent>
      <ModalActions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={isPending}
          onClick={handleSubmit(handleAddBalance)}
          color="primary"
        >
          Add balance
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default AddBalanceModal;
