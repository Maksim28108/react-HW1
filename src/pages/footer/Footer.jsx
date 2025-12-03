import styles from './footer.module.css';
import headerIcon from '../../assets/images/headerimage.svg'
import instagramIcon from '../../assets/images/instagram.svg'
import twitterIcon from '../../assets/images/twitter.svg'
import youtubeIcon from '../../assets/images/youtube.svg'

export function Footer() {
    return (
    <footer className={styles.footer}>
        <div className={styles.top}>
            <div className={styles.left}>
                <img src={headerIcon} alt="logo" className={styles.logo} />
                <p className={styles.description}>
                    Takeaway & Delivery template<br />
                    for small - medium businesses.
                </p>
            </div>

            <div className={styles.columns}>
                <div className={styles.column}>
                    <h4>Company</h4>
                    <a href="#">Home</a>
                    <a href="#">Order</a>
                    <a href="#">FAQ</a>
                    <a href="#">Contact</a>
                </div>

                <div className={styles.column}>
                    <h4>Template</h4>
                    <a href="#">Style Guide</a>
                    <a href="#">Changelog</a>
                    <a href="#">Licence</a>
                    <a href="#">Webflow University</a>
                </div>

                <div className={styles.column}>
                    <h4>Flowbase</h4>
                    <a href="#">More Cloneables</a>
                </div>
            </div>
        </div>

        <hr className={styles.line} />

        <div className={styles.bottom}>
            <p className={styles.copy}>
            Built by <a href="#">Flowbase</a>. Powered by <a href="#">Webflow</a>
            </p>
            <div className={styles.socials}>
                <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
                <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
                <a href="#"><img src={youtubeIcon} alt="YouTube" /></a>
            </div>
        </div>
    </footer>
    );
}
