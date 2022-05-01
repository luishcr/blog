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
      <div className={styles.articlePage__btn}>
        <Link href="/">
          <a className="hvr-icon-forward hvr-icon3">
            Atrás{" "}
            <i className="fas fa-angle-right hvr-icon-forward hvr-icon3"></i>
          </a>
        </Link>
      </div>

      <div className={styles.articlePage__body}>
        <h1 className={styles.articlePage__title}>{title}</h1>
        <div className={styles.articlePage__date}>Publicado: {date}</div>
        <img src={cover_image} alt="Portada del artículo" />
        <div className="post-body">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(content),
            }}
          ></div>
        </div>
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
