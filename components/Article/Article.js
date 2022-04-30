import Link from "next/link";
import styles from "./Article.module.scss";

export default function Article({ article }) {
  return (
    <div className="card">
      <img
        src={article.frontmatter.cover_image}
        alt="Imagen portada del artículo"
      />

      <div className="post-date">Publicado: {article.frontmatter.date}</div>

      <h3>{article.frontmatter.title}</h3>
      <p>{article.frontmatter.excerpt}</p>

      <Link href={`/articulo/${article.slug}`}>
        <a className="btn"> Leer más </a>
      </Link>
    </div>
  );
}
