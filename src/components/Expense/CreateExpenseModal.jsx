import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { AsForm, AsInput, AsTextArea } from "../common/form";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { addExpenseValidationSchema } from "../../validations/expense.schema";

const CreateExpenseModal = ({ onClose, open = true }) => {
  const {
    control,
    formState: { errors },
    // handleSubmit,
  } = useForm({
    defaultValues: {
      amount: "",
      description: "",
    },
    resolver: joiResolver(addExpenseValidationSchema),
  });
  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to create expense?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsInput
            name="amount"
            required
            label="Amount"
            placeholder="Enter total amount"
            mobile={16}
            computer={16}
          />
          <AsTextArea
            maxLength={100}
            name="description"
            required
            label="Description"
            placeholder="Please provide a description"
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
          // loading={isPending}
          // disabled={isPending}
          // onClick={handleSubmit(handleUserSubmit)}
          primary
        >
          Add
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default CreateExpenseModal;
