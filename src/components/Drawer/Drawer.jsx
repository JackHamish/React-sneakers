import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import Info from "../Info";

import styles from "./Drawer.module.scss";

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const Drawer = ({ isOpened, onItemRemove }) => {
    const { cartItems, setcartOpened, setCartItems } = useContext(AppContext);

    const [isOrderCompleted, setIsOrderCompleted] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(JSON.parse(localStorage.getItem("Orders")) || []);
    }, []);

    useEffect(() => {
        localStorage.setItem("Orders", JSON.stringify(orders));
    }, [orders]);

    const handleTotalSum = (params) => {
        return cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    };

    const handleClickOrder = async (params) => {
        try {
            setOrders((prev) => [...prev, ...cartItems]);
            setIsOrderCompleted(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                await axios.delete(
                    "https://63fb3f2c4e024687bf74d004.mockapi.io/Cart/" + cartItems[i].id
                );
                await sleep(1000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${styles.overlay} ${isOpened ? styles.overlayVissible : ""}`}>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Cart{" "}
                    <img
                        onClick={() => setcartOpened(false)}
                        className=" cu-p"
                        src="img/btn-remove.svg"
                        alt="Remove"
                    />
                </h2>

                {cartItems.length ? (
                    <>
                        <div className={styles.items}>
                            {cartItems.map((cartItem) => (
                                <div
                                    className="cartItem d-flex align-center mb-20"
                                    key={cartItem.id}
                                >
                                    <div
                                        style={{ backgroundImage: `url(${cartItem.imgUrl})` }}
                                        className="cartItemImg"
                                    ></div>

                                    <div className="mr-20 flex">
                                        <p className="mb-5">{cartItem.name}</p>
                                        <b>{cartItem.price} USD</b>
                                    </div>
                                    <img
                                        onClick={() => onItemRemove(cartItem)}
                                        className="removeBtn"
                                        src="img/btn-remove.svg"
                                        alt="Remove"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cardTotalBlock">
                            <ul>
                                <li>
                                    <span>Total</span>
                                    <div></div>
                                    <b>{handleTotalSum()} USD</b>
                                </li>
                                <li>
                                    <span>Tax 5%</span>
                                    <div></div>
                                    <b>{handleTotalSum() * 0.05} USD</b>
                                </li>
                            </ul>
                            <button onClick={handleClickOrder} className="greenButton">
                                Сheckout <img src="img/arrow.svg" alt="Arrow" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        image={isOrderCompleted ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
                        title={isOrderCompleted ? "Order is processed" : "Cart is empty"}
                        description={
                            isOrderCompleted
                                ? "Thank you! Your order will be transferred to the delivery service"
                                : "Add some items to cart"
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;
