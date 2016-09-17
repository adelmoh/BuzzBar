function show_cmts(comments) {
    //comments = [{
    //    id: 1,
    //    time: "2:20",
    //    authorDisplayName: "user1",
    //    authorProfileImageUrl: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=28",
    //    authorChannelUrl: "http://www.youtube.com/channel/UCqDi1QGD-rJD-3uolZZYyFw",
    //    textDisplay: "look at this moment!"
    //}, {
    //    id: 2,
    //    time: "1:50",
    //    authorDisplayName: "user1",
    //    authorProfileImageUrl: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=28",
    //    authorChannelUrl: "http://www.youtube.ercom/channel/UCqDi1QGD-rJD-3uolZZYyFw",
    //    textDisplay: "good moment!"
    //}];
    var arrayLength = comments.length;
    for (var i = 0; i < arrayLength; i++) {
        comment = comments[i];
        minutes = parseInt(comment['time'].split(":")[0], 10);
        seconds = parseInt(comment['time'].split(":")[1], 10);
        commSec = minutes * 60 + seconds;
        loc = Math.floor($(window).width() * commSec / vid_Dur);
        $('<a target="_blank"><div id="cmt_' + comment['id'] + '" class="cmtLoc" style="left: ' + loc + 'px"></div></a>').insertAfter("#slider");
        $("#cmt_" + comment['id']).css("background-image", 'url("' + comment['authorProfileImageUrl'].replace("sz=50","sz=28") + '")');
        //$("#cmt_" + comment['id']).parent().attr("href", comment['authorChannelUrl']);
        $("#cmt_" + comment['id']).qtip({
            content: {
                text: comment['authorDisplayName'] + ": " + comment['textDisplay']
            },
            position: {
                my: 'center left',
                at: 'bottom right',
                target: 'event',
                adjust: {x:0, y:10}
            },
            style: {
                classes: 'qtip-dark qtip-shadow qtip-rounded myblue'
            }
        });

    }
}
window.setInterval(function () {
    timeloc = 0;
    if (player.getCurrentTime() > 0) {
        timeloc = (100 * player.getCurrentTime() / vid_Dur) + 0.3
    }
    $("#slider").css("width", timeloc + "%");
}, 100);
