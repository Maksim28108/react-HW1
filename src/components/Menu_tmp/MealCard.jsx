import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/orderSlice";
import Button from "../button/Button";
import placeholder from "../../assets/placeholderburger.png";
import styles from "./menu.module.css";

export default function MealCard({ meal }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  function handleQtyChange(e) {
    setQty(Math.max(1, Number(e.target.value) || 1));
  }

  function handleAddClick() {
    dispatch(addToCart({ item: meal, qty }));
  }

  return (
    <article className={styles.mealCard}>
      <img
        className={styles.mealImg}
        src={meal.image || placeholder}
        alt={meal.title}
        onError={(e) => {
          e.currentTarget.src = placeholder;
          e.currentTarget.onerror = null;
        }}
      />

      <div className={styles.mealBody}>
        <h3 className={styles.mealTitle}>{meal.title}</h3>

        <div className={styles.mealActions}>
          <input
            className={styles.mealQty}
            type="number"
            min="1"
            value={qty}
            onChange={handleQtyChange}
          />

          <Button className={styles.mealAddBtn} onClick={handleAddClick}>
            Add to cart
          </Button>
        </div>
      </div>

      <div className={styles.mealRight}>
        <div className={styles.mealPrice}>${meal.price?.toFixed(2)} USD</div>
      </div>
    </article>
  );
}
