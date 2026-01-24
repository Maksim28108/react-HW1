import styles from "./header.module.css";
import headerIcon from '../../assets/logoimage.svg'
import cartIcon from '../../assets/cartimage.svg'
import littlecart from '../../assets/littlecart.svg'
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { selectCartCount, selectCartTotal } from "../../store/orderSlice";
import { NavLink } from "react-router-dom";



export default function Header() {
    const count = useSelector(selectCartCount);
    const total = useSelector(selectCartTotal);
    return (
    <header className={styles.header}>

        <div className={styles.container}>
            <a href="#" className={styles.logoWrap}>
                <img src={headerIcon} alt="logo" className={styles.logo} />
            </a>
            <div className={styles.navcontainer}>
                <nav className={styles.nav}>
                    <NavLink to="/login" className={styles.link}>Login</NavLink>
                    <NavLink to="/" className={styles.link}>Home</NavLink>
                    <NavLink to="/menu" className={styles.link}>Menu</NavLink>
                    <NavLink to="/company" className={styles.link}>Company</NavLink>
                </nav>
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
