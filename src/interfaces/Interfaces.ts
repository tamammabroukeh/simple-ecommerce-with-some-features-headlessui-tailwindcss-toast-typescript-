import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
export interface IImage {
  ImageURL: string;
  altText: string;
  classes: string;
}
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes: string;
  children: ReactNode;
  width: "w-fit" | "w-full";
}
export interface IProducts {
  id?: string | undefined;
  title: string;
  description: string;
  price: string;
  imageURL: string;
  colors: string[];
  category: {
    name: string;
    imageUrl: string;
  };
}
export interface IProduct {
  product: IProducts;
  setProductToEdit: (product: IProducts) => void;
  EditopenModal: () => void;
  deleteOpenModal: () => void;
  EditProductWithIndex: (value: number) => void;
  index: number;
}
export interface IModal {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children: ReactNode;
  description?: string;
}
export type name = "imageURL" | "title" | "price" | "description";
export interface IAddProduct {
  id: string;
  type: string;
  label: string;
  name: name;
}
export interface IInput extends InputHTMLAttributes<HTMLInputElement> {}
export interface IValidation {
  title: string;
  description: string;
  price: string;
  imageURL: string;
  colors?: string[];
}
export interface IError {
  msg: string;
}
export interface IColor extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
}
export interface ISelectorValue {
  selected: { name: string; imageUrl: string };
  setSelected: (category: ICategory) => void;
}
