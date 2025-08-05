import nagad from "@/assets/nagad.png";
import bkash from "@/assets/bkash.png";

export const mealNameOptions = [
  {
    key: "menu1",
    text: "Menu 1",
    value: "menu-1",
  },
  {
    key: "menu2",
    text: "Menu 2",
    value: "menu-2",
  },
  {
    key: "menu3",
    text: "Menu 3",
    value: "menu-3",
  },
  {
    key: "menu4",
    text: "Menu 4",
    value: "menu-4",
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
  {
    key: "canceled",
    text: "Canceled",
    value: "canceled",
  },
];
export const cancelRequestStatus = [
  {
    key: "approved",
    text: "Approved",
    value: "approved",
  },
  {
    key: "pending",
    text: "Pending",
    value: "pending",
  },
  {
    key: "canceled",
    text: "Canceled",
    value: "canceled",
  },
];
export const withdrawRequestStatus = [
  {
    key: "approved",
    text: "Approved",
    value: "approved",
  },
  {
    key: "canceled",
    text: "Canceled",
    value: "canceled",
  },
];

export const managerOrderStatus = [
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

export const orderTypeOptions = [
  {
    key: "breakfast",
    text: "Breakfast",
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
