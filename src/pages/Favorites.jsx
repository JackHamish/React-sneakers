import React, { useContext } from "react";

import { AppContext } from "../App";

import Card from "../components/Card/Card";

const Favorites = () => {
    const { favorites, handleAddToFavorites } = useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Favorites</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favorites.map((item) => (
                    <Card
                        key={item.id}
                        favorited={true}
                        {...item}
                        onClickFavorite={(obj) => handleAddToFavorites(obj)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
