import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import styles from "./header.module.css";
import headerIcon from "../../assets/images/headerimage.svg";
import cartIcon from "../../assets/images/cartsvg1.svg";
import Button from "../../components/button/Button";
import { logoutUser } from "../../store/authSlice";
import { Link, NavLink } from "react-router-dom";

export function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoWrap}>
          <img src={headerIcon} alt="logo" className={styles.logo} />
        </Link>

        <div className={styles.navcontainer}>
          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              Menu
            </NavLink>

            <a href="#" className={styles.link}>
              Company
            </a>

            {!user && (
              <NavLink to="/login" className={styles.link}>
                Login
              </NavLink>
            )}
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
