import React, { useState, useEffect } from "react";
import Card from "../components/Card/Card";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(JSON.parse(localStorage.getItem("Orders")) || []);
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>My orders</h1>
            </div>

            <div className="d-flex flex-wrap">
                {orders.map((item) => (
                    <Card key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Orders;
