//Applying Blur
function getBlurValueAndUpdateUI() {
    let blurValue = 5;
    if (settings.has("bg_img_blur")) {
        blurValue = settings.settings["bg_img_blur"];
    }
    document.documentElement.style.setProperty("--blur", `${blurValue}px`);
    let blurInput = document.querySelector(".bg_img_blur_input");
    blurInput.value = blurInput.title = blurValue;
}


//Applying Background Image
function getBGImageAndUpdateUI() {
    let bg = "none";
    if (settings.has("bg_img_path")) {
        bg = ` url("${settings.settings["bg_img_path"]}")`;
    }
    document.querySelector(".bg_img_con").style.cssText = `background:${bg}; background-size: cover;
        background-attachment: fixed;`;
}


//Applying Transparancy
function getTransparancyAndUpdateUI() {
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
    document.documentElement.style.setProperty("--back_clr", `rgba(${bgColorValue},${transparancyValue})`);
}