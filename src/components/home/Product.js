import React from "react";
import "./Product.css";
import { useStateValue } from "../../context/StateProvider";
import { ADD_TO_BASKET } from "../../context/actions";

const Product = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();
  console.log("this the basket ", basket);

  const addToBasket = () => {
    dispatch({
      type: ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };
  return (
    <div className="product flex2">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <div key={i}>
                <div className="star"></div>
              </div>
            ))}
        </div>
      </div>
      <img src={image} alt={title} />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
