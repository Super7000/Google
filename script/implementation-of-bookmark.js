import { Bookmarks } from "./bookmarks.js";
let bookmarks = new Bookmarks();

function showBookmarks() {
    let bookmarksList = bookmarks.retrieveBookmarks();
    bookmarksList.forEach((bookmark) => {
        addBookmarkInUI(bookmark.name, bookmark.url, bookmark.iconPath);
    })
}
showBookmarks();

document.querySelector(".save_sortcut").addEventListener("click", () => {
    saveBookmark();
})

function saveBookmark() {
    let bookmarkName = document.querySelector(".add_bookmark_name");
    let bookmarkURL = document.querySelector(".add_bookmark_url");
    let bookmarkIconPath = document.querySelector(".add_bookmark_img_path");

    let bookmarkNameValue = bookmarkName.value.trim();
    let bookmarkURLValue = bookmarkURL.value.trim();
    let bookmarkIconPathValue = bookmarkIconPath.value.trim();

    // Validating Inputs given by User
    if (bookmarkNameValue == null || bookmarkNameValue == "") return;
    if (bookmarkURLValue == null || bookmarkURLValue == "") return;

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
}

function addBookmarkInUI(bookmarkNameValue, bookmarkURLValue, bookmarkIconPathValue) {
    let index;
    try {
        index = document.querySelectorAll(".link_tab_link").length - 1;
    } catch (err) {
        index = 0;
    }
    let bookmarkImgHtmlAndName = checkIconPathAndName(bookmarkIconPathValue, bookmarkNameValue);
    let bookmarkString = `<div class="link_tab_link">            
                <div class="edit_delete edit_bm" data-index="${index}"><img src="Icons/edit.png"></div>
                <div class="edit_delete delete_bm" data-index="${index}"><img src="Icons/delete.svg"></div>
                <div class="link_tab links" data-link="${bookmarkURLValue}">
                    <div class="link_tab_circle">${bookmarkImgHtmlAndName.imgHTML}</div>
                    <p class="link_tab_para" title="${bookmarkNameValue}">${bookmarkImgHtmlAndName.name}</p>
                </div>
            </div>`;
    let addBookmarkBtn = document.querySelector(".add_bm_btn");
    addBookmarkBtn.insertAdjacentHTML("beforebegin", bookmarkString);
    let noOfBookmarks = bookmarks.getLength();
    let repeatCount = 5;
    if (noOfBookmarks < 5) {
        repeatCount = (noOfBookmarks % 5) + 1;
    }
    document.querySelector(".bookmarks").style.cssText = `grid-template-columns: repeat(${repeatCount},auto);`
    clickListenerForABookmark(index);
    if(bookmarks.getLength() < 10) {
        document.querySelector(".add_bm_btn").classList.remove("hide");
    } else {
        document.querySelector(".add_bm_btn").classList.add("hide");
    }
}

function clickListenerForABookmark(index) {
    let bookmark = document.querySelectorAll(".link_tab_link")[index];
    bookmark.addEventListener("click", () => {
        search(bookmark.querySelector(".links").dataset.link);
    })

    // Delete Button Click Listener of The Bookmark
    bookmark.querySelector(".delete_bm").addEventListener("click", () => {
        bookmarks.deleteBookmark(parseInt(this.dataset.index));
        bookmark.remove();
    })

    // Edit Button Click Listener of The Bookmark
    bookmark.querySelector(".edit_bm").addEventListener("click", () => {
        document.querySelector(".add_bookmark_con").classList.add("active");

        document.querySelector(".add_bookmark_name").value = bookmark.querySelector(".link_tab_para").title;
        document.querySelector(".add_bookmark_url").value = bookmark.querySelector(".links").dataset.link;
        document.querySelector(".add_bookmark_img_path").value = bookmark.querySelector(".link_tab_circle").innerHTML.length > 1 ? "" : bookmark.querySelector(".link_tab_img").src;
    })
}

function updateBookmarkValuesInUI(index, bookmarkNameValue, bookmarkURLValue, bookmarkIconPathValue) {
    let bookmarkImgHtmlAndName = checkIconPathAndName(bookmarkIconPathValue, bookmarkNameValue);
    let editBookmark = document.querySelectorAll(".link_tab_link")[index];
    editBookmark.querySelector(".link_tab_circle").innerHTML = bookmarkImgHtmlAndName.imgHTML;
    editBookmark.querySelector(".links").dataset.link = bookmarkURLValue;
    let bookmarkNameContainer = editBookmark.querySelector(".link_tab_para");
    bookmarkNameContainer.title = bookmarkNameValue;
    bookmarkNameContainer.innerHTML = bookmarkImgHtmlAndName.name;
}

function checkIconPathAndName(bookmarkIconPathValue, bookmarkNameValue) {
    let imgHTML, name;
    if (bookmarkIconPathValue == "") {
        imgHTML = `<p>${bookmarkNameValue[0].toUpperCase()}</p>`;
    } else {
        imgHTML = `<img class="link_tab_img" src="${bookmarkIconPathValue}"></img>`;
    }

    if (bookmarkNameValue.length > 8) {
        name = bookmarkNameValue.slice(0, 8) + "..";
    } else {
        name = bookmarkNameValue;
    }
    return { imgHTML: imgHTML, name: name };
}