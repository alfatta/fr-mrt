import { atom } from "recoil";

export const photoTakenState = atom({
  key: "photoTakenState",
  default: false,
});


export const photoUrlState = atom({
  key: "photoUrlState",
  default: "",
});


export const photoBase64State = atom({
  key: "photoBase64State",
  default: "",
});

