function search(link) {
    //validating link
    if (link == "" || link == null) return;
    var value = link.trim();
    if (value.length <= 0) return;

    //replacing url
    if (value.indexOf(' ') == -1 && value.indexOf('.') >= 0) {
        if (value.indexOf("http") == 0)
            window.location = value;
        else
            window.location = "http://" + value;
    } else {
        window.location = 'https://www.google.com/search?q=' + value;
    }
}