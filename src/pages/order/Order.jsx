import { useState } from "react";
import styles from "./order.module.css";
import burgerImg from "../../assets/burgiiir.png"; 
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

const initialItems = [
  { id: 1, title: "Burger Dreams", price: 9.2, qty: 1, image: burgerImg },
  { id: 2, title: "Burger Dreams", price: 9.2, qty: 1, image: burgerImg},
  { id: 3, title: "Burger Dreams", price: 9.2, qty: 1, image: burgerImg },
];

export default function OrderPage() {
  const [items, setItems] = useState(initialItems);
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function changeQty(id, value) {
    const q = Math.max(1, Number(value) || 1);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: q } : i)));
  }

  function submit(e) {
    e.preventDefault();
    console.log({ items, street, house });
    alert("Order placed!");
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Finish your order</h1>

      <div className={styles.wrap}>
        <div className={styles.list}>
          {items.map((i) => (
            <div key={i.id} className={styles.item}>
              <img className={styles.itemImg} src={i.image} alt={i.title} />

              <p className={styles.itemTitle}>{i.title}</p>

              <div className={styles.price}>${i.price.toFixed(2)} USD</div>

              <input
                className={styles.qty}
                type="number"
                min="1"
                value={i.qty}
                onChange={(e) => changeQty(i.id, e.target.value)}
              />

              <button className={styles.removeBtn} onClick={() => removeItem(i.id)}>
                X
              </button>
            </div>
          ))}
        </div>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            <Input
              id="street"
              label="Street"
              value={street}
              placeholder=""
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
              placeholder=""
              onChange={(e) => setHouse(e.target.value)}
              labelClass={styles.label}
              inputClass={styles.input}
            />
          </div>

          <Button type="submit" className={styles.orderBtn}>
            Order
          </Button>
        </form>
      </div>
    </section>
  );
}