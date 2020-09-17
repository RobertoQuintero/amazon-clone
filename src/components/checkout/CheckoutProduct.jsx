import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../context/StateProvider";
import { REMOVE_FROM_BASKET } from "../../context/actions";

const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: REMOVE_FROM_BASKET,
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img src={image} alt="" className="checkoutProduct__image" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <div key={i}>
                <div className="star"></div>
              </div>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
