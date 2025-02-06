import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; // Redux 액션 불러오기
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();

    // ✅ Redux 상태에서 장바구니 상품 개수 가져오기
    const cartItemsCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));
    const [addedToCart, setAddedToCart] = useState({});

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                }
            ]
        }
    ];

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    // ✅ Redux `addItem` 디스패치
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); 
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true, // 해당 상품이 추가되었음을 표시
        }));
    };

    return (
        <div>
            {/* 네비게이션 바 */}
            <div className="navbar">
                <h3>Paradise Nursery</h3>
                <button onClick={handleCartClick}>Cart ({cartItemsCount})</button>
            </div>

            {/* 장바구니 or 상품 목록 페이지 */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <p>{plant.description}</p>
                                        <p>{plant.cost}</p>
                                        <button  
                                            className="product-button" 
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
