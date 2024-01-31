cus_toggle(".bg_img_add", ".add_bg_img_con", "click", "active");
cus_toggle(".cancel_bg_img_btn", ".add_bg_img_con", "click", "active");

changeEventListener("bg_img_path_input","bg_img_preview");

document.querySelector(".cancel_bg_img_btn").addEventListener("click", () => {
    document.querySelector('.bg_img_preview.img_preview').style.cssText = "";
    document.querySelector(".bg_img_path_input").value = "";
})

document.querySelector(".change_bg_img.btn").addEventListener("click", ()=>{
    let imgFile = document.querySelector(".bg_img_path_input");
    if (imgFile.files.length == 0) return;

    createImagePath(imgFile.files[0], (bg) => {
        settings.addSetting("bg_img_path", bg);

        document.querySelector(".bg_img_con").style.cssText = `background:${bg}; background-size: cover;
        background-attachment: fixed;`;
        document.querySelector(".add_bg_img_con").classList.toggle('active');
    });
})