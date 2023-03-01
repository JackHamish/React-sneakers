import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../App";

const Header = ({ onClickCart }) => {
    const { cartItems } = useContext(AppContext);

    const handleTotalSum = (params) => {
        return cartItems.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    };

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center ">
                    <img width={40} height={40} src="img/logo.png" />
                    <div>
                        <h3 className="text-uppercase">React sneakers</h3>
                        <p className="opacity-5">Best sneakers shop</p>
                    </div>
                </div>
            </Link>
            <div>
                <ul className="d-flex ">
                    <li onClick={onClickCart} className="mr-30 cu-p">
                        <img width={18} height={18} src="img/cart.svg" />
                        <span>{handleTotalSum()} USD</span>
                    </li>
                    <li>
                        <Link to="/favorites">
                            <img
                                className=" mr-20 cu-p"
                                width={18}
                                height={18}
                                src="img/heart.svg"
                            />
                        </Link>
                    </li>

                    <li>
                        <Link to="/orders">
                            <img className="cu-p" width={18} height={18} src="img/user.svg" />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
