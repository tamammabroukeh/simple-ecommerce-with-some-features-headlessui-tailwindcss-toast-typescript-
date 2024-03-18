import { IValidation } from "../interfaces/Interfaces";
/**
 *
 * @param {Object} obj // object we want check it
 * @returns obj contain all errors
 */
export const validationProduct = ({
  description,
  imageURL,
  price,
  title,
}: IValidation) => {
  const errors: IValidation = {
    description: "",
    imageURL: "",
    price: "",
    title: "",
  };
  const validateUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(imageURL);
  if (!title.trim() || title.length < 10 || title.length > 80) {
    errors.title = "Title must be between 10 and 80 character";
  }
  if (
    !description.trim() ||
    description.length < 50 ||
    description.length > 500
  ) {
    errors.description = "Description must be between 50 and 500 character";
  }
  if (!price.trim() || isNaN(Number(price))) {
    errors.price = "Price is required";
  }
  if (!imageURL.trim() || !validateUrl) {
    errors.imageURL = "Image is required";
  }
  return errors;
};
