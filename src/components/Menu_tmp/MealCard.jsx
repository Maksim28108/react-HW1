import { useState } from "react";
import styles from "./menu.module.css";
import placeholder from "../../assets/placeholderburger.png";
import Button from "../button/Button";

export default function MealCard({ meal, onAdd }) {
  const [qty, setQty] = useState(1);
  return (
    <article className={styles.mealCard}>
      <img
        className={styles.mealImg}
        src={meal.image || placeholder}
        alt={meal.title}
        onError={(e) => { e.currentTarget.src = placeholder; e.currentTarget.onerror = null; }}
      />

      <div className={styles.mealBody}>
        <h3 className={styles.mealTitle}>{meal.title}</h3>
        <p className={styles.mealDesc}>
          {meal.description}
        </p>

        <div className={styles.mealActions}>
          <input
            className={styles.mealQty}
            type="number"
            min="1"
            value={qty}
            onChange={(e) =>
              setQty(Math.max(1, Number(e.target.value) || 1))
            }
          />
          <Button
            className = {styles.mealAddBtn}
            onClick = {() => onAdd(meal, qty)}
          >
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
