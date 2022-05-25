import Script from "next/script";
import Link from "next/link";
import styles from "./Article.module.scss";
import { FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Article({ article }) {
  return (
    <div>
      <Script
        src="https://kit.fontawesome.com/a25f409e18.js"
        crossOrigin="anonymous"
      ></Script>
      <div className={styles.articles__card}>
        <img src={article.frontmatter.cover_image} alt="Imagen del artículo" />

        <div className={styles.articles__date}>
          Publicado: {article.frontmatter.date}
        </div>

        <h3>{article.frontmatter.title}</h3>
        <p>{article.frontmatter.excerpt}</p>

        <div className={styles.articles__btn}>
          <Link href={`/articulo/${article.slug}`}>
            <a className="hvr-icon-forward hvr-icon3">
              {" "}
              Leer más{" "}
              <IconContext.Provider
                value={{ className: "hvr-icon-forward hvr-icon3" }}
              >
                <FaChevronRight />
              </IconContext.Provider>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
