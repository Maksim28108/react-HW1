import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./order.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import {
  removeFromCart,
  updateQty,
  selectCartItems,
  type CartItem, 
} from "../../store/orderSlice";

export default function OrderPage() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectCartItems);

  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");

  const removeItem = (id: CartItem["id"]) => {
    dispatch(removeFromCart(id));
  };

  const changeQty = (id: CartItem["id"], value: number) => {
    dispatch(updateQty({ id, qty: value }));
  };

  function submit(e: FormEvent<HTMLFormElement>) {
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
                <img
                  className={styles.itemImg}
                  src={i.image ?? ""}
                  alt={i.title}
                />

                <p className={styles.itemTitle}>{i.title}</p>

                <div className={styles.price}>
                  ${Number(i.price || 0).toFixed(2)} USD
                </div>

                <input
                  className={styles.qty}
                  type="number"
                  min={1}
                  value={i.qty}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    changeQty(i.id, Math.max(1, Number(e.target.value) || 1))
                  }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStreet(e.target.value)
              }
              placeholder=""
              labelClass={styles.label}
              inputClass={styles.input}
            />
          </div>

          <div className={styles.field}>
            <Input
              id="house"
              label="House"
              value={house}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHouse(e.target.value)
              }
              placeholder=""
              labelClass={styles.label}
              inputClass={styles.input}
            />
          </div>

          <Button
            type="submit"
            className={styles.orderBtn}
            disabled={items.length === 0}
          >
            Order
          </Button>
        </form>
      </div>
    </section>
  );
}
