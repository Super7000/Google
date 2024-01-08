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

function load_bookmarks() {
    var local = localStorage.getItem("bookmarks");
    var addst = `<a class="link_tab_link add_bm_btn">
        <div class="link_tab">
            <div class="link_tab_circle"><img class="link_tab_img" src="Icons/plus.png"></div>
            <p class="link_tab_para">Add</p>
        </div>
    </a>`;
    if (local != null || local == "") {
        var arr = JSON.parse(local);
        var css = "grid-template-columns: ";
        var div = document.querySelector(".bookmarks");
        var img, name;
        for (var i = 0; i < arr.length; i = i + 4) {
            if (arr[i + 3] == "") {
                img = `<p>${arr[i + 1][0].toUpperCase()}</p>`;
            } else {
                img = `<img class="link_tab_img" src="${arr[i + 3]}"></img>`;
            }
            if (arr[i + 1].length > 8) {
                name = arr[i + 1].slice(0, 8) + "..";
            } else {
                name = arr[i + 1];
            }
            var string = `<div class="link_tab_link">            
                <div class="edit_delete edit_bm" data-index="${i}"><img src="Icons/edit.png"></div>
                <div class="edit_delete delete_bm" data-index="${i}"><img src="Icons/delete.svg"></div>
                <div class="link_tab links" data-link="${arr[i + 2]}">
                    <div class="link_tab_circle">${img}</div>
                    <p class="link_tab_para" title="${arr[i + 1]}">${name}</p>
                </div>
            </div>`;
            div.innerHTML += string;
            if (i / 4 < 5) { css += " auto"; }
        }
        if (arr.length / 4 < 10) {
            div.innerHTML += addst;
        }
        if (arr.length / 4 < 5) { css += " auto"; }
        div.style.cssText = css;
    } else {
        var d = document.querySelector(".bookmarks")
        d.innerHTML += addst;
    }
}
load_bookmarks();
function redirect_links() {
    var links = document.querySelectorAll(".links");
    if (links == null || links == "") {

    } else {
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                var href = link.dataset.link;
                search(href);
            })
        })
    }
}
redirect_links();
function delete_bm() {
    document.querySelectorAll(".delete_bm").forEach(function (bm) {
        bm.addEventListener("click", function () {
            var index = parseInt(bm.dataset.index);
            var arr = JSON.parse(localStorage.getItem("bookmarks"));
            if (arr == null || arr == "") {
                alert("Unable to delete bookmark");
            } else {
                arr.splice(index, 4);
                for (var i = index; i < arr.length; i = i + 4) {
                    arr[i] = arr[i] - 1;
                }
                localStorage.setItem("bookmarks", JSON.stringify(arr));
                document.querySelector(".bookmarks").innerHTML = "";
            }
            reload_full_bm();
        })
    });
}
delete_bm();
function edit_link() {
    document.querySelectorAll(".edit_bm").forEach(function (bm) {
        bm.addEventListener("click", function () {
            var con = document.querySelector(".add_bookmark_con.active");
            if (con == null || con == "") {
                con = document.querySelector(".add_bookmark_con");
                con.classList.toggle("active");
            } else {

            }
            var index = parseInt(bm.dataset.index);
            var arr = JSON.parse(localStorage.getItem("bookmarks"));
            if (arr == null || arr == "") {
                alert("Unable to edit bookmark");
            } else {
                document.querySelector(".add_bookmark_name").value = arr[index + 1];
                document.querySelector(".add_bookmark_url").value = arr[index + 2];
                document.querySelector(".add_bookmark_img_path").value = arr[index + 3];
            }
            document.querySelector(".save_sortcut").dataset.click_func = `${index}`;
        })
    });
}
edit_link();
function reload_full_bm() {
    document.querySelector(".bookmarks").innerHTML = "";
    load_bookmarks();
    cus_toggle(".add_bm_btn", ".add_bookmark_con", "click", "active");
    add_bm_btn_func();
    delete_bm();
    redirect_links();
    edit_link();
}
cus_toggle(".add_bm_btn", ".add_bookmark_con", "click", "active");
cus_toggle(".cancel_sortcut_btn", ".add_bookmark_con", "click", "active");

