import styles from "./Header.module.scss";
import { IconContext } from "react-icons";
import { FaLinkedin, FaGithubSquare, FaTwitterSquare } from "react-icons/fa";
// import { SiNotion } from "react-icons/si";

export default function NavIcons() {
  return (
    <ul className={styles.nav__icons_list}>
      <li>
        <a
          href="https://www.linkedin.com/in/luishcr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconContext.Provider value={{ className: "nav__icons_icon" }}>
            <FaLinkedin />
          </IconContext.Provider>
        </a>
      </li>
      <li>
        <a
          href="https://github.com/LuisHCR"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconContext.Provider value={{ className: "nav__icons_icon" }}>
            <FaGithubSquare />
          </IconContext.Provider>
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/luishcrDev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconContext.Provider value={{ className: "nav__icons_icon" }}>
            <FaTwitterSquare />
          </IconContext.Provider>
        </a>
      </li>
      {/* <li>
        <a
          href="https://luishcr.notion.site/OnlineCoursesNotes-0e3d900d03dd4cef8580dcac6cc35bc0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconContext.Provider value={{ className: "nav__icons_icon" }}>
            <SiNotion />
          </IconContext.Provider>
        </a>
      </li> */}
    </ul>
  );
}
