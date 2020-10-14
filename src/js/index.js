import "../sass/styles.scss";
import 'bootstrap';
import { PageList } from "./PageList";
import { routes } from "./routes";

let pageArgument;

document.getElementById('submit-btn').onclick = (e) => {
  e.preventDefault();
  let stringSearch = document.getElementById('searchbar').value;
  window.location.hash=`#pagelist/${stringSearch}`;
  PageList(stringSearch);
}

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
