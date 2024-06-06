import { useState } from "react";
import EditForm from "./EditForm";

interface ProductProps {
  name: string;
  price: number;
  quantity: number;
  id: string;
  onHandleDeleteProduct: (id: string) => void;
  onAddCart: (id: string) => void;
  onEditProduct: () => void;
}

const Product = ({
  name,
  price,
  quantity,
  id,
  onHandleDeleteProduct,
  onAddCart,
  onEditProduct,
}: ProductProps) => {
  const [showEditForm, setShowEditForm] = useState(false);

  function handleCancelEdit() {
    setShowEditForm(false);
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{name}</h3>
        <p className="price">{`$${price}`}</p>
        <p className="quantity">{`${quantity} left in stock`}</p>
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            onClick={(e) => {
              e.preventDefault();
              onAddCart(id);
            }}
          >
            Add to Cart
          </button>
          <button className="edit" onClick={() => setShowEditForm(true)}>
            Edit
          </button>
        </div>
        <button
          id={id}
          className="delete-button"
          onClick={(e) => {
            e.preventDefault();
            onHandleDeleteProduct(id);
          }}
        >
          <span>X</span>
        </button>
      </div>
      {showEditForm && (
        <EditForm
          name={name}
          price={price}
          quantity={quantity}
          onCancel={handleCancelEdit}
          onEditProduct={onEditProduct}
          id={id}
        />
      )}
    </li>
  );
};

export default Product;
