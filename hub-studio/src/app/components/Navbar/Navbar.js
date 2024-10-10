import Image from "next/image"
import styles from "./Navbar.module.css"
import Link from "next/link"

export default function Navbar(){
    return (
        <nav className={styles.navbar}>
            <container className={styles.NavContainer}>
                <div className={styles.Logo}>
                    {/* Logo Image Here */}
                    <Image src={"/images/hubstudio.svg"}  alt="hubstudio"  width={400} height={30} />

                </div>
                <div className={styles.NavDiv}>

                    <ul className={styles.navLinks}>
                        <Link href={"/"}>   Entrar </Link> 
                        <Link href={"/"}>   Registrar-se </Link>
                    </ul> 
                </div>
            </container>
        </nav>
    )
}