let bookmarks = new Bookmarks(); // from bookmarks.js

function showBookmarks() {
    let bookmarksList = bookmarks.retrieveBookmarks();
    bookmarksList.forEach((bookmark) => {
        addBookmarkInUI(bookmark.name, bookmark.url, bookmark.iconPath);
    })
}
showBookmarks();

function addBookmarkInUI(bookmarkNameValue, bookmarkURLValue, bookmarkIconPathValue) {
    let index;
    try {
        index = document.querySelectorAll(".link_tab_link").length - 1;
    } catch (err) {
        index = 0;
    }
    let bookmarkImgHtmlAndName = checkIconPathAndName(bookmarkIconPathValue, bookmarkNameValue);
    let bookmarkString = `<div class="link_tab_link bookmark">
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
    if (bookmarks.getLength() < 10) {
        addBookmarkBtn.classList.remove("hide");
    } else {
        addBookmarkBtn.classList.add("hide");
    }
}

function clickListenerForABookmark(index) {
    let bookmark = document.querySelectorAll(".link_tab_link")[index];
    let link_tab = bookmark.querySelector(".link_tab");
    link_tab.addEventListener("click", () => {
        search(link_tab.dataset.link);
    })

    // Delete Button Click Listener of The Bookmark
    let deleteBookmark = bookmark.querySelector(".delete_bm");
    deleteBookmark.addEventListener("click", () => {
        bookmarks.deleteBookmark(parseInt(deleteBookmark.dataset.index));
        bookmark.remove();
    })

    // Edit Button Click Listener of The Bookmark
    bookmark.querySelector(".edit_bm").addEventListener("click", () => {
        document.querySelector(".add_bookmark_con").classList.add("active");

        document.querySelector(".add_bookmark_name").value = bookmark.querySelector(".link_tab_para").title;
        document.querySelector(".add_bookmark_url").value = bookmark.querySelector(".links").dataset.link;
        let path = bookmark.querySelector(".link_tab_circle").innerHTML.length > 8 ? bookmark.querySelector(".link_tab_img").src : "";
        // Applying change in UI
        let style = path != "" ? `background: url("${path}"); background-size: cover; background-attachment: fixed; z-index: -1; border: 2px solid #000` : "";
        document.querySelector(`.bookmark_icon_preview.img_preview`).style.cssText = style;

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


document.querySelector(".del_bm_btn_con input").addEventListener("click", () => {
    try {
        bookmarks.clearAllBookmarks();

        //updating UI
        document.querySelectorAll(".bookmark").forEach((bookmark) => {
            bookmark.remove();
        });
    } catch (err) {

    }
})