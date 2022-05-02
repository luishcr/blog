import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer__background}>
        <div className={styles.footer__logo}>
          <a href="index.html">
            <img
              src="images/whiteLogo.png"
              className="white-logos"
              alt="LOGO"
            />
            <span>
              <img
                src="images/yellowLogo.png"
                className="yellow-logos"
                alt="LOGO"
              />
            </span>
          </a>
        </div>
        <div>
          <ul className={styles.footer__list}>
            <li className={styles.footerSocial__item}>
              <a href="https://www.linkedin.com/in/luishcr" target="_blank">
                <i className="fab fa-linkedin"> </i>
              </a>
            </li>
            <li className={styles.footerSocial__item}>
              <a href="https://github.com/LuisHCR" target="_blank">
                <i className="fab fa-github-square"> </i>
              </a>
            </li>
            <li className={styles.footerSocial__item}>
              <a href="https://twitter.com/luishcerre" target="_blank">
                <i className="fab fa-twitter-square"> </i>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footer__copy}>
          <p>&copy; LuisHCR</p>
          <br />
        </div>
        <div className={styles.footer__legal}>
          <a href="https://www.luishcr.es/legal-info">Aviso legal</a>
        </div>
      </div>
    </footer>
  );
}
