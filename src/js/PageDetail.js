const PageDetail = (id) => {
  const moreInformations = (id) => {
    fetch(`https://api.rawg.io/api/games/${id}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setInformations(response);
      });
  }

  const setInformations = (game) => {
    let genres = [];
    game.genres.forEach(genre => {
      genres.push(genre.name);
    });
    genres = genres.join(",\n");
    
    let publishers = []; 
    game.publishers.forEach(publisher => {
      publishers.push(publisher.name);
    });
    publishers = publishers.join(",\n")

    let developers = [];
    game.developers.forEach(developer => {
      developers.push(developer.name);
    });
    developers = developers.join(",\n");

    let platforms = [];
    game.platforms.forEach((platform) => {
      platforms.push(platform.platform.name);
    });
    platforms = platforms.join(",\n");

    let video;
    if(game.clip === null || game.clip.clip === null){
      video = "";
    }else{
      video = `
      <video class="mb-3" width="320" height="240" controls>
        <source src="${game.clip.clip}" type="video/mp4">
      </video><br> 
      `;
    }

    document.getElementById('articles').innerHTML = `
      <div class="game_card" id="bright">
        <div class="info_section mb-1">
          <div class="game_header">
            <img class="locandina" src="${game.background_image_additional}"/>
            <h1>${game.name}</h1>
            <h4>${publishers}</h4>
            <h5>${game.released}</h5>
            <span class="minutes">${game.rating}/5 (${game.ratings_count} notes)</span>
            <p class="type">${genres}</p>
          </div>
          <div class="game_desc mt-5">
            <p class="text">
              ${game.description} 
            </p>
            ${video}
            <em class="text">
              Developpé par: ${developers};<br>
              Disponible sur: ${platforms}
            </em><br>
            <a href="${game.website}">Site web</a>
          </div>
        </div>
        <div class="blur_back bright_back" style="background-image: url('${game.background_image}')"></div>
      </div>
    `;
  }
  moreInformations(id);
}

export { PageDetail };
