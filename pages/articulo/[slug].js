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
      <button className={styles.articlePage__btn}>
        <Link href="/">
          <a className="hvr-icon-back hvr-icon4">
            <i className="fas fa-angle-left hvr-icon-back hvr-icon4"></i> Atrás
          </a>
        </Link>
      </button>

      <article className={styles.articlePage__body}>
        <h1>{title}</h1>
        <h3> luishcr • {date}</h3>
        <figure>
          <img src={cover_image} alt="Portada del artículo" />
          <figcaption>
            {" "}
            Artículo 1 - Configura un entorno de desarrollo.
          </figcaption>
        </figure>

        <div
          className={styles.articlePage__content}
          dangerouslySetInnerHTML={{
            __html: marked(content),
          }}
        ></div>
      </article>
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
