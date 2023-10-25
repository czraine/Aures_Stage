import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { formatCurrency } from "../hooks/formatCurrency";
import { message } from "antd";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [products, setProducts] = useState<any[]>([]);
  const isLoggedIn = !!localStorage.getItem('userData');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [singleU, setSingleU] = useState<any>({});
  const [siad, setsiad] = useState(0);
  useEffect(() => {
    if (isLoggedIn) {
      axios.get(`http://localhost:5000/User/${userData.myid}`).then((res) => {
        setSingleU(res.data);
      });
    }
  }, []);
  useEffect(() => {
    // Fetch product details for all cart items
    const fetchProducts = async () => {
      if (cartItems.length === 0) {
        return;
      }

      const productPromises = cartItems.map((item) =>
        axios.get(`http://localhost:5000/todos/${item.id}`)
      );

      try {
        const productResponses = await Promise.all(productPromises);
        const productData = productResponses.map((response) => response.data);
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const montantTotal = cartItems.reduce((montantTotal, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return montantTotal + (product?.price || 0) * cartItem.quantity;
  }, 0);
  const onSubmitForm = async () => {
    try {
      const clientid = userData.myid;
      const currentDate = new Date();
      const dateOrder = currentDate.toLocaleDateString();
      const adress = singleU.address;
      const state = "en attente";
      const body = { clientid, dateOrder, montantTotal, adress, state };
      const response = await fetch("http://localhost:5000/Command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      message.success("done ");

    } catch (err) {
      console.log("nope something wrong happend");
      console.error(err.message);
    }
  };
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(montantTotal)}
          </div>
          {isLoggedIn ? (
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-primary" onClick={() => {
                message.success("done ");
                onSubmitForm();
              }} >Checkout</button>
            </div>
          ) : (
            <div className="d-flex justify-content-center mt-4">
              <p>Please log in to proceed with checkout.</p>
            </div>
          )}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