cus_toggle(".bg_img_add", ".add_bg_img_con", "click", "active");
cus_toggle(".cancel_bg_img_btn", ".add_bg_img_con", "click", "active");

function add_bm_btn_func() {
    document.querySelector(".add_bm_btn").addEventListener("click", function () {
        document.querySelector(".save_sortcut").dataset.click_func = '';
    })
}
add_bm_btn_func();
document.querySelector(".save_sortcut").addEventListener("click", function () {
    save_bm_check(this.dataset.click_func);
})
function save_bookmarks(index) {
    var store_bm = localStorage.getItem("bookmarks");
    var arr_store_bm;
    var len;
    if (store_bm == "" || store_bm == null) {
        len = 0;
        arr_store_bm = [];
    } else {
        arr_store_bm = JSON.parse(store_bm);
        len = arr_store_bm.length;
    }
    if (index == "" || index == null) {
        var id;
        if (len / 4 == 10) {
            alert("Overflow");
            return 0;
        }
        if (len == 0) {
            id = len
        } else {
            id = arr_store_bm[len - 4] + 1;
        }
        arr_store_bm[len] = id;
    } else {
        len = parseInt(index);
    }
    arr_store_bm[++len] = document.querySelector(".add_bookmark_name").value.trim();
    arr_store_bm[++len] = document.querySelector(".add_bookmark_url").value.trim();
    arr_store_bm[++len] = document.querySelector(".add_bookmark_img_path").value.trim();
    var save_string = JSON.stringify(arr_store_bm);
    localStorage.setItem("bookmarks", save_string);
    document.querySelector(".add_bookmark_name").value = document.querySelector(".add_bookmark_url").value = document.querySelector(".add_bookmark_img_path").value = "";
}
function save_bm_check(index) {

    var name = document.querySelector(".add_bookmark_name").value.trim();
    var url = document.querySelector(".add_bookmark_url").value.trim();
    if (name == null || name == "") {
        return 0;
    }
    if (url == null || url == "") {
        return 0;
    }
    document.querySelector(".add_bookmark_con").classList.toggle('active');
    if (index == null || index == "") {
        save_bookmarks();
    } else {
        save_bookmarks(index);
    }
    reload_full_bm();
}
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
document.querySelector(".bg_transparancy_check").addEventListener("change", function () {
    localStorage.setItem("transparancy", this.value);
    var bg_clr = localStorage.getItem("bg_color");
    if (bg_clr == null || bg_clr == "") {
        bg_clr = "255,255,255";
    } else {

    }
    document.documentElement.style.setProperty("--back_clr", `rgba(${bg_clr},${this.value})`);
    document.querySelector(".bg_transparancy_check").title = this.value;
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
        document.querySelector(".bg_img_con").style.cssText = `background: url("${bg_img}");; background-size: cover;
        background-attachment: fixed;`;
    }
    var transparancy = localStorage.getItem("transparancy");
    var bg_clr = localStorage.getItem("bg_color");
    if (transparancy == null || transparancy == "") {
        transparancy = 0.7;
    } else {

    }
    if (bg_clr == null || bg_clr == "") {
        bg_clr = "255,255,255";
    } else {

    }
    document.querySelector(".bg_transparancy_check").value = transparancy;
    document.querySelector(".bg_transparancy_check").title = transparancy;
    document.documentElement.style.setProperty("--back_clr", `rgba(${bg_clr},${transparancy})`)
}
window.addEventListener('onload', start_up());


cus_toggle(".sign_in", ".sign_in_con", "click", "active");
cus_toggle(".cancel_sign_in_btn", ".sign_in_con", "click", "active");
