$comments = [{
    time: "1:20",
    authorDisplayName: "user1",
    authorProfileImageUrl: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=10",
    authorChannelUrl: "http://www.youtube.com/channel/UCqDi1QGD-rJD-3uolZZYyFw",
    textDisplay: "good moment!"
}, {
    time: "1:50",
    authorDisplayName: "user1",
    authorProfileImageUrl: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=10",
    authorChannelUrl: "http://www.youtube.com/channel/UCqDi1QGD-rJD-3uolZZYyFw",
    textDisplay: "good moment!"
}];

$comments.each(function (idx, cmt) {
    $comment = $(cmt);
    minutes = parseInt($comment['time'].split(":")[0], 10);
    seconds = parseInt($comment['time'].split(":")[1], 10);
    alert(minutes * 60 + seconds);
    // and the rest of your code
});
