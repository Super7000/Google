// here are the list of properties that are present in the settings key (localStorage)
// - bg_img_blur
// - bg_img_path
// - transparancy

function start_up() {
    getBlurValueAndUpdateUI();
    getTransparancyAndUpdateUI();
    getBGImageAndUpdateUI();
}

window.addEventListener('onload', start_up());

window.onload = () => {
    document.querySelector(".loaderContainer").classList.remove("active");
}