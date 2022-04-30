import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.nav__background}>
      <nav className={styles.nav__menu}>
        <div className={styles.nav__mobile}>
          <div className={styles.nav__logo}>
            <a href="index.html">
              <img
                src="images/LogoMakr-306kZJ.png"
                className="white-logos"
                alt="LOGO"
              />
              <span>
                <img
                  src="images/LogoMakr-7bM4w8.png"
                  className="yellow-logos"
                  alt="LOGO"
                />
              </span>
            </a>
          </div>
          <button className="nav-toggle">
            <img src="images/toggle.png" alt="toggleNav" />
          </button>
        </div>

        <div className={styles.nav__logo}>
          <a href="index.html">
            <img
              src="images/LogoMakr-306kZJ.png"
              className="white-logos"
              alt="LOGO"
            />
            <span>
              <img
                src="images/LogoMakr-7bM4w8.png"
                className="yellow-logos"
                alt="LOGO"
              />
            </span>
          </a>
        </div>

        <ul className={styles.nav__links} /* nav-links_hider" id="nav-links"*/>
          <li>
            <Link href="https://www.luishcr.es">
              <a>
                <i className="fas fa-home"></i> Inicio
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <i className="fas fa-book"></i> Blog
              </a>
            </Link>
          </li>
          <li>
            <a href="portfolio.html">
              <i className="fas fa-file-code"></i> Portafolio
            </a>
          </li>
          <li>
            <a href="docs/LuisHCR_CV.pdf" target="_blank">
              <i className="fas fa-file-pdf"></i> Currículum
            </a>
          </li>
          <li>
            <a href="contact.html">
              <i className="fas fa-envelope"></i> Contacto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
