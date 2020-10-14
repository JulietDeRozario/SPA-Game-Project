import { PageList } from "./PageList";

const PageDetail = (id) => {
  const moreInformations = (id) => {
    fetch(`https://api.rawg.io/api/games/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setInformations(response);
      });
  }

  const setInformations = (game) => {
    let genres = [];
    game.genres.forEach(genre => {
      genres.push(`<a href="#pagelist/&genres=${genre.slug}">${genre.name}</a>`);
    });
    genres = genres.join(",\n");
    
    let publishers = []; 
    game.publishers.forEach(publisher => {
      publishers.push(`<a href="#pagelist/&publishers=${publisher.slug}">${publisher.name}</a>`);
    });
    publishers = publishers.join(",\n")

    let developers = [];
    game.developers.forEach(developer => {
      developers.push(`<a href="#pagelist/&developers=${developer.slug}">${developer.name}</a>`);
    });
    developers = developers.join(",\n");

    let platforms = [];
    game.platforms.forEach((platform) => {
      platforms.push(`<a href="#pagelist/&platforms=${platform.platform.id}">${platform.platform.name}</a>`);
    });
    platforms = platforms.join(",\n");

    let tags = [];
    game.tags.forEach(tag => {
      tags.push(`<a href="#pagelist/&tags=${tag.slug}">${tag.name}</a>`);
    })
    tags = tags.join(",\n");

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
              Disponible sur: ${platforms};<br>
              Tags: ${tags}
            </em><br>
            <a href="${game.website}">Site web</a>
          </div>
        </div>
        <div class="blur_back bright_back" style="background-image: url('${game.background_image}')"></div>
      </div>
      <div class="row" id="screenshots"></div>
      <div class="row" id="similar-games"></div>
      <div class="row" id="youtube-videos"></div>
    `;
    game.stores.forEach(store => {
      document.getElementById('articles').innerHTML += `
        <a href="${store.url}">${store.store.name}</a>
      `;
    })
    getScreenshots(game.slug);
    getSimilarGames(game.id);
    getYoutubeVideos(game.slug);
  }

  const getScreenshots = (slug) => {
    fetch(`https://api.rawg.io/api/games/${slug}/screenshots?page_size=4`)
    .then((response) => response.json())
    .then((response) => {
      let images = [];
      response.results.forEach(image => images.push(image.image));
      images.forEach(image => {
        document.getElementById('screenshots').innerHTML += `
          <div class="col-6">
            <img src="${image}"/>
          </div>
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
          <div class="col-4">
            <img src="${game.background_image}" title="${game.name}"/>
          </div>
        `;
      })
    })
  }

  const getYoutubeVideos = (slug) => {
    fetch(`https://api.rawg.io/api/games/${slug}/youtube?page_size=4`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      response.results.forEach(video => {
        document.getElementById('youtube-videos').innerHTML += `
          <div class="col-6">
            <a href="https://www.youtube.com/watch?v=${video.external_id}">
              <img src="${video.thumbnails.high.url}" title="${video.channel_title} - ${video.name}"/>
            </a>
          </div>
        `;
      })
    })
  }

  moreInformations(id);
}

export { PageDetail };
