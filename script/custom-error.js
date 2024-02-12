function showErrorBox(errMsg, color = "255, 203, 130", timeout = 3000) {
    document.querySelector(".errorBox").classList.add("active");
    document.querySelector(".errorBox .errorMsg").innerHTML = errMsg;
    document.querySelector(".errorBox").style.cssText = `background: rgb(${color});`;

    setTimeout(() => {
        if (document.querySelector(".errorBox.active") != null) {
            document.querySelector(".errorBox").classList.remove("active");
        };
    }, timeout);
}

document.querySelector(".close_err_btn.cross").addEventListener("click", () => {
    document.querySelector(".errorBox").classList.remove("active");
})