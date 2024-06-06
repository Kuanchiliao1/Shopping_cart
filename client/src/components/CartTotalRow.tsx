const CartTotal = ({total}: {total: string}) => {
  return (<tr>
    <td colSpan={3} className="total">Total: ${total}</td>
  </tr>);
}
 
export default CartTotal;