import React, { createContext, useEffect, useState } from "react";
import { Route } from "react-router-dom";

import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Orders from "./pages/Orders";

export const AppContext = createContext({});

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [cartOpened, setcartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("Favorites")) || []);

        async function getData() {
            try {
                const cartData = await axios.get(
                    "https://63fb3f2c4e024687bf74d004.mockapi.io/Cart"
                );
                const itemsData = await axios.get(
                    "https://63fb3f2c4e024687bf74d004.mockapi.io/Items"
                );

                setCartItems(cartData.data);
                setItems(itemsData.data);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }, [favorites]);

    const handleChangeSearchInput = ({ target }) => {
        setSearchValue(target.value);
    };

    const handleClearSearchInput = () => {
        setSearchValue("");
    };

    const handleAddToFavorites = (obj) => {
        if (favorites.find((item) => item.id === obj.id)) {
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
        } else {
            setFavorites((prev) => [...prev, obj]);
        }
    };

    const handleAddToCart = async (obj) => {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));

        if (findItem) {
            setCartItems((prev) => prev.filter((item) => item.parentId !== obj.id));
            axios.delete(`https://63fb3f2c4e024687bf74d004.mockapi.io/Cart/${findItem.id}`);
        } else {
            const { data } = await axios.post(
                "https://63fb3f2c4e024687bf74d004.mockapi.io/Cart",
                obj
            );
            setCartItems((prev) => [...prev, data]);
        }
    };

    const handleRemoveFromCart = ({ id, _id }) => {
        axios.delete(`https://63fb3f2c4e024687bf74d004.mockapi.io/Cart/${id}`);

        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    };

    const handleAddedToCart = (id) => {
        return cartItems.some((item) => Number(item.parentId) === Number(id));
    };

    const handleAddedToFavorite = (id) => {
        return favorites.some((item) => Number(item.parentId) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                setcartOpened,
                setCartItems,
                handleAddedToCart,
                handleAddToFavorites,
                handleAddedToFavorite,
                handleAddToCart,
            }}
        >
            <div className="wrapper clear">
                <Drawer onItemRemove={(obj) => handleRemoveFromCart(obj)} isOpened={cartOpened} />

                <Header onClickCart={() => setcartOpened(true)} />

                <Route path="" exact>
                    <Home
                        searchValue={searchValue}
                        onChangeSearchInput={handleChangeSearchInput}
                        onClearSearchInput={handleClearSearchInput}
                        isLoading={isLoading}
                    />
                </Route>
                <Route path="favorites" exact>
                    <Favorites />
                </Route>

                <Route path="orders" exact>
                    <Orders />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
