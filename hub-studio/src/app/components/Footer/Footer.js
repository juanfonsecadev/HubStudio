import styles from './Footer.module.css';


export default function Footer() {
    return (

        <footer className={styles.footer}>

            <div className={styles.footerContent}>
                <h3>HubStudio</h3>
                <p>Onde as Conversas Ganham Vida</p>
                <ul className={styles.socials}>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Instagram</a></li>
                </ul>
            </div>
            <div className={styles.footerBottom}>
                <p>© HubStudio 2024, All Rights Reserved</p>
            </div>
        </footer>
    )
}