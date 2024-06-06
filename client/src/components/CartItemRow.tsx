interface CartItemRowProps {
  name: string,
  price: number,
  quantity: number,
}

const CartItemRow = ({name, price, quantity}: CartItemRowProps) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{`$${price}`}</td>
    </tr>
  );
}
 
export default CartItemRow;