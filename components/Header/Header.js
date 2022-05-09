import Link from "next/link";
import styles from "./Header.module.scss";
import "../../utils/main";

export default function Header() {
  return (
    <header>
      <nav className={styles.nav__background}>
        <div className={styles.nav__menu}>
          <div className={styles.nav__mobile}>
            <div className={styles.nav__mobile_logo}>
              <a href="https://www.luishcr.es">
                <img
                  src="../../images/whiteLogo.png"
                  className="white-logos"
                  alt="LOGO"
                />
                <span>
                  <img
                    src="../../images/yellowLogo.png"
                    className="yellow-logos"
                    alt="LOGO"
                  />
                </span>
              </a>
            </div>
            <button className={styles.nav__toggle} id="nav__toggle">
              <img src="../../images/toggle.png" alt="toggle button" />
            </button>
          </div>

          <div className={styles.nav__logo}>
            <a href="https://www.luishcr.es">
              <img
                src="../../images/whiteLogo.png"
                className="white-logos"
                alt="LOGO"
              />
              <span>
                <img
                  src="../../images/yellowLogo.png"
                  className="yellow-logos"
                  alt="LOGO"
                />
              </span>
            </a>
          </div>

          <ul
            className={styles.nav__links}
            id="nav__links" /* nav-links_hider" id="nav-links"*/
          >
            <li>
              <a href="https://www.luishcr.es">
                <i className="fas fa-home"></i> Inicio
              </a>
            </li>
            <li>
              <Link href="/">
                <a>
                  <i className="fas fa-book"></i> Blog
                </a>
              </Link>
            </li>
            <li>
              <a href="https://www.luishcr.es/portfolio">
                <i className="fas fa-file-code"></i> Portafolio
              </a>
            </li>
            <li>
              <a
                href="https://www.luishcr.es/docs/LuisHCR_CV.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fas fa-file-pdf"></i> Currículum
              </a>
            </li>
            <li>
              <a href="https://www.luishcr.es/contact">
                <i className="fas fa-envelope"></i> Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav className={styles.navSocial__icons}>
        <ul className={styles.navSocial__list}>
          <li className={styles.navSocial__item}>
            <a
              href="https://www.linkedin.com/in/luishcr"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin"> </i>
            </a>
          </li>
          <li className={styles.navSocial__item}>
            <a
              href="https://github.com/LuisHCR"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github-square"> </i>
            </a>
          </li>
          <li className={styles.navSocial__item}>
            <a
              href="https://twitter.com/Luishcerre"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter-square"> </i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
