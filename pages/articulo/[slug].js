import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import styles from "./Slug.module.scss";

export default function ArticlePage({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) {
  return (
    <>
      <div className={styles.articlePage__backBtn}>
        <Link href="/">
          <a className="hvr-icon-back">
            <i className="fas fa-angle-left hvr-icon-back hvr-icon4"></i> Ir
            atrás
          </a>
        </Link>
      </div>

      <article className={styles.articlePage__body}>
        <h1>{title}</h1>
        <h3> luishcr • {date}</h3>
        <figure>
          <img src={cover_image} alt="Portada del artículo" />
          <figcaption>"Nunca pares de aprender".</figcaption>
        </figure>

        <div
          className={styles.articlePage__content}
          dangerouslySetInnerHTML={{
            __html: marked(content),
          }}
        ></div>

        <div className={styles.articlePage__share}>
          <h2>¿Te ha parecido útil?</h2>
          <p>Compártelo en tus redes:</p>
          <a
            className="twitter-share-button hvr-grow"
            href="https://twitter.com/intent/tweet?"
            target="__blank"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            className="twitter-share-button hvr-grow"
            href="https://www.linkedin.com/sharing/share-offsite/?"
            target="__blank"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            className="twitter-share-button hvr-grow"
            href="https://www.facebook.com/sharer.php?"
            target="__blank"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
        </div>
      </article>
      <div className={styles.articlePage__upBtn}>
        <a href="#" className="hvr-icon-up">
          Ir arriba <i className="fas fa-angle-up hvr-icon-up hvr-icon"></i>
        </a>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("articles"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("articles", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}
