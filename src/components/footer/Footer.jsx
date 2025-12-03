import styles from './footer.module.css';
import headerIcon from '../../assets/logoimage.svg'
import instagramIcon from '../../assets/instagram.svg'
import twitterIcon from '../../assets/twitter.svg'
import youtubeIcon from '../../assets/youtube.svg'

export default function Footer() {
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
                    <a href="https://www.google.com/ ">Style Guide</a>
                    <a href="https://www.google.com/ ">Changelog</a>
                    <a href="https://www.google.com/ ">Licence</a>
                    <a href="https://www.google.com/ ">Webflow University</a>
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
