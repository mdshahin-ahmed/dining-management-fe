import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { useClient } from "../../../hooks/pure/useClient";
import UserMealCard from "./UserMealCard";
import NoDataAvailable from "../../common/NoDataAvailable";
import DeleteModal from "../../common/DeleteModal";
import { useDisclosure } from "../../../hooks/pure/useDisclosure";
import AsToast from "../../common/AsToast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useAuth } from "../../../context/app/useAuth";

const OrderUIdModal = ({ onClose, open = true }) => {
  return (
    <Modal
      closeIcon
      size="tiny"
      centered={false}
      open={Boolean(open)}
      onClose={onClose}
    >
      <ModalHeader>Your order placed successfully!</ModalHeader>
      <ModalContent className="d-flex">
        <span className="mr-1 asc">Your order id is</span>{" "}
        <span className="orderUid">{open || ""}</span>
      </ModalContent>
      <ModalActions>
        <Button color={confirm ? "primary" : "red"} onClick={onClose}>
          Okay
        </Button>
      </ModalActions>
    </Modal>
  );
};

const UserMeal = () => {
  const [mealType, setMealType] = useState("");
  const { setUser } = useAuth();
  const { isOpen, onClose, setCustom } = useDisclosure();
  const {
    isOpen: isOrderOpen,
    onClose: onOrderClose,
    setCustom: setOrderCustom,
  } = useDisclosure();

  const client = useClient();
  const { data: mealList, isFetching } = useQuery({
    queryKey: [`${mealType}-list`],
    queryFn: () => client(`meal?type=${mealType}`),
    enabled: !!mealType,
  });

  const { mutate: addOrderMutate, isPending } = useMutation({
    mutationFn: (id) => client(`order?id=${id}`, { method: "POST" }),
    onSuccess: (res) => {
      console.log(res);
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Order created successfully!</span>
        </div>
      );
      onClose();
      setOrderCustom(res?.uId);
      setUser((prev) => ({ ...prev, balance: prev.balance - res?.price }));
    },
  });

  const handlePurchase = (id) => {
    addOrderMutate(id);
  };

  return (
    <div className="previewLayout">
      <OrderUIdModal onClose={onOrderClose} open={isOrderOpen} />
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
      <div className="d-flex jcc mb-5">
        <Button
          primary={mealType === "breakfast"}
          onClick={() => setMealType("breakfast")}
        >
          Breakfast
        </Button>
        <Button
          primary={mealType === "lunch"}
          onClick={() => setMealType("lunch")}
          className="mx-3"
        >
          Lunch
        </Button>
        <Button
          primary={mealType === "dinner"}
          onClick={() => setMealType("dinner")}
        >
          Dinner
        </Button>
      </div>
      {mealType ? (
        mealList?.length > 0 && <h2 className="tac">Choose your {mealType}</h2>
      ) : (
        <h2 className="tac">Please Choose Meal</h2>
      )}
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
