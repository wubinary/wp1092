
Image_Meta = function(title, url) {
    this.title = title;
    this.url = url;
}

image_arr = [
    new Image_Meta("ntu1","https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/11/01/realtime/8940961.jpg&x=0&y=0&sw=0&sh=0&sl=W&fw=800&exp=3600"),
    new Image_Meta("ntu2","https://doqvf81n9htmm.cloudfront.net/data/alicelee_126/201801/0123/204.jpg"),
    new Image_Meta("統神端火鍋","https://i.imgur.com/DrruDnK.gif"),
    new Image_Meta("meme1","https://memes.tw/meme/939eaba5f48aca2aecdd73fae7edccba.png"),
    new Image_Meta("黑人問號","https://memes.tw/user-gif-thumbnail/753146885b26eb66e334509e8c50b301.gif")
];

for (var i = image_arr.length - 1; i >= 0; i--) {
    console.log(image_arr[i].title);
}

// img title
img_title = document.getElementById('img_title');

// img display place
current_idx = 0;
display = document.getElementById('display');

// display source
display_source = document.getElementById('display_source');

// previous button
previous = document.getElementById("previous");
previous.onclick = function(){
    // change context
    if (current_idx > 0) {
        current_idx -= 1;
        img_title.innerHTML = image_arr[current_idx].title;
        display.src = image_arr[current_idx].url;
        display_source.href = image_arr[current_idx].url;
    }
    // disable button
    if (current_idx == 0) {
        previous.className = "disabled";
        next.className = "";
    } else {
        previous.className = "";
        next.className = "";
    }
}

// next button
next = document.getElementById("next");
next.onclick = function(){
    // change context
    if (current_idx < image_arr.length-1) {
        current_idx += 1;
        img_title.innerHTML = image_arr[current_idx].title;
        display.src = image_arr[current_idx].url;
        display_source.href = image_arr[current_idx].url;
    } 
    // disable button
    if (current_idx == image_arr.length-1) {
        previous.className = ""
        next.className = "disabled";
    } else {
        previous.className = "";
        next.className = "";
    }
}

// initial
img_title.innerHTML = image_arr[current_idx].title;
display_source.href = image_arr[current_idx].url;
display.src = './images/loading.gif';
setTimeout(function(){display.src = image_arr[current_idx].url;}, 1000)
previous.onclick();
