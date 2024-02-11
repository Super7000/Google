function cus_toggle(a, b, event, active, func = () => { }) {
    document.querySelector(a).addEventListener(event, function () {
        document.querySelector(b).classList.toggle(active);
        func();
    })
}

function createImagePath(imgFile, onloadFunc = (path) => { }) {
    alert("ssss")
    let path = "none";
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e) => {
        path = e.target.result;
        alert(path)
        onloadFunc(path);
    }
    return path;
}

function changeEventListenerForImagePreview(imgInputClass, imgPreviewClass) {
    document.querySelector(`.${imgInputClass}`).addEventListener("change", () => {
        try {
            let imgFile = document.querySelector(`.${imgInputClass}`).files[0];
            createImagePath(imgFile, () => {
                // Applying change in UI
                document.querySelector(`.${imgPreviewClass}.img_preview`).style.cssText = `background: url("${path}"); background-size: cover; background-attachment: fixed; z-index: -1; border: 2px solid #000`;
            });

        } catch (error) {

        }
    })
}