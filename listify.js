console.clear();
const albumImgResult = document.querySelector('#results');

let addSomeMusic = (q) => {
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
      //console.log(qEndPoint2);
      const xhr2 = new XMLHttpRequest();
      xhr2.open('GET', qEndPoint2, true);
      xhr2.send();
      xhr2.addEventListener("readystatechange", processRequest, true);

      function processRequest() {
        if (xhr2.readyState === 4) {
          let response = JSON.parse(xhr2.response);
          //let artistsTopTrack = response.tracks[0].name;
          let artistsTopTrack = {
              trackName: response.tracks[0].name,
              artistID: response.tracks[0].album.artists[0].id,
              artistName: response.tracks[0].album.artists[0].name,
              albumName: response.tracks[0].album.name,
              albumImg: response.tracks[0].album.images[1].url,
              songPreview: response.tracks[0].preview_url,
            }
            //console.log("Info:");
            // console.log(response.tracks[0].name);
            // console.log(response.tracks[0].album.artists[0].id);
            //console.log(response.tracks[0].album.artists[0].name);
            //console.log(response.tracks[0].album.name);
            // console.log(response.tracks[0].album.images[1].url);
            //console.log();
            //console.log(qEndPoint2);
          resolve(artistsTopTrack)

        }
      }

    })

  }).then((artistsTopTrack) => {
    console.log(artistsTopTrack);
    albumImgResult.innerHTML += '<a href="' + artistsTopTrack.songPreview + '" target="_blank"><img src="' + artistsTopTrack.albumImg + '"></a>';
    //console.log(q);

  })
}

/*
api call to get playlistid
https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}
*/

document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  addSomeMusic(document.getElementById('query').value);

}, false);

var doAlert = (checkBoxResult) => {
  if (checkBoxResult === 'yes') {
    document.getElementById("checkNot").style.display = "none";
    document.getElementById('searchbarform').style.display = "block";
  } else if (checkBoxResult === "no") {
    document.getElementById("checkYest").style.display = "none";
  } else {
    document.getElementById("checkYest").style.display = "block";
    document.getElementById("checkNot").style.display = "block";
  }
}
