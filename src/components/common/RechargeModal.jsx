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
import { useClient } from "../../hooks/pure/useClient";
import AsToast from "./AsToast";
import { AsForm, AsInput, AsSelect } from "./form";
import { paymentMethod } from "../../constant/common.constant";
import { RechargeBalanceSchema } from "../../validations/user.schema";
import { joiResolver } from "@hookform/resolvers/joi";

const RechargeModal = ({ onClose, open = true }) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: joiResolver(RechargeBalanceSchema),
  });

  let addAmount;

  const amount = watch("amount");
  const type = watch("type");
  if (amount && type) {
    if (type === "nagad") {
      addAmount = amount - (amount / 1000) * 15;
    }
    if (type === "bkash") {
      addAmount = amount - (amount / 1000) * 20;
    }
  }

  // const { mutate, isPending } = useMutation({
  //   mutationFn: (data) => client("user/add-balance", { data, method: "PATCH" }),
  //   onSuccess: () => {
  //     queryClient.refetchQueries({
  //       queryKey: ["user/all-list"],
  //       type: "active",
  //     });
  //     onClose();
  //     AsToast.success(
  //       <div className="errorToast">
  //         <AiOutlineCheckCircle /> &nbsp;
  //         <span>Recharged Successfully!</span>
  //       </div>
  //     );
  //   },
  // });

  const handleAddBalance = (data) => {
    console.log({ ...data, amount: addAmount });

    // mutate({ ...data, id: open });
  };

  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>You want to recharge?</ModalHeader>
      <ModalContent>
        <AsForm control={control} errors={errors} size="large">
          <AsSelect
            name="type"
            required
            label="Payment Method"
            placeholder="Select method"
            options={paymentMethod}
          />
          <AsInput
            name="mobile"
            required
            label="Mobile Number"
            placeholder="Enter Your Mobile Number"
            mobile={16}
            computer={16}
            type="number"
          />
          <AsInput
            name="transactionNumber"
            required
            label="Transaction Number"
            placeholder="Enter Transaction Number"
            mobile={16}
            computer={16}
          />
          <AsInput
            name="amount"
            required
            label="Amount"
            placeholder="Enter Amount"
            mobile={16}
            computer={16}
            type="number"
          />
        </AsForm>
        Amount will be added:{" "}
        <span className="headerBalanceCount"> {addAmount || 0}</span>
      </ModalContent>
      <ModalActions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button
          // loading={isPending}
          onClick={handleSubmit(handleAddBalance)}
          color="primary"
        >
          Recharge
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default RechargeModal;
