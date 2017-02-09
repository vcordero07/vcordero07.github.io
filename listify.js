console.clear();
const idContainer = document.querySelector('#test-div');
const q = "Interpol";

const qEndPoint = `https://api.spotify.com/v1/search?q=${encodeURI(q)}&type=artist`;

const artistIDPromise = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', qEndPoint, true);
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, true);

  function processRequest() {
    if (xhr.readyState === 4) {
      let response = JSON.parse(xhr.response);
      let artistsID = response.artists.items[0].id;
      resolve(artistsID);
    }

  }
})

artistIDPromise.then((artistID) => {
  return new Promise((resolve, reject) => {
    // console.log(artistID);
    const qEndPoint2 = `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=us`;

    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', qEndPoint2, true);
    xhr2.send();
    xhr2.addEventListener("readystatechange", processRequest, true);

    function processRequest() {
      if (xhr2.readyState === 4) {
        let response = JSON.parse(xhr2.response);
        let artistsTopTrack = response.tracks[0].name;
        resolve(artistsTopTrack)
      }
    }

  })

}).then((artistsTopTrack) => {
  console.log(artistsTopTrack);

})
