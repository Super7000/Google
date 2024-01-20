let settings = new Settings(); // from settings.js

// here are the list of properties that are present in the settings key (localStorage)
// - bg_img_blur
// - bg_img_path
// - transparancy

let bgCards = document.querySelectorAll(".bg");
bgCards.forEach((bgCard) => {
    bgCard.addEventListener('click', () => {
        let bgSrc = bgCard.src;
        settings.addSetting("bg_img_path", bgSrc);
        document.querySelector('.bg_img_con').style.cssText = `background: url(${bgSrc}); background-size: cover;
        background-attachment: fixed;`;
    })
})

document.querySelector(".blank_img").addEventListener("click", () => {
    if (settings.has("bg_img_path")) settings.deleteSetting("bg_img_path");
    else return;
    document.querySelector('.bg_img_con').style.cssText = `background: none;`;
})

function cus_toggle(a, b, event, active) {
    document.querySelector(a).addEventListener(event, function () {
        document.querySelector(b).classList.toggle(active);
    })
}
cus_toggle(".custom_btn", ".custom_tab", "click", "active");

document.querySelector(".bg_img_blur_input").addEventListener("change", function () {
    localStorage.setItem("bg_img_blur", this.value);
    start_up();
})

cus_toggle(".add_bm_btn", ".add_bookmark_con", "click", "active");
cus_toggle(".cancel_sortcut_btn", ".add_bookmark_con", "click", "active");

cus_toggle(".bg_img_add", ".add_bg_img_con", "click", "active");
cus_toggle(".cancel_bg_img_btn", ".add_bg_img_con", "click", "active");

cus_toggle(".sign_in", ".sign_in_con", "click", "active");
cus_toggle(".cancel_sign_in_btn", ".sign_in_con", "click", "active");

document.querySelector(".change_bg_img").addEventListener("click", function () {
    let bg = "none";
    let imgFile = document.querySelector(".bg_img_path_input").files[0];
    createImagePath(imgFile, (bg) => {
        settings.addSetting("bg_img_path", bg);

        document.querySelector(".bg_img_con").style.cssText = `background:${bg}; background-size: cover;
        background-attachment: fixed;`;
        document.querySelector(".add_bg_img_con").classList.toggle('active');
    });
})

function start_up() {
    let blurValue = 5;
    if (settings.has("bg_img_blur")) {
        blurValue = settings.settings["bg_img_blur"];
    }
    document.documentElement.style.setProperty("--blur", `${blurValue}px`);
    let blurInput = document.querySelector(".bg_img_blur_input");
    blurInput.value = blurInput.title = blurValue;

    let bg = "none";
    if (settings.has("bg_img_path")) {
        bg = ` url("${settings.settings["bg_img_path"]}")`;
    }
    document.querySelector(".bg_img_con").style.cssText = `background:${bg}; background-size: cover;
    background-attachment: fixed;`;

    let transparancyValue = 0.7;
    if (settings.has("transparancy")) {
        transparancyValue = settings.settings["transparancy"];
    }
    let bgColorValue = "255,255,255";
    if (settings.has("bg_color")) {
        bgColorValue = settings.settings["bg_color"];
    }
    let bgTransparancyInput = document.querySelector(".bg_transparancy_input");
    bgTransparancyInput.value = bgTransparancyInput.title = transparancyValue;
    document.documentElement.style.setProperty("--back_clr", `rgba(${bgColorValue},${transparancyValue})`)
}

window.addEventListener('onload', start_up());


// Changing UI transparancy values and storing transparancy values according to user input

document.querySelector(".bg_transparancy_input").addEventListener("change", function () {
    let transparancyValue = this.value;
    settings.addSetting("transparancy", transparancyValue);
    let bgColorValue = "255,255,255";
    if (settings.has("bg_color")) {
        bgColorValue = settings.settings["bg_color"];
    }
    document.documentElement.style.setProperty("--back_clr", `rgba(${bgColorValue},${transparancyValue})`);
    this.title = transparancyValue;
})

document.querySelector(".del_btn_con").addEventListener("click", () => {
    settings.deleteSettings();
    start_up();
})

document.querySelector(".del_bm_btn_con").addEventListener("click", () => {
    bookmarks.clearAllBookmarks();
    start_up();
})


function changeEventListener(imgInputClass, imgPreviewClass) {
    document.querySelector(`.${imgInputClass}`).addEventListener("change", () => {
        try {
            let imgFile = document.querySelector(`.${imgInputClass}`).files[0];
            createImagePath(imgFile, (path) => {
                // Applying change in UI
                document.querySelector(`.${imgPreviewClass}.img_preview`).style.cssText = `background: url("${path}"); background-size: cover; background-attachment: fixed; z-index: -1; border: 2px solid #000`;
            });
        } catch (error) {
    
        }
    })
}
changeEventListener("bg_img_path_input","bg_img_preview");
changeEventListener("bookmark_icon_input","bookmark_icon_preview");


document.querySelector(".cancel_bg_img_btn").addEventListener("click", () => {
    document.querySelector('.bg_img_preview.img_preview').style.cssText = "";
    document.querySelector(".bg_img_path_input").value = "";
})

document.querySelector(".cancel_sortcut_btn").addEventListener("click", () => {
    document.querySelector('.bookmark_icon_preview.img_preview').style.cssText = "";
    document.querySelector(".bookmark_icon_input").value = "";
})

document.querySelector(".add_bm_btn").addEventListener("click",()=>{
    document.querySelector(".add_bookmark_name").value = "";
    document.querySelector(".add_bookmark_url").value = "";
    document.querySelector(".bookmark_icon_input").value = "";
    document.querySelector(`.bookmark_icon_preview.img_preview`).style.cssText = "";

})


function createImagePath(imgFile, onloadFunc = (path) => { }) {
    let path = "noImg";
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e) => {
        path = e.target.result;
        onloadFunc(path);
    }
    return path;
}