import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";

import {
  loadMeals,
  selectCategories,
  selectMeals,
  selectMealsError,
  selectMealsStatus,
  type Meal,
  type CategoryOption,
} from "../../store/mealsSlice";

import MealCard from "../../components/Menu_tmp/MealCard";
import Button from "../../components/button/Button";
import styles from "./main.module.css";

type Props = {
  onAddToCart?: (price: number, qty: number) => void;
};

export default function MenuPage({ onAddToCart }: Props) {
  const dispatch = useDispatch<AppDispatch>();


  const meals = useSelector(selectMeals);
  const status = useSelector(selectMealsStatus);
  const error = useSelector(selectMealsError);
  const categories = useSelector(selectCategories);

  const [visible, setVisible] = useState(6);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (status === "idle") dispatch(loadMeals());
  }, [status, dispatch]);

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
  const loading = status === "loading";

  function handleAdd(meal: Meal, qty: number) {
    const q = Math.max(1, Number(qty) || 1);
    onAddToCart?.(Number(meal.price || 0), q);
  }

  return (
    <section className={styles.globalSection}>
      <main className={styles.menuWrap}>
        <section className={styles.menuSection}>
          <section className={styles.menuHero}>
            <h1 className={styles.menuTitle}>Browse our menu</h1>

            <div className={styles.menuTabs}>
              {categories.map((c: CategoryOption) => (
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
                  <div key={String(m.id)} className={styles.gridItem}>
                    <MealCard meal={m} />
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
