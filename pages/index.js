import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Article from "../components/Article/Article";
import styles from "./Home.module.scss";
import { sortByDate } from "../utils/main";
import { FaChevronRight, FaChevronUp, FaMapMarkedAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Home({ articles }) {
  return (
    <div>
      <section className={styles.index}>
        <h1 className={styles.title}>
          Blog<span className={styles.span}>space</span>
        </h1>
        <div className={styles.articles__grid}>
          {articles.map((article, index) => (
            <Article key={index} article={article} />
          ))}
        </div>
      </section>

      <section className={styles.info}>
        <p>
          Código del blog en el repositorio de
          <a
            href="https://github.com/luishcr/blog"
            className="hvr-icon-forward hvr-icon3"
          >
            github{" "}
            <IconContext.Provider
              value={{ className: "hvr-icon-forward hvr-icon3" }}
            >
              <FaChevronRight />
            </IconContext.Provider>
          </a>
        </p>
        <br />

        <a href="#" className="hvr-icon-up hvr-icon">
          Volver arriba{" "}
          <IconContext.Provider value={{ className: "hvr-icon" }}>
            <FaChevronUp />
          </IconContext.Provider>
        </a>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  // Obtener archivos del directorio ../articles
  const files = fs.readdirSync(path.join("articles"));

  // Obtener slug y frontmatter de los articles
  const articles = files.map((filename) => {
    // Crear slug
    const slug = filename.replace(".md", "");

    // Obtener frontmatter
    const markdownWhitMeta = fs.readFileSync(
      path.join("articles", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWhitMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      articles: articles.sort(sortByDate),
    },
  };
}
