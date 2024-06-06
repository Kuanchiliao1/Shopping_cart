import Button from "./Button";
import CartItemRow from "./CartItemRow";
import CartTotalRow from "./CartTotalRow";
import { Product } from "../types/index";

interface CartProps {
  cartItems: Product[];
  onCheckout: () => void;
}

const Cart = ({ cartItems, onCheckout }: CartProps) => {
  console.log("Cart rendered");
  console.log({ cartItems });
  const itemRows = cartItems.map((item) => {
    return (
      <CartItemRow
        name={item.title}
        price={item.price}
        quantity={item.quantity}
      />
    );
  });

  const total = (cartItems.reduce(
    (total, el) => total + el.price * el.quantity,
    0
  )).toFixed(2);

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>{itemRows}</tbody>
          <tfoot>
            <CartTotalRow total={total}></CartTotalRow>
          </tfoot>
        </table>
        <div className="checkout-button">
          <Button text="Checkout" className="checkout" onClick={onCheckout}></Button>
        </div>
      </div>
    </header>
  );
};

export default Cart;
