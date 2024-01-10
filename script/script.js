var bg = document.querySelectorAll(".bg");
bg.forEach(function (b) {
    b.addEventListener('click', function () {
        localStorage.setItem("bg_img", this.src);
        document.querySelector('.bg_img_con').style.cssText = `background: url(${this.src}); background-size: cover;
        background-attachment: fixed;`;
    })
})

function cus_toggle(a, b, event, active) {
    document.querySelector(a).addEventListener(event, function () {
        document.querySelector(b).classList.toggle(active);
    })
}
cus_toggle(".custom_btn", ".custom_tab", "click", "active");

document.querySelector(".bg_img_blur_check").addEventListener("change", function () {
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
    var path = document.querySelector(".bg_img_path").value.trim();
    if (path == null || path == "") {

    } else {

        if (path[0] == "\'" || path[0] == "\"") {
            path = path.slice(1, -1);
        }
        path = path.replace(/\\/g, "/");
        localStorage.setItem("bg_img", path);
        document.querySelector('.bg_img_con').style.cssText = `background: url("${path}"); background-size: cover;
        background-attachment: fixed;`;
        document.querySelector(".add_bg_img_con").classList.toggle('active');
    }
})
function start_up() {
    var blur = localStorage.getItem("bg_img_blur");
    if (blur == "" || blur == null) {
        blur = 5;
    }
    document.documentElement.style.setProperty("--blur", `${blur}px`);
    var a = document.querySelector(".bg_img_blur_check");
    a.value = blur;
    a.title = blur;
    var bg_img = localStorage.getItem("bg_img");
    if (bg_img == "" || bg_img == null) {

    } else {
        document.querySelector(".bg_img_con").style.cssText = `background: url("${bg_img}"); background-size: cover;
        background-attachment: fixed;`;
    }
    var transparancy = localStorage.getItem("transparancy");
    var bg_clr = localStorage.getItem("bg_color");
    if (transparancy == null || transparancy == "") {
        transparancy = 0.7;
    }
    if (bg_clr == null || bg_clr == "") {
        bg_clr = "255,255,255";
    }
    document.querySelector(".bg_transparancy_check").value = transparancy;
    document.querySelector(".bg_transparancy_check").title = transparancy;
    document.documentElement.style.setProperty("--back_clr", `rgba(${bg_clr},${transparancy})`)
}
window.addEventListener('onload', start_up());

// Changing UI transparancy values and storing transparancy values according to user input

document.querySelector(".bg_transparancy_check").addEventListener("change", function () {
    localStorage.setItem("transparancy", this.value);
    var bg_clr = localStorage.getItem("bg_color");
    if (bg_clr == null || bg_clr == "") {
        bg_clr = "255,255,255";
    }
    document.documentElement.style.setProperty("--back_clr", `rgba(${bg_clr},${this.value})`);
    document.querySelector(".bg_transparancy_check").title = this.value;
})