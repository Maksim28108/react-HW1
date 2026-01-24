import { useDispatch, useSelector } from "react-redux";
import styles from "./header.module.css";
import headerIcon from "../../assets/images/headerimage.svg";
import cartIcon from "../../assets/images/cartsvg1.svg";
import Button from "../button/Button";
import { logoutUser } from "../../store/authSlice";


export function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.logoWrap}>
          <img src={headerIcon} alt="logo" className={styles.logo} />
        </a>


        <div className={styles.navcontainer}>
          <nav className={styles.nav}>
            <a href="/" className={`${styles.link} ${styles.active}`}>
              Home
            </a>
            <a href="/menu" className={styles.link}>
              Menu
            </a>
            <a href="#" className={styles.link}>
              Company
            </a>
            <a href="/login" className={styles.link}>
              Login
            </a>
          </nav>
        </div>

        <div className={styles.cartDiv}>
          <Button className={styles.cartBtn}>
            <img src={cartIcon} alt="cart" className={styles.cartIcon} />
          </Button>

          {user && (
            <Button
              className={styles.logout}
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
