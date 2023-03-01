import React, { useContext } from "react";
import { AppContext } from "../App";

const Info = ({ image, title, description }) => {
    const { setcartOpened } = useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120} src={image} alt="empt" />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setcartOpened(false)} className="greenButton">
                <img src="img/arrow.svg" alt="" />
                Go back
            </button>
        </div>
    );
};

export default Info;
