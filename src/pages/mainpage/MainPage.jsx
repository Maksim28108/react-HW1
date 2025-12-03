import styles from './main.module.css'
import mainpic from '../../assets/images/mainpic.png';
import trustPilotIcon  from '../../assets/images/trust.svg';
import {Header} from '../header/Header'
import {Footer} from '../footer/Footer'




export function MainPage(){
    return (
        <>
        <Header />
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <main className={styles.hero}>
                    <section className={styles.left}>
                        <h1 className={styles.title}>
                            Beautiful food & takeaway, <span className={styles.accent}>delivered</span> to your door.
                        </h1>

                        <p className={styles.ptext}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
                        </p>

                        <button className={styles.pbutton}>
                            Place an Order
                        </button>

                        <div className={styles.trust}>
                            <img src={trustPilotIcon} className={styles.star} alt="trustpilot" />
                            <p className={styles.trustText}>
                                <span className={styles.score}> 4.8 out of 5</span> based on 2000+ reviews
                            </p>
                        </div>
                    </section>
                    <aside className={styles.right}>
                        <img className={styles.heroImg} src={mainpic} alt="" />
                    </aside>
                </main>
            </div>
        </div>
        <Footer />
    </>

    )
}
