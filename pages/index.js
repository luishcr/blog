import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Article from "../components/Article/Article";
import styles from "./Home.module.scss";
import { sortByDate } from "../utils/main";

export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <script
          src="https://kit.fontawesome.com/a25f409e18.js"
          crossOrigin="anonymous"
        ></script>
        <title>👨🏽‍💻 Blog.luishcr</title>
      </Head>

      <div>
        <h1 className={styles.title}>
          Blog<span className={styles.span}>de notas</span>
        </h1>
        <div className={styles.articles__grid}>
          {articles.map((article, index) => (
            <Article key={index} article={article} />
          ))}
        </div>
      </div>
      <div className={styles.articles__location}>
        <h2>¿Alguna errata?</h2>
        <p>
          Este blog es de código abierto, por lo que si quieres, puedes
          modificar y proponer cambios en el repositorio de
          <br />
          <a
            href="https://github.com/luishcr/blog"
            className="hvr-icon-forward hvr-icon3"
          >
            github
            <i className="fas fa-angle-right hvr-icon-forward hvr-icon3"></i>
          </a>
        </p>
        <br />

        <i className="fas fa-map-marked-alt"></i>
        <p>Desde Alicante/Alacant 👋🏽 para el mundo.</p>
        <br />
        <a href="#" className="hvr-icon-up hvr-icon">
          Volver arriba <i className="fas fa-angle-up hvr-icon-up hvr-icon"></i>
        </a>
      </div>
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
