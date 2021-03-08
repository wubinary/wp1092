// player
var player = document.getElementsByTagName('audio')[0];
player.style.display = "none";
var player_source = document.getElementsByTagName('source');
player_source[0].src = './assets/audios/阿拉斯加海灣-菲道爾.ogg';
player_source[1].src = './assets/audios/阿拉斯加海灣-菲道爾.mp3';

// music progress
var music_progress_control_bar = document.getElementById('music-progress-control-bar');
player.addEventListener("timeupdate", function() {
    var currentTime = player.currentTime;
    var duration = player.duration;
    if (! (document.activeElement === music_progress_control_bar)) {
        var width = (currentTime / duration * 100);
        music_progress_control_bar.value = width;
    }
});
music_progress_control_bar.onchange = function() {
    var duration = player.duration;
    var toTime = music_progress_control_bar.value * duration / 100;
    player.currentTime = toTime;
}

// volume control
with_vol = true;
current_vol = 50;
var vol = document.getElementById("vol");
vol.onclick = function() {
    if (with_vol) {
        with_vol = false;
        player.volume = 0;
        current_vol = document.getElementById("volume").value;
        document.getElementById("volume").value = 0;
        document.getElementById("with_vol").style.display = "none";
        document.getElementById("without_vol").style.display = "block";
    } else {
        with_vol = true;
        player.volume = current_vol / 100;
        document.getElementById("volume").value = current_vol;
        document.getElementById("with_vol").style.display = "block";
        document.getElementById("without_vol").style.display = "none";
    }
}

var volume_slider = document.getElementById("volume");
volume_slider.oninput = function() {
    player.volume = this.value / 100;
}

// control start/pause
var play_button = document.getElementById('play_button');
var pause_button = document.getElementById('pause_button');
pause_button.style.display = "none";

play_button.onclick = function() {
    play_button.style.display = "none";
    pause_button.style.display = "block";
    player.play();
}
pause_button.onclick = function() {
    play_button.style.display = "block";
    pause_button.style.display = "none";
    player.pause();
}

var backward_button = document.getElementById('backward_button');
var forward_button = document.getElementById('forward_button');
var fast_backward_button = document.getElementById('fast_backward_button');
var fast_forward_button = document.getElementById('fast_forward_button');
backward_button.onclick = function() {
    player.currentTime -= 5;
}
forward_button.onclick = function() {
    player.currentTime += 5;
}
fast_backward_button.onclick = function() {
    player.currentTime -= 15;
}
fast_forward_button.onclick = function() {
    player.currentTime += 15;
}