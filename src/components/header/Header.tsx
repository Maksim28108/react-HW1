import styles from "./header.module.css";
import headerIcon from "../../assets/logoimage.svg";
import cartIcon from "../../assets/cartimage.svg";
import littlecart from "../../assets/littlecart.svg";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { selectCartCount, selectCartTotal } from "../../store/orderSlice";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import {LanguageDropdown} from "../languagedropdown/LanguageDropdown";

export default function Header() {
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const { resolved, toggle } = useTheme();
  const { t } = useTranslation("common");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoWrap}>
          <img src={headerIcon} alt="logo" className={styles.logo} />
        </Link>

        <div className={styles.navcontainer}>
          <nav className={styles.nav}>
            <NavLink to="/login" className={styles.link}>
              {t("header.login")}
            </NavLink>
            <NavLink to="/" className={styles.link}>
              {t("header.home")}
            </NavLink>
            <NavLink to="/menu" className={styles.link}>
              {t("header.menu")}
            </NavLink>
            <NavLink to="/company" className={styles.link}>
              {t("header.company")}
            </NavLink>
          </nav>
        </div>

        <div className={styles.controls}>
          <LanguageDropdown />

          <Button
            type="button"
            onClick={toggle}
            aria-label={t("header.themeAria", { theme: resolved })}
            className={styles.themeBtn}
          >
            {resolved === "dark" ? "🌙" : "☀️"}
          </Button>
        </div>

        <div className={styles.cartDiv}>
          <Button className={styles.cartBtn}>
            <img src={cartIcon} alt="cart" className={styles.cartIcon} />
            <img src={littlecart} alt="little icon" className={styles.littlecart} />
            <span className={styles.badge}>{count}</span>
          </Button>
          <div className={styles.cartTotal}>${total.toFixed(2)}</div>
        </div>
      </div>
    </header>
  );
}
