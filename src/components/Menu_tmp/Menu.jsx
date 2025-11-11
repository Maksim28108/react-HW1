import { useEffect, useState } from "react";
import { fetchMeals } from "../../api/meals";
import MealCard from "./MealCard";
import styles from "./menu.module.css";

export default function MenuPage({ onAddToCart }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(6);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchMeals();
        if (!cancelled) setMeals(data);
      } catch (e) {
        if (!cancelled) setError(e.message || "load error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => (cancelled = true);
  }, []);

  function handleAdd(meal, qty) {
    const q = Math.max(1, Number(qty) || 1);
    setTotal(t => t + meal.price * q);
    setCount(c => c + q);
    onAddToCart?.(meal.price, q);
  }

  const canSeeMore = visible < meals.length;

  return (
    <section className={styles.globalSection}>
      <main className={styles.menuWrap}>
        <section className={styles.menuSection}>
          <section className={styles.menuHero}>
            <h1 className={styles.menuTitle}>Browse our menu</h1>
            <p className={styles.menuSubtitle}>
              Use our menu to place an order online, or phone our store to place a pickup order. Fast and fresh food.
            </p>

            <div className={styles.menuTabs}>
              {["Desert", "Dinner", "Breakfast"].map(x => (
                <button key={x} className={styles.menuTab} disabled aria-disabled="true">
                  {x}
                </button>
              ))}
            </div>
          </section>

          {loading && <p className={styles.menuLoading}>Loading…</p>}
          {error && <p className={styles.menuError}>{error}</p>}

          {!loading && !error && (
            <>
              <div className={styles.menuGrid}>
                {meals.slice(0, visible).map(m => (
                  <div key={m.id} className={styles.gridItem}>
                    <MealCard meal={m} onAdd={handleAdd} />
                  </div>
                ))}
              </div>

              {canSeeMore ? (
                <div className={styles.menuMore}>
                  <button className={styles.menuMoreBtn} onClick={() => setVisible(v => Math.min(v + 6, meals.length))}>
                    See more
                  </button>
                </div>
              ) : meals.length > 0 ? (
                <p className={styles.menuMore} style={{ color: "#6b7280" }}>
                  no more items
                </p>
              ) : null}
            </>
          )}
        </section>
      </main>
    </section>
  );
}
