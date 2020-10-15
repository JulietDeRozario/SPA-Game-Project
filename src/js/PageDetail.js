const PageDetail = (id) => {
  document.querySelector(".main-text").style = "display: none";

  const moreInformations = (id) => {
    fetch(`https://api.rawg.io/api/games/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setInformations(response);
      });
  }

  const setInformations = (game) => {
    document.querySelector("#view-more-btn").innerHTML = "";
    document.querySelector("#view-more-btn").className = "";
    let genres = [];
    game.genres.forEach(genre => {
      genres.push(`<a href="#game/&genres=${genre.slug}">${genre.name}</a>`);
    });
    genres = genres.join(",\n");
    
    let publishers = []; 
    game.publishers.forEach(publisher => {
      publishers.push(`<a href="#game/&publishers=${publisher.slug}">${publisher.name}</a>`);
    });
    publishers = publishers.join(",\n")

    let developers = [];
    game.developers.forEach(developer => {
      developers.push(`<a href="#game/&developers=${developer.slug}">${developer.name}</a>`);
    });
    developers = developers.join(",\n");

    let platforms = [];
    game.platforms.forEach((platform) => {
      platforms.push(`<a href="#game/&platforms=${platform.platform.id}">${platform.platform.name}</a>`);
    });
    platforms = platforms.join(",\n");

    let tags = [];
    game.tags.forEach(tag => {
      tags.push(`<a href="#game/&tags=${tag.slug}">${tag.name}</a>`);
    })
    tags = tags.join(",\n");

    let video;
    if(game.clip === null || game.clip.clip === null){
      video = "";
    }else{
      video = `
      <h1 class="big-title">TRAILER</h1>
      <video class="mb-3" controls>
        <source src="${game.clip.clip}" type="video/mp4">
      </video><br> 
      `;
    }
    let stores = [];
    game.stores.forEach(store => {
      stores.push(`<a href="${store.url}">${store.store.name}</a>`)
    })
    stores = stores.join(',').replace(/[,]+/g, ' ');

    document.getElementById('articles').innerHTML = `
      <div class="game_card" id="bright">
        <div class="info_section mb-1">
          <div class="game_header">
            <img class="background-img" src="${game.background_image}"/>
            <div class="game-headers">
              <h1>${game.name}</h1>
              <span>${game.rating}/5-${game.ratings_count} votes</span>
            </div>
          </div>
          <div class="plot">
            <p>
              ${game.description} 
            </p>
          </div>
          <div class="game-sources">
            <div>
              <h4>Release Date</h4>
              <p>${game.released}</p>
            </div>
            <div>
              <h4>Developed by<h4>
              <p>${developers}</p>
            </div>
            <div>
              <h4>Platforms<h4>
              <p>${platforms}<p>
            </div>
            <div>
              <h4>Published by</h4>
              <p>${publishers}</p>
            </div>
          </div>
          <div class="game-sources-row2">
            <div>
              <h4>Genres</h4>
              <p>${genres}</p>
            </div>
            <div>
              <h4>Tags</h4>
              <p>${tags}</p>
            </div>
          </div>
          <div class="game-shops">
            <div>
              <h1 class="big-title">BUY</h1>
              <p>${stores}</p>
            </div>
          </div>
          ${video}
          
          
          <div class="game_desc mt-5">

            
            <a href="${game.website}">Site web</a>
          </div>
        </div>
        <div class="blur_back bright_back" style="background-image: url('${game.background_image_additional}')"></div>
      </div>
      <div class="images">
        <h1 class="big-title">SCREENSHOTS</h1>
        <div class="row" id="screenshots"></div>
      </div>
      <div class="youtube">
        <h1 class="big-title">YOUTUBE</h1>
        <div class="row" id="youtube-videos"></div>
      </div>
      <div class="other-games">
        <h1 class="big-title">SIMILAR GAMES</h1>
        <div class="row" id="similar-games"></div>
      </div>
    `;
    getScreenshots(game.slug);
    getYoutubeVideos(game.slug);
    getSimilarGames(game.id);
  }

  const getScreenshots = (slug) => {
    fetch(`https://api.rawg.io/api/games/${slug}/screenshots?page_size=4`)
    .then((response) => response.json())
    .then((response) => {
      let images = [];
      response.results.forEach(image => images.push(image.image));
      images.forEach(image => {
        document.getElementById('screenshots').innerHTML += `
          <img class="screenshot" src="${image}"/>
        `;
      })
    })
  }

  const getSimilarGames = (id) => {
    fetch(`https://api.rawg.io/api/games/${id}/suggested?page_size=6`)
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach(game => {
        document.getElementById('similar-games').innerHTML += `
          <div class="similar-game">
            <img src="${game.background_image}" title="${game.name}"/>
            <h3>${game.name}<h3>
          </div>
        `;
      })
    })
  }

  const getYoutubeVideos = (slug) => {
    fetch(`https://api.rawg.io/api/games/${slug}/youtube?page_size=4`)
    .then((response) => response.json())
    .then((response) => {
      response.results.forEach(video => {
        document.getElementById('youtube-videos').innerHTML += `
          <div class="youtube-video>
            <a href="https://www.youtube.com/watch?v=${video.external_id}">
              <img src="${video.thumbnails.high.url}"/>
            </a>
            <div class="video-text">
              <a href="https://www.youtube.com/watch?v=${video.external_id}">
                <h3>${video.name}</h3>
              </a>
              <p>${video.channel_title}</p>
            </div>
          </div>
        `;
      })
    })
  }

  moreInformations(id);
}

export { PageDetail };
