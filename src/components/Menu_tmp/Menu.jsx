import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMeals } from "../../store/mealsSlice";
import MealCard from "./MealCard";
import Button from "../button/Button";
import styles from "../Menu_tmp/menu.module.css";

export default function MenuPage({ onAddToCart }) {
  const dispatch = useDispatch();
  const { items: meals, status, error } = useSelector((s) => s.meals);

  const [visible, setVisible] = useState(6);
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (status === "idle") dispatch(loadMeals());
  }, [status, dispatch]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(meals.map((m) => m.category).filter(Boolean))
    );
    return unique.map((c) => ({ label: c, value: c }));
  }, [meals]);

  useEffect(() => {
    if (!category && categories.length > 0) {
      setCategory(categories[0].value);
    }
  }, [categories, category]);

  const filteredMeals = useMemo(() => {
    if (!category) return meals;
    return meals.filter((m) => m.category === category);
  }, [meals, category]);

  const canSeeMore = visible < filteredMeals.length;

  function handleAdd(meal, qty) {
    const q = Math.max(1, Number(qty) || 1);

    setTotal((t) => t + meal.price * q);
    setCount((c) => c + q);

    onAddToCart?.(meal.price, q);
  }

  const loading = status === "loading";

  return (
    <section className={styles.globalSection}>
      <main className={styles.menuWrap}>
        <section className={styles.menuSection}>
          <section className={styles.menuHero}>
            <h1 className={styles.menuTitle}>Browse our menu</h1>
            <p className={styles.menuSubtitle}>
              Use our menu to place an order online, or phone our store to
              place a pickup order. Fast and fresh food.
            </p>

            <div className={styles.menuTabs}>
              {categories.map((c) => (
                <Button
                  key={c.value}
                  type="button"
                  className={`${styles.menuTab} ${
                    category === c.value ? styles.menuTabActive : ""
                  }`}
                  onClick={() => {
                    setCategory(c.value);
                    setVisible(6);
                  }}
                >
                  {c.label}
                </Button>
              ))}
            </div>
          </section>

          {loading && <p className={styles.menuLoading}>Loading…</p>}
          {error && <p className={styles.menuError}>{error}</p>}

          {!loading && !error && (
            <>
              <div className={styles.menuGrid}>
                {filteredMeals.slice(0, visible).map((m) => (
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
                  <Button
                    className={styles.menuMoreBtn}
                    onClick={() =>
                      setVisible((v) => Math.min(v + 6, filteredMeals.length))
                    }
                  >
                    See more
                  </Button>
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
