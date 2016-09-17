/**
 * Created by M on 9/17/2016.
 */

var pattern = /(([0-9])|([0-1][0-9])|([2][0-3])):(([0-9])|([0-5][0-9]))/;
var commentsList = [];
var videoId = getParameterByName('videoId');
$(document).ready(function () {
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyBAcQUU5I4FElmsYVK0irkDPVGQ_OLLkO0&" +
        "textFormat=plainText&part=snippet&videoId="+videoId+"&maxResults=100"
    }).then(function (data) {

        storeCommentsList(data);
        var nextPageToken = data.nextPageToken;
        if(nextPageToken != null){
            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyBAcQUU5I4FElmsYVK0irkDPVGQ_OLLkO0&" +
                "textFormat=plainText&part=snippet&videoId="+videoId+"&maxResults=100&nextPageToken="+nextPageToken
            }).then(function (nextData) {
                storeCommentsList(nextData);
                nextPageToken = nextData.nextPageToken;
            });
        }
        var inHTML = "";

        $.each(commentsList, function (index, value) {
            var newItem = "<tr><td>" + value.authorDisplayName + "</td></tr>"
            inHTML += newItem;
        });

        $("table#dynamicTable").html(inHTML);
    });
});

var storeCommentsList = function(data) {
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
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}