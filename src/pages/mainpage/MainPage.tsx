import styles from "../mainpage/main.module.css";
import mainpic from "../../assets/images/mainpic.png";
import trustPilotIcon from "../../assets/images/trust.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { selectCartItems, type CartItem } from "../../store/orderSlice";

export function MainPage() {
  const navigate = useNavigate();

  const rating = "4.8";
  const reviews = "2000+";

  const cartItems = useSelector<RootState, CartItem[]>(selectCartItems);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <main className={styles.hero}>
          <section className={styles.left}>
            <h1 className={styles.title}>
              Beautiful food & takeaway,{" "}
              <span className={styles.accent}>delivered</span> to your door.
            </h1>

            <p className={styles.ptext}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>

            <Button className={styles.pbutton} onClick={() => navigate("/order")}>
              Place an Order
            </Button>

            <div className={styles.trust}>
              <img
                src={trustPilotIcon}
                className={styles.star}
                alt="trustpilot"
              />
              <p className={styles.trustText}>
                <span className={styles.score}>{rating} out of 5</span> based on{" "}
                {reviews} reviews
              </p>
            </div>
          </section>

          <aside className={styles.right}>
            <img className={styles.heroImg} src={mainpic} alt="hero" />
          </aside>
        </main>
      </div>
    </div>
  );
}
