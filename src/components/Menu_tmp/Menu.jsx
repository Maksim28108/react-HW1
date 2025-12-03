import { useEffect, useState } from "react";
import { fetchMeals } from "../../api/meals";
import MealCard from "./MealCard";
import styles from "./menu.module.css";
import Button from "../button/Button";

export default function MenuPage({ onAddToCart }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(6);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    
    (async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchMeals(controller.signal);
        setMeals(data);

      } catch (e) {
        if (
          e.name === "AbortError" ||
          e.message === "signal is aborted without a reason"
        ){
          return
        }

        setError(e.message || "load error");
      } finally {
        setLoading(false);
      }
    })();


    return () => {
      controller.abort()
    };
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
                  <Button
                    className={styles.menuMoreBtn}
                    onClick={() => setVisible((v) => Math.min(v + 6, meals.length))}
                  >
                    See more
                  </Button>
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
