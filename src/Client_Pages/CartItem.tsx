import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { formatCurrency } from "../hooks/formatCurrency";


type CartItemProps = {
  id: number
  quantity: number
}
interface Product {
  id: any;
  title: any;
  price: any;
  description: any;
  Catego: any;
  image: any;

}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const [prod, setProd] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0)
  const FetchSingleProduct = (id) => {
    axios.get(`http://localhost:5000/todos/${id}`).then((res) => {
      setProd(res.data);

    });
  };
  useEffect(() => {
    FetchSingleProduct(id);
  }, []);
  if (prod == null) { return null }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={prod.image}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {prod.title}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(prod.price)}
        </div>
      </div>
      <div> {formatCurrency(prod.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(prod.id)}
      >
        &times;
      </Button>
    </Stack>
  )
}
