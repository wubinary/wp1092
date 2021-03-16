// comment input
comment_input = document.getElementById("comment-input");
comment_input.onclick = function(){
    comment_button.style.display = "block";
    cancel_button.style.display = "block";
}

// comment button
comment_button = document.getElementById("comment-button");
comment_button.change_background = function(){
    if (comment_input.value==""){
        comment_button.style.backgroundColor = "#cccccc";
        comment_button.disabled = true;
    } else {
        comment_button.style.backgroundColor = "#065fd4";
        comment_button.disabled = false;
    }
    setTimeout(comment_button.change_background, 100);
}

comment_button.change_background();

comment_button.onclick = function(){
    comment_input_value = comment_input.value.trim();
    str = `
     <div class="comment">
                        <img class="comment-img" src="images/user-icon.jpg"/>
                        <div class="comment-right">
                            <div>
                                <span class="comment-name">Toby Chen</span>
                                <span class="comment-time">現在</span>
                            </div>
                            <p class="comment-text">${comment_input_value}</p>
                        </div>
                    </div>
     `    
     comment_group.innerHTML = comment_group.innerHTML+str;           
    comment_input.value = "";
    comment_button.style.backgroundColor = "#cccccc";
    comment_count += 1;
    comment_num.innerHTML = comment_count+"則留言";
    console.log(comment_num.innerHTML);
}

// cancel button 
cancel_button = document.getElementById("cancel-button");

cancel_button.onclick = function(){
    comment_input.value = "";
    comment_button.style.display = "none";
    cancel_button.style.display = "none";
}

// comment group
comment_group = document.getElementById("comment-group");

// comment number
comment_count = 1;
comment_num = document.getElementById("comment-num");