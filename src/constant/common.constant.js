import nagad from "@/assets/nagad.png";
import bkash from "@/assets/bkash.png";

export const mealNameOptions = [
  {
    key: "menu1",
    text: "মেনু-১",
    value: "মেনু-১",
  },
  {
    key: "menu2",
    text: "মেনু-২",
    value: "মেনু-২",
  },
  {
    key: "menu3",
    text: "মেনু-৩",
    value: "মেনু-৩",
  },
  {
    key: "menu4",
    text: "মেনু-৪",
    value: "মেনু-৪",
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
  {
    key: "manager",
    text: "Manager",
    value: "manager",
  },
];
export const hallOptions = [
  {
    key: 1,
    text: "Bijoy 24 Bhaban",
    value: "Bijoy 24 Bhaban",
  },
  {
    key: 2,
    text: "Uttara Bhaban",
    value: "Uttara Bhaban",
  },
  {
    key: 3,
    text: "CM Bhaban",
    value: "CM Bhaban",
  },
  {
    key: 4,
    text: "Shapla Bhaban",
    value: "Shapla Bhaban",
  },
  {
    key: 5,
    text: "Others",
    value: "Others",
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
    text: "সকাল",
    value: "সকাল",
  },
  {
    key: "lunch",
    text: "দুপুর",
    value: "দুপুর",
  },
  {
    key: "dinner",
    text: "রাত",
    value: "রাত",
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
