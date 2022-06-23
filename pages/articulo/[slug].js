import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import styles from "./Slug.module.scss";
import {
  FaChevronLeft,
  FaChevronUp,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";
import { IconContext } from "react-icons";

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
            <IconContext.Provider value={{ className: "hvr-icon4" }}>
              <FaChevronLeft />
            </IconContext.Provider>{" "}
            Ir atrás
          </a>
        </Link>
      </div>

      <article className={styles.articlePage__body}>
        <h1>{title}</h1>
        <h3> luishcr • {date}</h3>
        <figure>
          <img src={cover_image} alt="Portada del artículo" />
          <figcaption>&quot;Nunca pares de aprender&quot;.</figcaption>
        </figure>

        <div
          className={styles.articlePage__content}
          dangerouslySetInnerHTML={{
            __html: marked(content),
          }}
        ></div>
      </article>
      {/* <div className={styles.articlePage__share}>
        <p>Compártelo en tus redes:</p>
        <a
          className=" hvr-grow"
          href="https://twitter.com/intent/tweet?url=https://blog.luishcr.es"
          target="_blank"
          rel="noreferrer"
        >
          <IconContext.Provider value={{ className: " hvr-grow" }}>
            <FaTwitterSquare />
          </IconContext.Provider>
        </a>
        <a
          className=" hvr-grow"
          href="https://www.linkedin.com/shareArticle?mini=true&url=https://blog.luishcr.es"
          target="_blank"
          rel="noreferrer"
        >
          <IconContext.Provider value={{ className: " hvr-grow" }}>
            <FaLinkedin />
          </IconContext.Provider>
        </a>
        <a
          className=" hvr-grow"
          href="https://www.facebook.com/sharer/sharer.php?u=https://blog.luishcr.es"
          target="_blank"
          rel="noreferrer"
        >
          <IconContext.Provider value={{ className: "hvr-grow" }}>
            <FaFacebookSquare />
          </IconContext.Provider>
        </a>
      </div> */}
      <section className={styles.articles__end_buttons}>
        <div className={styles.articlePage__backBtn}>
          <Link href="/">
            <a className="hvr-icon-back">
              <IconContext.Provider value={{ className: "hvr-icon4" }}>
                <FaChevronLeft />
              </IconContext.Provider>{" "}
              Ir atrás
            </a>
          </Link>
        </div>
        <div className={styles.articlePage__upBtn}>
          <a href="#" className="hvr-icon-up">
            Ir arriba{" "}
            <IconContext.Provider value={{ className: "hvr-icon" }}>
              <FaChevronUp />
            </IconContext.Provider>
          </a>
        </div>
      </section>
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
