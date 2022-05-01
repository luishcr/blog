export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

// // Ocultar/mostrar logos blancos
// const yellowLogos = document.querySelectorAll(".yellow-logos");
// const whiteLogos = document.querySelectorAll(".white-logos");

// yellowLogos.forEach((logo) => {
//   logo.addEventListener("mouseover", () => {
//     whiteLogos.forEach((logo) => {
//       logo.style.visibility = "hidden";
//     });
//   });
//   logo.addEventListener("mouseout", () => {
//     whiteLogos.forEach((logo) => {
//       logo.style.visibility = "visible";
//     });
//   });
// });
