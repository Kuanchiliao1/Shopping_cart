import { useEffect, useState } from "react";
import "./assets/index.css";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { CartItem, Product as ProductType } from "./types/index";
import axios from "axios";
import AddForm from "./components/AddForm";
import { z } from 'zod';
import { productItemSchema, cartItemSchema} from './types/zod';

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  async function handleAddProduct(
    product: { name: string; price: number; quantity: number },
    callback?: () => void
  ) {
    try {
      const { name, price, quantity } = product;
      const { data } = await axios.post("/api/products", {
        title: name,
        price,
        quantity,
      });
      productItemSchema.parse(data)

      setProducts((prevProducts) => [...prevProducts, data]);
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function handleEditProduct(id: string, productInfo: {title: string, price: number, quantity: number}) {
    try {
      const { data } = await axios.put(`/api/products/${id}`, productInfo);
      productItemSchema.parse(data)
      
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? data : product
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAddCart(id: string) {
    try {
      const { data } = await axios.post('/api/add-to-cart', {
        productId: id
      })

      setCart(prevCart => {
        const isInCart = cart.map(item => item.productId).includes(id)

        if (isInCart) {
          return prevCart.map(item => {
            return item.productId === id ? data.item : item
          })
        } else {
          return [...prevCart, data.item]
        }
      })
      setProducts(prevProducts => prevProducts.map(product => {
        return product._id === id ? data.product : product
      }))
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCheckout() {
    try {
      await axios.post('/api/checkout')
      setCart([])
    } catch (error) {
      console.error(error);
    }
  }

  function handleShowFormBtn() {
    setShowAddProductForm(true);
  }

  function handleHideFormBtn() {
    setShowAddProductForm(false);
  }

  useEffect(() => {
    // TODO: Add error handling here
    const fetchProductData = async () => {
      const { data } = await axios.get<ProductType[]>("/api/products");
      const productItemsSchema = productItemSchema.array()
      productItemsSchema.parse(data)
      setProducts(data);
    };
    const fetchCartData = async () => {
      const { data } = await axios.get("/api/cart");
      setCart(data);
    };
    try {
      fetchProductData();
      fetchCartData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Cart cartItems={cart} onCheckout={handleCheckout}></Cart>
      <ProductList
        products={products}
        onHandleDeleteProduct={handleDeleteProduct}
        onShowFormBtn={handleShowFormBtn}
        onEditProduct={handleEditProduct}
        onAddCart={handleAddCart}
      ></ProductList>
      {showAddProductForm && <AddForm onHideFormBtn={handleHideFormBtn} onAddProduct={handleAddProduct}></AddForm>}
    </>
  );
}

export default App;
