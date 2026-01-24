import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import Button from "../button/Button";
import placeholder from "../../assets/placeholderburger.png";
import styles from "./menu.module.css";
import { addToCart } from "../../store/orderSlice";

export type Meal = {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  category?: string;
  description?: string;
};

export default function MealCard({ meal }: { meal: Meal }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState<number>(1);

  function handleQtyChange(e: ChangeEvent<HTMLInputElement>) {
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
        <p className={styles.mealDesc}>{meal.description}</p>

        <div className={styles.mealActions}>
          <input
            className={styles.mealQty}
            type="number"
            min={1}
            value={qty}
            onChange={handleQtyChange}
          />

          <Button className={styles.mealAddBtn} onClick={handleAddClick}>
            Add to cart
          </Button>
        </div>
      </div>

      <div className={styles.mealRight}>
        <div className={styles.mealPrice}>
          ${Number(meal.price).toFixed(2)} USD
        </div>
      </div>
    </article>
  );
}
