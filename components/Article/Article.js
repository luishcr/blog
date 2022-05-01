import Head from "next/head";
import Link from "next/link";
import styles from "./Article.module.scss";

export default function Article({ article }) {
  return (
    <div>
      <Head>
        <script
          src="https://kit.fontawesome.com/a25f409e18.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className={styles.articles__card}>
        <img
          src={article.frontmatter.cover_image}
          alt="Imagen del artículo"
        />

        <div className={styles.articles__date}>
          Publicado: {article.frontmatter.date}
        </div>

        <h3>{article.frontmatter.title}</h3>
        <p>{article.frontmatter.excerpt}</p>

        <div className={styles.articles__btn}>
        <Link href={`/articulo/${article.slug}`}>
          <a className="hvr-icon-forward hvr-icon3"> Leer más <i className="fas fa-angle-right hvr-icon-forward hvr-icon3"></i> </a>
        </Link>
        </div>
      </div>
    </div>
  );
}
