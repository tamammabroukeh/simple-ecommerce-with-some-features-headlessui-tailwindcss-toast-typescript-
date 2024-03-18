import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { Categories, Colors, FormData, ProductData } from "./data/data";
import Modal from "./ui/Modal";
import ButtonCard from "./ui/ButtonCard";
import { v4 as uuid } from "uuid";
import Input from "./ui/Input";
import {
  ICategory,
  IProducts,
  IValidation,
  name,
} from "./interfaces/Interfaces";
import { validationProduct } from "./validation/validation";
import Error from "./ui/Error";
import SpanCircle from "./ui/SpanCircle";
import Select from "./ui/Select";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const defaultProductObj = {
    title: "",
    colors: [],
    description: "",
    imageURL: "",
    price: "",
    category: { imageUrl: "", name: "" },
  };
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProducts>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProducts>(defaultProductObj);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [products, setProducts] = useState<IProducts[]>(ProductData);
  const [allColors, setAllColors] = useState<string[]>([]);
  const [errorColor, setErrorColor] = useState("");
  const [errors, setErrors] = useState<IValidation>({
    description: "",
    imageURL: "",
    price: "",
    title: "",
    colors: [],
  });
  // console.log(colors);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    Categories[0]
  );
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const EditcloseModal = () => setIsOpenEditModal(false);
  const EditopenModal = () => setIsOpenEditModal(true);
  const deleteCloseModal = () => setIsOpenDeleteModal(false);
  const deleteOpenModal = () => setIsOpenDeleteModal(true);
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const changeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const renderProductsCard = () => {
    return products.map((product, index) => (
      <ProductCard
        key={product.id}
        product={product}
        setProductToEdit={setProductToEdit}
        EditopenModal={EditopenModal}
        deleteOpenModal={deleteOpenModal}
        index={index}
        EditProductWithIndex={setProductToEditIndex}
      />
    ));
  };
  // console.log(product);
  const renderFormData = () => {
    return FormData.map((input) => (
      <div className="flex flex-col" key={input.id}>
        <label htmlFor={input.id} className="text-indigo-800 text-md font-bold">
          {input.label}
        </label>
        <Input
          className="border-[2px] rounded-md p-1 shadow-md outline-none border-gray-300
          focus:border-indigo-500 focus:ring-1 text-md focus:ring-indigo-500"
          type={input.type}
          id={input.id}
          value={product[input.name]}
          onChange={changeHandler}
          name={input.name}
        />
        <Error msg={errors[input.name]} />
      </div>
    ));
  };
  const renderColors = () => {
    return Colors.map((color) => (
      <SpanCircle
        key={color}
        color={color}
        onClick={() => {
          if (allColors.includes(color)) {
            setAllColors((prev) => prev.filter((item) => item !== color));
          } else if (productToEdit.colors.includes(color)) {
            setAllColors((prev) => prev.filter((item) => item !== color));
          } else {
            setAllColors((prev) => [...prev, color]);
          }
        }}
      />
    ));
  };
  const onCancel = () => {
    setProduct(defaultProductObj);
    // console.log(product);
    closeModal();
    EditcloseModal();
    deleteCloseModal();
  };
  const SubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { description, imageURL, title, price } = product;
    const errors = validationProduct({
      description,
      imageURL,
      price,
      title,
      colors: allColors,
    });
    // console.log(errors);
    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    // console.log(hasError);
    if (!hasError) {
      setErrors(errors);
      setErrorColor(errors.colors ? errors.colors[0] : "");
      return;
    }
    // console.log("send product to the server");
    setProducts((prev) => [
      { id: uuid(), ...product, colors: allColors, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setAllColors([]);
    closeModal();
    toast("product has been added", {
      style: {
        color: "white",
        backgroundColor: "black",
      },
      icon: "👏",
    });
  };
  const SubmitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { description, imageURL, title, price, colors } = productToEdit;
    // console.log(colors);
    const errors = validationProduct({
      description,
      imageURL,
      price,
      title,
      colors,
    });
    // console.log(errors);
    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    // console.log(hasError);
    if (!hasError) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIndex] = {
      ...productToEdit,
      colors: allColors.concat(productToEdit.colors),
    };
    // console.log(productToEdit);
    // console.log(updatedProducts[productToEditIndex]);
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setAllColors([]);
    EditcloseModal();
    toast("product has been edited", {
      style: {
        color: "white",
        backgroundColor: "black",
      },
      icon: "👏",
    });
  };
  const SubmitDeleteHandler = (): void => {
    const updatedProducts = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    deleteCloseModal();
    toast("product has been deleted", {
      style: {
        color: "white",
        backgroundColor: "black",
      },
      icon: "👏",
    });
  };
  const renderProductWithErrorMsg = (
    id: string,
    label: string,
    name: name,
    type: string
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-indigo-800 text-md font-bold">
          {label}
        </label>
        <Input
          className="border-[2px] rounded-md p-1 shadow-md outline-none border-gray-300
          focus:border-indigo-500 focus:ring-1 text-md focus:ring-indigo-500"
          type={type}
          id={id}
          value={productToEdit[name]}
          onChange={changeEditHandler}
          name={name}
        />
        <Error msg={errors[name]} />
      </div>
    );
  };
  return (
    <main className="container mx-auto">
      <div>
        <ButtonCard onClick={openModal} width="w-fit" classes="bg-indigo-700">
          Add
        </ButtonCard>
      </div>
      <div className="p-2 m-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
        {renderProductsCard()}
      </div>
      {/* Add a new product */}
      <Modal closeModal={closeModal} isOpen={isOpen} title="Add a new product">
        <form className="space-y-3" onSubmit={SubmitHandler}>
          {renderFormData()}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center space-x-1 flex-wrap ">
            {renderColors()}
          </div>
          <div className="flex space-x-1 flex-wrap">
            {allColors.map((color) => (
              <span
                className="px-1 mb-1 rounded-md text-white"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
            {errorColor && <Error msg={errorColor} />}
          </div>
          <div className="flex items-center space-x-3">
            <ButtonCard
              onClick={onCancel}
              width="w-fit"
              classes="bg-gray-400 hover:bg-gray-600"
              type="button"
            >
              Cancel
            </ButtonCard>
            <ButtonCard
              width="w-fit"
              classes="bg-indigo-500 hover:bg-indigo-700"
            >
              Submit
            </ButtonCard>
          </div>
        </form>
      </Modal>
      {/* Edit a product */}
      <Modal
        closeModal={EditcloseModal}
        isOpen={isOpenEditModal}
        title="Edit this product"
      >
        <form className="space-y-3" onSubmit={SubmitEditHandler}>
          {renderProductWithErrorMsg("title", "product title", "title", "text")}
          {renderProductWithErrorMsg(
            "description",
            "product description",
            "description",
            "text"
          )}
          {renderProductWithErrorMsg(
            "imageURL",
            "product image URL",
            "imageURL",
            "text"
          )}
          {renderProductWithErrorMsg("price", "product price", "price", "text")}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex items-center space-x-1 flex-wrap ">
            {renderColors()}
          </div>
          <div className="flex space-x-1 flex-wrap">
            {allColors.concat(productToEdit.colors).map((color) => (
              <span
                className="px-1 mb-1 rounded-md text-white"
                style={{ backgroundColor: color }}
                key={color}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <ButtonCard
              onClick={onCancel}
              width="w-fit"
              classes="bg-gray-400 hover:bg-gray-600"
              type="button"
            >
              Cancel
            </ButtonCard>
            <ButtonCard
              width="w-fit"
              classes="bg-indigo-500 hover:bg-indigo-700"
            >
              Submit
            </ButtonCard>
          </div>
        </form>
      </Modal>
      {/* Delete a product */}
      <Modal
        closeModal={deleteCloseModal}
        isOpen={isOpenDeleteModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <ButtonCard
            onClick={onCancel}
            width="w-fit"
            classes="bg-gray-400 hover:bg-gray-600"
            type="button"
          >
            Cancel
          </ButtonCard>
          <ButtonCard
            width="w-fit"
            // classes="bg-indigo-500 hover:bg-indigo-700"
            classes="bg-[#c2344d] hover:bg-red-800"
            onClick={SubmitDeleteHandler}
          >
            Yes, remove
          </ButtonCard>
          {/* <Button className="bg-[#c2344d] hover:bg-red-800"></Button> */}
        </div>
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
