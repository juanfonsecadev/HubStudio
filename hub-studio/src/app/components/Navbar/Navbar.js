import Image from "next/image"
import styles from "./Navbar.module.css"
import Link from "next/link"

export default function Navbar(){
    return (
        <nav className={styles.navbar}>
            <container className={styles.NavContainer}>
                <div className={styles.Logo}>
                    {/* Logo Image Here */}
                    <Image src={""} alt="Logo-img"/>
                </div>
                <div>
                    {/* Entrar - registrar-se*/}

                    <ul className={styles.navLinks}>
                        <Link href={"/"}>   Entrar </Link> 
                        <Link href={"/"}>   Registrar-se </Link>
                    </ul> 
                </div>
            </container>
        </nav>
    )
}