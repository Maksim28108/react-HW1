import styles from "../mainpage/main.module.css";
import mainpic from "../../assets/images/mainpic.png";
import trustPilotIcon from "../../assets/images/trust.svg";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { selectCartItems } from "../../store/orderSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function MainPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const rating = "4.8";
  const reviews = "2000+";

  const cartItems = useSelector(selectCartItems);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <main className={styles.hero}>
          <section className={styles.left}>
            <h1 className={styles.title}>
              {t("home.titlePrefix")}{" "}
              <span className={styles.accent}>{t("home.titleAccent")}</span>{" "}
              {t("home.titleSuffix")}
            </h1>

            <p className={styles.ptext}>{t("home.text")}</p>

            <Button className={styles.pbutton} onClick={() => navigate("/order")}>
              {t("home.cta")}
            </Button>

            <div className={styles.trust}>
              <img src={trustPilotIcon} className={styles.star} alt="trustpilot" />
              <p className={styles.trustText}>
                <span className={styles.score}>
                  {t("home.trustScore", { rating })}
                </span>{" "}
                {t("home.trustBasedOn", { reviews })}
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
