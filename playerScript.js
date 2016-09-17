/**
 * Created by M on 9/17/2016.
 */
    // 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var vid_Dur;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '80%',
        width: '100%',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    vid_Dur = event.target.getDuration();
    //alert(vid_Dur);
    play = true;
    load_cmts();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var play = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && play) {
        //setTimeout(stopVideo, 6000);
        //done = true;

    }
    //$("#slider").css("width", (100*event.target.getCurrentTime() / vid_Dur) + 0.7 + "%");
}
function stopVideo() {
    player.stopVideo();
}