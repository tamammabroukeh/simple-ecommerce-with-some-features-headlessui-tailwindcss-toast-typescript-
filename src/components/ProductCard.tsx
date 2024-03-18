  import { IProduct } from "../interfaces/Interfaces";
import { numberWithCommas, textSlicer } from "../utils/functions";
import ButtonCard from "../ui/ButtonCard";
import Image from "../ui/Image";
import SpanCircle from "../ui/SpanCircle";
const ProductCard = ({
  product,
  setProductToEdit,
  EditopenModal,
  EditProductWithIndex,
  deleteOpenModal,
  index,
}: IProduct) => {
  const { title, category, colors, description, price, imageURL } = product;
  // console.log(colors);
  const onEdit = () => {
    setProductToEdit(product);
    EditopenModal();
    EditProductWithIndex(index);
  };
  const onRemove = () => {
    setProductToEdit(product);
    deleteOpenModal();
  };
  const renderProductColors = () => {
    return colors.map((color) => <SpanCircle key={color} color={color} />);
  };
  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border-2 border-gray-300 p-2 m-2 flex flex-col">
      <Image
        ImageURL={imageURL}
        classes="rounded-md w-full h-full"
        altText={title}
      />
      <h3 className="mt-2  font-mono text-sm font-bold">{title}</h3>
      <p className="my-2">{textSlicer(description)}</p>
      <div className="flex flex-wrap space-x-2 my-3">
        {/* {colors.map((color) => (
          <SpanCircle key={color} color={color} />
        ))} */}
        {!colors.length ? (
          <p className="min-h-[20px]">Not available colors!</p>
        ) : (
          renderProductColors()
        )}
      </div>
      <div className="flex my-2 items-center justify-between">
        <span>${numberWithCommas(price)}</span>
        <div className="flex my-2 items-center justify-between">
          <span className="mx-2 ">{category.name}</span>
          <Image
            ImageURL={category.imageUrl}
            classes="w-10 h-10 rounded-full object-center"
            altText={category.name}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-evenly my-2">
        <ButtonCard width="w-fit" classes="bg-indigo-700" onClick={onEdit}>
          Edit
        </ButtonCard>
        <ButtonCard width="w-full" classes="bg-red-700" onClick={onRemove}>
          Remove
        </ButtonCard>
      </div>
    </div>
  );
};

export default ProductCard;
