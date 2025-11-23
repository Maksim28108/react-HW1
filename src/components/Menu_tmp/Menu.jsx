import { useEffect, useMemo, useState } from "react";
import { fetchMeals } from "../../api/meals";
import MealCard from "./MealCard";
import styles from "./menu.module.css";

const CATEGORIES = [
  { label: "Dessert", value: "Dessert" },  
  { label: "Dinner", value: "Dinner" },
  { label: "Breakfast", value: "Breakfast" },
];

export default function MenuPage({ onAddToCart }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(6);
  const [category, setCategory] = useState("Dessert");

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
    return () => { cancelled = true; };
  }, []);

  const filteredMeals = useMemo(
    () =>
      meals.filter(
        (m) => (m.category ?? '').trim().toLowerCase() === category.toLowerCase()
      ),
    [meals, category]
  );

  const canSeeMore = visible < filteredMeals.length;

  function handleAdd(meal, qty) {
    const q = Math.max(1, Number(qty) || 1);
    onAddToCart?.(meal.price, q);
  }

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
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  type="button"
                  className={`${styles.menuTab} ${category === c.value ? styles.menuTabActive : ""}`}
                  onClick={() => {
                    setCategory(c.value);
                    setVisible(6);          
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </section>

          {loading && <p className={styles.menuLoading}>Loading…</p>}
          {error && <p className={styles.menuError}>{error}</p>}

          {!loading && !error && (
            <>
              <div className={styles.menuGrid}>
                {filteredMeals.slice(0, visible).map(m => (
                  <div key={m.id} className={styles.gridItem}>
                    <MealCard meal={m} onAdd={handleAdd} />
                  </div>
                ))}
              </div>

              {filteredMeals.length === 0 ? (
                <p className={styles.menuMore} style={{ color: "#6b7280" }}>
                  no items in this category
                </p>
              ) : canSeeMore ? (
                <div className={styles.menuMore}>
                  <button
                    className={styles.menuMoreBtn}
                    onClick={() => setVisible(v => Math.min(v + 6, filteredMeals.length))}
                  >
                    See more
                  </button>
                </div>
              ) : (
                <p className={styles.menuMore} style={{ color: "#6b7280" }}>
                  no more items
                </p>
              )}
            </>
          )}
        </section>
      </main>
    </section>
  );
}

