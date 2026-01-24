import { useState } from "react";
import styles from "./order.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQty,
  selectCartItems,
} from "../../store/orderSlice";

export default function OrderPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const changeQty = (id, value) => {
    dispatch(updateQty({ id, qty: value }));
  };

  function submit(e) {
    e.preventDefault();

    if (items.length === 0) return;

    console.log({ items, street, house });
    alert("Order placed!");
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Finish your order</h1>

      <div className={styles.wrap}>
        {items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty. Add items from Menu.</p>
        ) : (
          <div className={styles.list}>
            {items.map((i) => (
              <div key={i.id} className={styles.item}>
                <img className={styles.itemImg} src={i.image} alt={i.title} />

                <p className={styles.itemTitle}>{i.title}</p>

                <div className={styles.price}>
                  ${Number(i.price || 0).toFixed(2)} USD
                </div>

                <input
                  className={styles.qty}
                  type="number"
                  min="1"
                  value={i.qty}
                  onChange={(e) => changeQty(i.id, e.target.value)}
                />

                <Button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeItem(i.id)}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        )}

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            <Input
              id="street"
              label="Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              labelClass={styles.label}
              inputClass={styles.input}
            />
          </div>

          <div className={styles.field}>
            <Input
              id="house"
              label="House"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              labelClass={styles.label}
              inputClass={styles.input}
            />
          </div>

          <Button type="submit" className={styles.orderBtn} disabled={items.length === 0}>
            Order
          </Button>
        </form>
      </div>
    </section>
  );
}
