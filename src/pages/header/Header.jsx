import styles from "./header.module.css";
import headerIcon from '../../assets/images/headerimage.svg'
import cartIcon from '../../assets/images/cartsvg1.svg'



export function Header() {
    return (
    <header className={styles.header}>
        <div className={styles.container}>
            <a href="#" className={styles.logoWrap}>
                <img src={headerIcon} alt="logo" className={styles.logo} />
            </a>
            <div className={styles.navcontainer}>
                <nav className={styles.nav}>
                    <a href="#" className={`${styles.link} ${styles.active}`}>Home</a>
                    <a href="#" className={styles.link}>Menu</a>
                    <a href="#" className={styles.link}>Company</a>
                    <a href="#" className={styles.link}>Login</a>
                </nav>
            </div>
            <div className={styles.cartDiv}>
                <button className={styles.cartBtn}>
                    <img src={cartIcon} alt="cart" className={styles.cartIcon} />
                </button>  
            </div>
        </div>
    </header>
    );
}
