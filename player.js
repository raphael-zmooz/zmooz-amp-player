const lightboxEl = document.querySelector(".lightbox");
const player = document.body.querySelector("amp-story-player");

// To be remplaced with prod values
const apiEndpoint = 'https://api.zmoozy.com/portal/stories?filter%5Blimit%5D=9&filter%5Boffset%5D=0&filter%5Border%5D%5B0%5D=lastPublishedAt%20desc&filter%5Bwhere%5D%5BchannelId%5D=873&filter%5Bwhere%5D%5BaccessType%5D=1&filter%5Bwhere%5D%5BchannelStructure%5D=1';

//Subdomain of "aufeminin, needs to be updated, with the brand prod stories location"
const domain = "https://amp.zmoozy.com";

// Main widget function pulling data from the api once the player is ready
if (player.isReady) {
  get_api_data(apiEndpoint);
} else {
  player.addEventListener("ready", () => {
    get_api_data(apiEndpoint);
  });
}

// Main API call, returns an array containing lastest stories / Can be customed to most popular stories, ot stories from a category, etc
async function get_api_data(url) {
    fetch(url, {
        method: 'GET',
        headers: {
        'authority' : 'api.zmoozy.com',
        'pragma' : 'no-cache',
        'cache-control' : 'no-cache',
        'sec-ch-ua' : '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        'sec-ch-ua-mobile' : '?0',
        'user-agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
        'accept' : '*/*',
        'origin' : 'https://zmoozy.com/',
        'sec-fetch-site' : 'same-site',
        'sec-fetch-mode' : 'cors',
        'sec-fetch-dest' : 'empty',
        'referer' : 'https://zmoozy.com/',
        'accept-language' : 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7',
        },
    }).then((value) => {
        return value.json()
    }).then(res => {
        res.forEach(element => {
          // Creates a bubble for each element of the array
          gen_thumbnails(element.image11, element.title.slice(13, 25) + '...')
          // Pushes the stories to the player
          add_stories_to_player(element.ampLink)
        });
        initializeWidget();
    });
}

// The function takes the amp link as parameter and pushes it to the player ex : "domain + /stories/DIY-20-oeufs-de-Paques-originaux-a-faire-avec-les-enfants-VDZg"
function add_stories_to_player(link) {
  player.add([{href: domain + link}]);
}


// This function creates the bubbles opening the player with onClick event
function gen_thumbnails(image, title) {
  var div = document.createElement('div');
//   var img = document.createElement("img");
//   var div_text = document.createElement('div');

//   img.src = image;
//   img.setAttribute("background-size", "contain");
//   img.setAttribute("class", "imgStorie");
//   img.style.borderStyle = "solid";
  
//   div_text.setAttribute('class', "divTitle");
//   div_text.innerHTML += '<p class="title">' + title + '</p>';
//   div_text.style.textAlign = 'center';
//   div_text.style.position = 'relative';

  div.setAttribute('class', "entry-point-card-container");
//   div.appendChild(img);
//   div.appendChild(div_text);
  document.getElementById("entry-points").appendChild(div);
}

// Function adding the onClick event to each "entry-point-card-container" element
function initializeWidget() {
  const stories = player.getStories();
  const thumbnails = document.querySelectorAll(".entry-point-card-container");

  thumbnails.forEach((img, idx) => {
    // img.addEventListener("click", () => {
      player.show(stories[0].href);
      player.play();
      lightboxEl.classList.toggle("show");
    // });
  });
}


//Trigger that closes the player when event is called
player.addEventListener("amp-story-player-close", () => {
  player.pause();
  lightboxEl.classList.toggle("show");
});