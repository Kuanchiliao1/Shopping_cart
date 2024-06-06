import Product from "./Product";
import { Product as ProductType } from "../types/index";
import Button from "./Button";

const ProductList = ({
  products,
  onShowFormBtn,
  onHandleDeleteProduct,
  onAddCart,
  onEditProduct
}: {
  products: ProductType[];
  onShowFormBtn?: () => void;
  onHandleDeleteProduct: (id: string) => void;
  onAddCart: (id: string) => void;
  onEditProduct: () => void;
}) => {

  const productElements = products.map((product) => (
    <Product
      name={product.title}
      price={product.price}
      quantity={product.quantity}
      id={product._id}
      onHandleDeleteProduct={onHandleDeleteProduct}
      onAddCart={onAddCart}
      onEditProduct={onEditProduct}
    />
  ));

  return (
    <main>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">{productElements}</ul>
      </div>
      <p>
        <Button
          className="add-product-button"
          text="Add A Product"
          onClick={onShowFormBtn}
        ></Button>
      </p>
    </main>
  );
};

export default ProductList;
