import { useState } from "react"
import { z } from "zod"

interface EditFormProps {
  name: string
  price: number
  quantity: number
  id: string
  onCancel: () => void
  onEditProduct: (id: string, productInfo: onEditProduct) => void
}

const onEditProductSchema = z.object({
  title: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive()
})

type onEditProduct = z.infer<typeof onEditProductSchema>

const EditForm = ({name, price, quantity, onCancel, onEditProduct, id}: EditFormProps) => {
  const [formData, setFormData] = useState({
    name,
    price,
    quantity
  })

  const set = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData, [key]: e.target.value
      })
    }
  }

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        try {
          const productInfo = {title: formData.name, price: +formData.price, quantity: +formData.quantity}
          onEditProductSchema.parse(productInfo)
          onEditProduct(id, productInfo)
        } catch (error) {
          console.log({error})
        }
      }}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={formData.name}
            onChange={set('name')}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={formData.price}
            onChange={set('price')}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={formData.quantity}
            onChange={set('quantity')}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
