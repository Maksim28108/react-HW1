import styles from "./footer.module.css";
import headerIcon from "../../assets/logoimage.svg";
import instagramIcon from "../../assets/instagram.svg";
import twitterIcon from "../../assets/twitter.svg";
import youtubeIcon from "../../assets/youtube.svg";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.left}>
          <img src={headerIcon} alt="logo" className={styles.logo} />
          <p className={styles.description}>
            {t("footer.description").split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h4>{t("footer.company")}</h4>
            <a href="#">{t("footer.home")}</a>
            <a href="#">{t("footer.order")}</a>
            <a href="#">{t("footer.faq")}</a>
            <a href="#">{t("footer.contact")}</a>
          </div>

          <div className={styles.column}>
            <h4>{t("footer.template")}</h4>
            <a href="https://www.google.com/">{t("footer.styleGuide")}</a>
            <a href="https://www.google.com/">{t("footer.changelog")}</a>
            <a href="https://www.google.com/">{t("footer.licence")}</a>
            <a href="https://www.google.com/">{t("footer.webflowUni")}</a>
          </div>

          <div className={styles.column}>
            <h4>{t("footer.flowbase")}</h4>
            <a href="#">{t("footer.moreCloneables")}</a>
          </div>
        </div>
      </div>

      <hr className={styles.line} />

      <div className={styles.bottom}>
        <p className={styles.copy}>
          {t("footer.builtBy")} <a href="#">Flowbase</a>.{" "}
          {t("footer.poweredBy")} <a href="#">Webflow</a>
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
