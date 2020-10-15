import "../sass/styles.scss";
import 'bootstrap';
import { PageList } from "./PageList";
import { routes } from "./routes";

let pageArgument;

document.getElementById('submit-btn').onclick = (e) => {
  e.preventDefault();
  let stringSearch = document.getElementById('searchbar').value;
  stringSearch = stringSearch.toLowerCase().replace(/\s+/g, "-");
  window.location.hash=`#game/${stringSearch}`;
}

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  routes[path[0]](pageArgument);
  return true;
};

// Intersection Observer
const CreateInspector = () => {
  const allGames = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -200px 0px",
  };
  
  const appearOnScroll = new IntersectionObserver((
    entries,
    appearOnScroll
    ) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting){
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      })
    }, appearOptions)
  
  allGames.forEach(game => {
    appearOnScroll.observe(game);
  })
}

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

export { CreateInspector };