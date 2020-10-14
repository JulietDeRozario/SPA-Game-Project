const PageList = (argument) => {

  const fetchList = (argument) => {
    let finalURL = `https://api.rawg.io/api/games?page_size=9`;
    let articles = "";
    if (argument) {
      finalURL += "&search=" + argument;
    }
    fetch(`${finalURL}`)
      .then((response) => response.json())
      .then((response) => {
        response.results.forEach((article) => {
          let platforms = [];
          let genres = []; 
          article.platforms.forEach((platform) => {
            platforms.push(platform.platform.name);
          })
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
          articles += `
              <div class="card col-4">
                <div class="card__side card__side--back">
                  <div class="card__cover"  style="background-image: url('${article["background_image"]}')">
                    <h4 class="card__heading">
                      <span class="card__heading-span">${article.name}</span>
                    </h4>
                  </div>
                  <div class="card__details">
                    <ul>
                      <li>${article.released}</li>
                      <li>${genres}</li>
                      <li>Note: ${article.rating}</li>
                      <li>${article.ratings_count} votes</li>
                      <li>
                        <a class="btn btn-info my-4" onclick="PageDetail('${article.id}')" href = "#pagedetail/${article.id}">
                          <strong>Plus d'infos</strong>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="card__side card__side--front" style="background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${article["background_image"]}'); background-position:center top;">
                  <div class="card__theme">
                    <div class="card__theme-box">
                      <p class="card__title">${article.name}</p>
                      <h3>${platforms}</h3>
                    </div>
                  </div>
                </div>
              </div>
          `;
        });
        document.querySelector("#articles").innerHTML = articles;
      });
  };
  fetchList(argument);
}

export { PageList };