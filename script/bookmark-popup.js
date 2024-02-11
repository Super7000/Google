cus_toggle(".add_bm_btn", ".add_bookmark_con", "click", "active", clearBookmarkPopUPInputFields);
cus_toggle(".cancel_sortcut_btn", ".add_bookmark_con", "click", "active");

changeEventListenerForImagePreview("bookmark_icon_input", "bookmark_icon_preview");

function clearBookmarkPopUPInputFields() {
    document.querySelector(".add_bookmark_name").value = "";
    document.querySelector(".add_bookmark_url").value = "";
    document.querySelector(".bookmark_icon_input").value = "";
    document.querySelector('.bookmark_icon_preview.img_preview').style.cssText = "";
}

document.querySelector(".save_sortcut").addEventListener("click", () => {
    saveBookmark();
})

function saveBookmark() {
    let bookmarkName = document.querySelector(".add_bookmark_name");
    let bookmarkURL = document.querySelector(".add_bookmark_url");
    let bookmarkIconPath = document.querySelector(".bookmark_icon_input");

    let bookmarkNameValue = bookmarkName.value.trim();
    let bookmarkURLValue = bookmarkURL.value.trim();

    // Validating Inputs given by User
    if (bookmarkNameValue == null || bookmarkNameValue == "") return;
    if (bookmarkURLValue == null || bookmarkURLValue == "") return;

    if (bookmarkIconPath.files.length != 0)
        createImagePath(bookmarkIconPath.files[0], (bookmarkIconPathValue) => { 
            // I am using this lamda function because bookmarkIconPathValue is getting used by next code before it's value get updated 

            // Updating Bookmarks
            // If the bookmark is found based on URL it will re-write the existing value (else path) and if not found it will add a new bookmark
            let index = bookmarks.findByURL(bookmarkURLValue);
            if (index == -1) {
                if (bookmarks.getLength() < 10) {
                    bookmarks.addBookmark(bookmarkNameValue, bookmarkURLValue, bookmarkIconPathValue);
                    addBookmarkInUI(bookmarkNameValue, bookmarkURLValue, bookmarkIconPathValue); // UI logic
                }
            } else {
                bookmarks.editBookmark(index, bookmarkNameValue, bookmarkURLValue, bookmarkIconPathValue);
                updateBookmarkValuesInUI(index, bookmarkNameValue, bookmarkURLValue, bookmarkIconPathValue); // UI logic
            }


            // UI logics
            // Closeing Bookmark Popup
            document.querySelector(".add_bookmark_con").classList.toggle('active');
        });
}