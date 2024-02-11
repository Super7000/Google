let settings = new Settings(); // from settings.js

// here are the list of properties that are present in the settings key (localStorage)
// - bg_img_blur
// - bg_img_path
// - transparancy

cus_toggle(".custom_btn", ".custom_tab", "click", "active");

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

document.querySelector(".bg_img_blur_input").addEventListener("change", function () {
    settings.addSetting("bg_img_blur", this.value);
    getBlurValueAndUpdateUI();
})

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

document.querySelector(".del_btn_con input").addEventListener("click", () => {
    settings.deleteSettings();
    start_up();
})