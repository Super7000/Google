let settings = new Settings();

// here are the list of properties that are present in the settings key (localStorage)
// - bg_img_blur
// - bg_img_path
// - transparancy

var bg = document.querySelectorAll(".bg");
bg.forEach(function (b) {
    b.addEventListener('click', function () {
        let bgSrc = this.src;
        settings.addSetting("bg_img_path", bgSrc);
        document.querySelector('.bg_img_con').style.cssText = `background: url(${bgSrc}); background-size: cover;
        background-attachment: fixed;`;
    })
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
    let imgFile = document.querySelector(".bg_img_path").files[0];

    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e)=>{
        let path = e.target.result;
        settings.addSetting("bg_img_path", path);
        
        // Applying BG in UI
        document.querySelector('.bg_img_con').style.cssText = `background: url("${path}"); background-size: cover;
            background-attachment: fixed;`;
        document.querySelector(".add_bg_img_con").classList.toggle('active');
    }
})

function start_up() {
    let blurValue = 5;
    if (settings.has("bg_img_blur")) {
        blurValue = settings.settings["bg_img_blur"];
    }
    document.documentElement.style.setProperty("--blur", `${blurValue}px`);
    let blurInput = document.querySelector(".bg_img_blur_input");
    blurInput.value = blurInput.title = blurValue;

    if (settings.has("bg_img_path")) {
        document.querySelector(".bg_img_con").style.cssText = `background: url("${settings.settings["bg_img_path"]}"); background-size: cover;
        background-attachment: fixed;`;
    }

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
    settings.addSetting("transparancy",transparancyValue);
    let bgColorValue = "255,255,255";
    if (settings.has("bg_color")) {
        bgColorValue = settings.settings["bg_color"];
    }
    document.documentElement.style.setProperty("--back_clr", `rgba(${bgColorValue},${transparancyValue})`);
    this.title = transparancyValue;
})