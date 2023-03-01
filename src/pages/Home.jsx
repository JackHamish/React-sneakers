import React, { useContext } from "react";
import { AppContext } from "../App";
import Card from "../components/Card/Card";

const Home = ({ searchValue, onChangeSearchInput, onClearSearchInput, isLoading }) => {
    const { items } = useContext(AppContext);

    const renderItems = () => {
        const filtredItems = items.filter((sneaker) =>
            sneaker.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (isLoading ? [...Array(8)] : filtredItems).map((sneaker, ind) => (
            <Card key={(sneaker && sneaker.id) || ind} loading={isLoading} {...sneaker} />
        ));
    };

    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Searching: ${searchValue}` : "All sneakers"}</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="Search" />
                    {searchValue && (
                        <img
                            onClick={onClearSearchInput}
                            className=" clear cu-p"
                            src="img/btn-remove.svg"
                            alt="Remove"
                        />
                    )}
                    <input
                        value={searchValue}
                        onChange={onChangeSearchInput}
                        type="text"
                        placeholder="Search...."
                    />
                </div>
            </div>

            <div className="d-flex flex-wrap">{renderItems()}</div>
        </div>
    );
};

export default Home;
