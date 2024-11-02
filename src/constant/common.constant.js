import nagad from "@/assets/nagad.png";
import bkash from "@/assets/bkash.png";

export const mealTypeOptions = [
  {
    key: "breakfast",
    text: "Break Fast",
    value: "breakfast",
  },
  {
    key: "lunch",
    text: "Lunch",
    value: "lunch",
  },
  {
    key: "dinner",
    text: "Dinner",
    value: "dinner",
  },
];

export const RoleOptions = [
  {
    key: "user",
    text: "User",
    value: "user",
  },
  {
    key: "admin",
    text: "Admin",
    value: "admin",
  },
];

export const adminOrderStatus = [
  {
    key: "delivered",
    text: "Delivered",
    value: "delivered",
  },
  {
    key: "pending",
    text: "Pending",
    value: "pending",
  },
];

export const userOrderStatus = [
  // {
  //   key: "canceled",
  //   text: "Cancel",
  //   value: "canceled",
  // },
];

export const orderTypeOptions = [
  {
    key: "breakfast",
    text: "Break Fast",
    value: "breakfast",
  },
  {
    key: "lunch",
    text: "Lunch",
    value: "lunch",
  },
  {
    key: "dinner",
    text: "Dinner",
    value: "dinner",
  },
];

export const paymentMethod = [
  {
    key: "nagad",
    text: "Nagad",
    value: "nagad",
    image: { avatar: true, src: nagad },
  },
  {
    key: "bkash",
    text: "B-Kash",
    value: "bkash",
    image: { avatar: true, src: bkash },
  },
];
