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
        <h2>Contacto</h2>
        <p>
          Puedes contactar conmigo a través de la redes sociales o rellenando el
          siguiente formulario
          <br />
          <a
            href="https://www.luishcr.es/contact"
            className="hvr-icon-forward hvr-icon3"
          >
            Formulario
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
