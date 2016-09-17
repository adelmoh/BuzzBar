/**
 * Created by M on 9/17/2016.
 */
$(document).ready(function() {

    var commentsList = [];
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyBAcQUU5I4FElmsYVK0irkDPVGQ_OLLkO0&" +
        "textFormat=plainText&part=snippet&videoId=M7lc1UVf-VE&maxResults=100"
    }).then(function(data) {
        for (i = 0; i < data.items.length; i++) {
            var currentItem = data.items[i];
            var comment = new Object();
            comment.textDisplay = currentItem.snippet.topLevelComment.snippet.textDisplay;
            comment.authorDisplayName = currentItem.snippet.topLevelComment.snippet.authorDisplayName;
            comment.authorProfileImageUrl = currentItem.snippet.topLevelComment.snippet.authorProfileImageUrl;
            comment.authorChannelUrl = currentItem.snippet.topLevelComment.snippet.authorChannelUrl;
            commentsList.push(comment);
        }

        var inHTML = "";

        $.each(commentsList, function(index, value){
            var newItem = "<tr><td>"+ value.authorDisplayName + "</td></tr>"
            inHTML += newItem;
        });

        $("table#dynamicTable").html(inHTML);
    });
});