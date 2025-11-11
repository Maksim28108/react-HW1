import styles from "./menu.module.css";
import placeholder from "../../assets/placeholderburger.png";

export default function MealCard({ meal, onAdd }) {
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
            defaultValue="1"
            onChange={(e) => (meal.__qty = Math.max(1, Number(e.target.value) || 1))}
          />
          <button className={styles.mealAddBtn} onClick={() => onAdd(meal, meal.__qty ?? 1)}>
            Add to card
          </button>
        </div>
      </div>

      <div className={styles.mealRight}>
        <div className={styles.mealPrice}>${meal.price?.toFixed(2)} USD</div>
      </div>
    </article>
  );
}
