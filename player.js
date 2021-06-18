const lightboxEl = document.querySelector(".lightbox");
const player = document.body.querySelector("amp-story-player");

// To be remplaced with prod values
const apiEndpoint = 'https://api.zmoozy.com/portal/stories?filter%5Blimit%5D=2&filter%5Boffset%5D=0&filter%5Border%5D%5B0%5D=lastPublishedAt%20desc&filter%5Bwhere%5D%5BchannelId%5D=873&filter%5Bwhere%5D%5BaccessType%5D=1&filter%5Bwhere%5D%5BchannelStructure%5D=1';

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
          // Pushes the stories to the player
          add_stories_to_player(element.ampLink)
        });
        openPlayer();
    });
}

// The function takes the amp link as parameter and pushes it to the player ex : "domain + /stories/DIY-20-oeufs-de-Paques-originaux-a-faire-avec-les-enfants-VDZg"
function add_stories_to_player(link) {
  player.add([{href: domain + link}]);
}


// Function adding the onClick event to each "entry-point-card-container" element
function openPlayer() {
    const stories = player.getStories();
    
    console.log(stories.length)
    player.show(stories[0].href);
    player.play();
    console.log(player.length);
    lightboxEl.classList.toggle("show");
}