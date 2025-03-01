import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Button } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";
import { useClient } from "../../../hooks/pure/useClient";
import { useDisclosure } from "../../../hooks/pure/useDisclosure";
import AsToast from "../../common/AsToast";
import DeleteModal from "../../common/DeleteModal";
import NoDataAvailable from "../../common/NoDataAvailable";
import UserMealCard from "./UserMealCard";

// const OrderUIdModal = ({ onClose, open = true }) => {
//   return (
//     <Modal
//       closeIcon
//       size="tiny"
//       centered={false}
//       open={Boolean(open)}
//       onClose={onClose}
//     >
//       <ModalHeader>Your order placed successfully!</ModalHeader>
//       <ModalContent className="d-flex">
//         <span className="mr-1 asc">Your order id is</span>{" "}
//         <span className="orderUid">{open || ""}</span>
//       </ModalContent>
//       <ModalActions>
//         <Button color={confirm ? "primary" : "red"} onClick={onClose}>
//           Okay
//         </Button>
//       </ModalActions>
//     </Modal>
//   );
// };

const UserMeal = () => {
  const [mealType, setMealType] = useState("");
  const { setUser } = useAuth();
  const { isOpen, onClose, setCustom } = useDisclosure();
  // const {
  //   isOpen: isOrderOpen,
  //   onClose: onOrderClose,
  //   setCustom: setOrderCustom,
  // } = useDisclosure();

  const client = useClient();
  const queryClient = useQueryClient();
  const { data: mealList, isFetching } = useQuery({
    queryKey: [`${mealType}-list`],
    queryFn: () => client(`meal/user-meal?type=${mealType}`),
    enabled: !!mealType,
  });

  const { mutate: addOrderMutate, isPending } = useMutation({
    mutationFn: (id) => client(`order?id=${id}`, { method: "POST" }),
    onSuccess: (res) => {
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Order created successfully!</span>
        </div>
      );
      onClose();
      queryClient.refetchQueries({
        queryKey: [`${mealType}-list`],
        type: "active",
      });
      setUser((prev) => ({ ...prev, balance: prev.balance - res?.price }));
    },
  });

  const handlePurchase = (id) => {
    addOrderMutate(id);
  };

  return (
    <div className="previewLayout">
      {/* <OrderUIdModal onClose={onOrderClose} open={isOrderOpen} /> */}
      <DeleteModal
        isLoading={isPending}
        modalHeader="Purchase"
        confirmText="Purchase"
        modalContent="Are you sure you want to Purchase?"
        confirm
        onClose={onClose}
        open={isOpen}
        onConfirm={() => handlePurchase(isOpen)}
      />

      {mealType ? "" : <h2 className="tac">মেনু পছন্দ করুন</h2>}
      <div className="d-flex jcc mb-5">
        <Button
          primary={mealType === "সকাল"}
          onClick={() => setMealType("সকাল")}
          fluid
        >
          সেহরি
        </Button>
        <Button
          primary={mealType === "দুপুর"}
          onClick={() => setMealType("দুপুর")}
          className="mx-3"
          fluid
        >
          ইফতার
        </Button>
        <Button
          primary={mealType === "রাত"}
          onClick={() => setMealType("রাত")}
          fluid
        >
          রাত
        </Button>
      </div>
      {mealList?.length === 0 && !isFetching && mealType ? (
        <NoDataAvailable />
      ) : (
        <UserMealCard
          mealList={mealList}
          isFetching={isFetching}
          setCustom={setCustom}
        />
      )}
    </div>
  );
};

export default UserMeal;
