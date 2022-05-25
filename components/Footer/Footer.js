import styles from "./Footer.module.scss";
import Logo from "../Header/Logo";
import NavIcons from "../Header/NavIcons";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer__background}>
        <Logo />
        <nav className={styles.footer__navIcons}>
          <NavIcons />
        </nav>

        <div className={styles.footer__copy}>
          <p>&copy; luishcr</p>
        </div>
      </div>
    </footer>
  );
}
