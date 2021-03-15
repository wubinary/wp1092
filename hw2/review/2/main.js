const href = [
    "https://i.imgur.com/c74V6WV.jpg",
    "https://i.imgur.com/UXZIwc7.jpg",
    "https://i.imgur.com/p7drBNx.jpg",
    "https://i.imgur.com/FgNJLP4.jpg",
    "https://i.imgur.com/FB37mIi.jpg",
    "https://i.imgur.com/QVhWNWU.jpg",
    "https://i.imgur.com/xO3ITah.jpg",
    "https://i.imgur.com/cvAC9Wm.jpg",
    "https://i.imgur.com/jb8pAB6.jpg",
    "https://i.imgur.com/CyIMPqq.jpg",
    "https://i.imgur.com/pqBsv3d.jpg",
    "https://i.imgur.com/vnSDf5w.jpg",
    "https://i.imgur.com/ctfKmD9.jpg",
    "https://i.imgur.com/ADz0imf.jpg",
    "https://i.imgur.com/GwlKwAW.jpg",
    "https://i.imgur.com/fPg2jgu.jpg",
    "https://i.imgur.com/9H2LWCb.jpg",
    "https://i.imgur.com/pEGoxRa.jpg",
    "https://i.imgur.com/y1uNoWR.jpg",
    "https://i.imgur.com/V867wLG.jpg"
    ]
let i = 0;
function changePic(next) {
    //console.log(i)
    if (next === 1 && i < href.length - 1) {
        document.getElementById("display").src = href[++i]
    }
    else if (next === 0 && i > 0) {
        document.getElementById("display").src = href[--i]
    }
    resetBtn()
    resetLink()
    //console.log(i)
}
function resetBtn(){
    if (i !== 0) document.getElementById("previous").className = ""
    else document.getElementById("previous").className = "disabled"
    if (i !== href.length - 1) document.getElementById("next").className = ""
    else document.getElementById("next").className = "disabled"
}
function resetLink(){
    document.getElementById("linkRef").href = href[i];
    document.getElementById("linkRef").innerHTML = href[i]
}
window.onload = function(){
    document.getElementById("display").src = href[0]
    resetBtn()
    resetLink()
};