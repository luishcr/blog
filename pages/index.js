import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Article from "../components/Article/Article";
import { sortByDate } from "../utils/main";

export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <title>👨🏽‍💻Blogsite</title>
      </Head>

      <h1>
        Bienvenidos a mi<a href="#"> Blog</a>
      </h1>
      <div className="articles__grid">
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
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
