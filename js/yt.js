const videoUrl = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=8&playlistId=UUyedBWPI4nGnZ8JCwlF-NHQ&key=AIzaSyDuVIUNeq0DAmoJKwjE7HTFLkciA9waIfw";
const ytPrefix = "https://www.youtube.com/watch?v=";

const videoContainer = document.getElementById('videoList');

fetch(videoUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        const videoListContainer = document.getElementById('videoList');
        if (data.items) {
            data.items.forEach(el => {
                let thumbnailUrl = 'loading.gif'; // Placeholder for loading image
                if (el.snippet.thumbnails.maxres) {
                    thumbnailUrl = el.snippet.thumbnails.maxres.url;
                } else if (el.snippet.thumbnails.high) {
                    thumbnailUrl = el.snippet.thumbnails.high.url;
                } else if (el.snippet.thumbnails.medium) {
                    thumbnailUrl = el.snippet.thumbnails.medium.url;
                } else if (el.snippet.thumbnails.default) {
                    thumbnailUrl = el.snippet.thumbnails.default.url;
                }

                // Create video item
                const videoItem = document.createElement('a');
                videoItem.href = `${ytPrefix + el.snippet.resourceId.videoId}`;
                videoItem.target = '_blank';
                videoItem.rel = 'external';
                videoItem.classList.add('card');
                videoItem.innerHTML = `
                    <img src="${thumbnailUrl}" alt="thumbnail">
                    <h4 class="card-title">${el.snippet.title}</h4>`;
                // Append video item to the container
                videoListContainer.appendChild(videoItem);
            });
        } else {
            console.error('No videos found.');
        }
    })
    .catch(error => {
        console.error('Error fetching videos:', error);
    });
