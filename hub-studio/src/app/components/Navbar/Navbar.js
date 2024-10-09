import Image from "next/image"
import styles from "./Navbar.module.css"

export default function Navbar(){
    return (
        <nav className={styles.navbar}>
            <container>
                <div>
                    {/* Logo Image Here */}
                    <Image src={""} alt="Logo-img"/>
                </div>
                <div>
                    {/* Nav Links Here */}
                </div>
            </container>
        </nav>
    )
}