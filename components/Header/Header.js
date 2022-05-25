import Image from "next/image";
import styles from "./Header.module.scss";
import NavMenu from "./NavMenu";
import NavIcons from "./NavIcons";
import Logo from "./Logo";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Header() {
  const [showNav, setshowNav] = useState(false);

  return (
    <header>
      {/*  MENU NAVBAR  */}
      <nav className={styles.nav__background}>
        <div className={styles.nav__menu}>
          <div className={styles.nav__mobile}>
            <Logo />
            <button
              onClick={() => setshowNav(!showNav)}
              className={styles.nav__toggle}
            >
              <IconContext.Provider value={{ className: "nav__menu_icons" }}>
                <FaBars />
              </IconContext.Provider>
            </button>
            {showNav ? <NavMenu /> : null}
          </div>

          <Logo />

          <NavMenu />
        </div>
      </nav>

      {/*  ICONS NAVBAR  */}
      <nav className={styles.nav__icons}>
        <NavIcons />
      </nav>
    </header>
  );
}
