import React, { useState } from "react";

interface AddFormProps {
  onAddProduct: (
    product: { name: string; price: number; quantity: number },
    callback?: () => void
  ) => void;
  onHideFormBtn: () => void;
}

const AddForm = ({ onAddProduct, onHideFormBtn }: AddFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  const set = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [key]: e.target.value });
    };
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      price: 0,
      quantity: 0,
    });
  };

  return (
    <div className="add-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddProduct(formData, resetFormData);
        }}
      >
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            value={formData.name}
            onChange={set("name")}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={set("price")}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            value={formData.quantity}
            onChange={set("quantity")}
            required
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button onClick={onHideFormBtn} type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
