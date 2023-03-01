import React, { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

import { AppContext } from "../../App";

const Card = ({ id, name, price, imgUrl, loading = false }) => {
    const { handleAddToCart, handleAddedToCart, handleAddedToFavorite, handleAddToFavorites } =
        useContext(AppContext);

    const handleClickFavorite = () => {
        handleAddToFavorites({ name, price, imgUrl, id, parentId: id });
    };

    const handleClickPlus = () => {
        handleAddToCart({ name, price, imgUrl, id, parentId: id });
    };

    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155"></rect>
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15"></rect>
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15"></rect>
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25"></rect>
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32"></rect>
                </ContentLoader>
            ) : (
                <>
                    <div className={styles.favorite} onClick={handleClickFavorite}>
                        <img
                            src={handleAddedToFavorite(id) ? "img/liked.svg" : "img/heart.svg"}
                            alt="Unliked"
                        />
                    </div>
                    <img width="100%" height={135} src={imgUrl} alt="" />
                    <h5>{name}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Price:</span>
                            <b>{price} USD</b>
                        </div>
                        <img
                            className={styles.plus}
                            onClick={handleClickPlus}
                            width={32}
                            height={32}
                            src={
                                handleAddedToCart(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"
                            }
                            alt="add to cart"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
