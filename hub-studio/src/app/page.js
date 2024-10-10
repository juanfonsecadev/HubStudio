import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.css";
import Image from "next/image";



export default function Home() {
  return (
    <div>
      <Navbar />
      <section className={styles.heroSection}>

        <container className={styles.HeroContainer}>

          <div className={styles.HeroImage}> 

            <Image src={"/images/Слой_1.png"}  width={550} height={450} alt={"Imagem de duas pessoas bebendo"} />

          </div>

          <div className={styles.Content}>
            <h1>
            HubStudio. <br/>
            Onde as conversas ganham vida!
            </h1>

            <p>Junte-se à nossa comunidade e transforme sua experiência de comunicação.</p>
          </div>

        </container>
      </section>


      <section className={styles.MockupSection}>
        <container>

      

        </container>
      </section>


      <Footer /> 

    </div>
  );
}
