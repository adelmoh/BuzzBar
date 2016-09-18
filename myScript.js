/**
 * Created by M on 9/17/2016.
 */

var pattern = /(([0-9])|([0-1][0-9])|([2][0-3])):(([0-9])|([0-5][0-9]))/;
var videoId = getParameterByName('videoId');
if (videoId == null) {
    videoId = "HxXbrnJ6l4A";
}

function loadAjax(pageToken) {
    $.ajax({
        async: "false",
        url: "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyBAcQUU5I4FElmsYVK0irkDPVGQ_OLLkO0&" +
        "textFormat=plainText&part=snippet&videoId=" + videoId + "&maxResults=100&pageToken=" + pageToken
    }).success(function (data) {
        storeCommentsList(data);
        nextPageToken = data.nextPageToken;
        console.log(nextPageToken);
        if (nextPageToken != null) {
            loadAjax(nextPageToken);
        }
    });
}

var storeCommentsList = function (data) {
    var commentsList = [];
    for (i = 0; i < data.items.length; i++) {
        var currentItem = data.items[i];
        var commentText = currentItem.snippet.topLevelComment.snippet.textDisplay;
        if (pattern.test(commentText)) {
            var startIndex = commentText.search(pattern);
            var stringThatHasTime = commentText.substr(startIndex);
            var comment = new Object();
            comment.id = currentItem.id;
            if (stringThatHasTime.search(':') == 2)
                comment.time = stringThatHasTime.substr(0, 5);
            else
                comment.time = stringThatHasTime.substr(0, 4);
            comment.textDisplay = currentItem.snippet.topLevelComment.snippet.textDisplay;
            comment.authorDisplayName = currentItem.snippet.topLevelComment.snippet.authorDisplayName;
            comment.authorProfileImageUrl = currentItem.snippet.topLevelComment.snippet.authorProfileImageUrl;
            comment.authorChannelUrl = currentItem.snippet.topLevelComment.snippet.authorChannelUrl;
            commentsList.push(comment);
        }
    }
    show_cmts(commentsList);
};

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var enterURL = function () {
    var videoUrl = $('#inputText').val();
    var videoId = videoUrl;
    if (videoUrl.toLowerCase().indexOf("youtube") >= 0){
        videoId = getParameterByName("v", videoUrl);
    }
    window.location.href = "player.html?videoId=" + videoId;
};