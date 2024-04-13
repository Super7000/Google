const searchBox = document.querySelector("input.search#search")
searchBox.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        search(searchBox.value);
        searchBox.value = '';
    }
})

const searchIcon = document.querySelector("img.search_icon#search_icon")
searchIcon.addEventListener('click', () => {
    search(searchBox.value)
})