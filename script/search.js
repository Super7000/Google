function search(link) {
    if (link == "" || link == null) return;

    var value = link.trim().toLowerCase();

    if (value.length <= 0) return;

    if (value.indexOf('http:') == 0 || value.indexOf('https:') == 0 || value.indexOf('file:') == 0) {
        window.location.href = value;
    } else {
        window.location = 'https://www.google.com/search?q=' + link.trim();
    }
}