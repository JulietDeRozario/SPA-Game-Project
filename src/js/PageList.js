import { CreateInspector } from './index';

const PageList = (argument) => {
  document.querySelector("#articles").innerHTML = "";
  document.querySelector(".main-text").style = "display: block";


  let current_page = 1;

  const getURL = (argument) => { 
    let finalURL = `https://api.rawg.io/api/games?page_size=9`;
    if (argument) {
      finalURL += "&search=" + argument;
    }
    fetchList(finalURL);
  }

  const fetchList = (url) => {
    fetch(`${url}&page=${current_page}`)
      .then((response) => response.json())
      .then((response) => {
        response.results.forEach((article) => {
          let platforms = [];
          let genres = []; 
          article.genres.forEach((genre) =>  {
            genres.push(genre.name);
          })
          if(article.platforms !== null ){
            article.platforms.forEach((platform) => {
              platforms.push(platform.platform.name);
            })
            platforms = platforms.join(",\n");
          }
          genres = genres.join(",\n");
          document.querySelector("#articles").innerHTML += `
            <div class="card fade-in">
              <div class="card__side card__side--front">
                <img class="game-img" src="${article["background_image"]}"/>
                <div class="game-info">
                  <h1>${article.name}</h1>
                  <h2>${platforms}</h2>
                </div>
              </div>
              <div class="card__side card__side--back">
                <div class="card__description">
                  <h1>${article.name}</h1>
                  <ul>
                    <li>${article.released}</li>
                    <li>${genres}</li>
                    <li>Note: ${article.rating}/5</li>
                    <li>${article.ratings_count} votes</li>
                    <li>
                      <a class="btn btn-info my-4" href="#gamedetails/${article.slug}">
                        <strong>See more</strong>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          `;
        })
        CreateInspector();
      });
      const viewMoreBtn = document.querySelector("#view-more-btn")
      if(current_page < 3){
        viewMoreBtn.className = "show-more-btn";
        viewMoreBtn.innerHTML = "<p class='btn-text'>Show more</p>";
        viewMoreBtn.onclick = () => {
          current_page += 1;
          fetchList(url);
        };
      }else{
        viewMoreBtn.className = "";
        viewMoreBtn.innerHTML = "";
      }
      
  }
  getURL(argument);
}

export { PageList };