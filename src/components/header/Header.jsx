import styles from "./header.module.css";
import headerIcon from '../../assets/logoimage.svg'
import cartIcon from '../../assets/cartimage.svg'
import littlecart from '../../assets/littlecart.svg'



export default function Header({ count = 0, total = 0 }) {
    return (
    <header className={styles.header}>
        <div className={styles.container}>
            <a href="#" className={styles.logoWrap}>
                <img src={headerIcon} alt="logo" className={styles.logo} />
            </a>
            <div className={styles.navcontainer}>
                <nav className={styles.nav}>
                    <a href="#" className={styles.link} tabIndex={0}>Login</a>
                    <a href="#" className={styles.link} tabIndex={0}>Home</a>
                    <a href="#" className={`${styles.link} ${styles.active}`} tabIndex={0}>Menu</a>
                    <a href="#" className={styles.link} tabIndex={0}>Company</a>
                </nav>
            </div>
            <div className={styles.cartDiv}>
                <button className={styles.cartBtn}>
                    <img src={cartIcon} alt="cart" className={styles.cartIcon} />
                    <img src={littlecart} alt="little icon" className={styles.littlecart} />
                    <span className={styles.badge}>{count}</span> 
                </button>
                <div className={styles.cartTotal}>${total.toFixed(2)}</div>
            </div>
        </div>
    </header>
    );
}
