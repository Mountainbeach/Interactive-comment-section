var jsonURL = "data.json";
var currentUsername = setCurrentUser(jsonURL);

async function setCurrentUser(url) {
    let response = await fetch(url);
    let data = await response.json();

    let userToReturn = data.currentUser.username;
    return userToReturn;
}

fetchComments(jsonURL);

async function fetchComments(url) {
    let response = await fetch(url);
    let data = await response.json();

    for (let i = 0; i < data.comments.length; i++) {
        displayComment(data.comments[i], data.currentUser);
    }
}

function displayComment(comment, currentUser) {
    // Creating the comment
    let container = document.createElement("div");
    container.classList.add("comment-tree-container");
    document.querySelector(".wrapper").appendChild(container);

    let new_comment = document.createElement("div");
    new_comment.classList.add("comment");
    container.appendChild(new_comment);

    // Creating header //
    //                 //
    let comment_header = document.createElement("div");
    comment_header.classList.add("comment-header");
    new_comment.appendChild(comment_header);
    // Creating image in header
    let comment_image = document.createElement("img");
    comment_image.src = comment.user.image.png;
    comment_header.appendChild(comment_image);
    // Creating username in header
    let comment_user_name = document.createElement("h2");
    comment_user_name.classList.add("comment-user-name");
    comment_user_name.innerHTML = comment.user.username;
    comment_header.appendChild(comment_user_name);

    // If current user create a "you" tag
    if (comment.user.username == currentUser.username) {
        let you_marker = document.createElement("p");
        you_marker.classList.add("you-marker");
        you_marker.innerHTML = "you";
        comment_header.appendChild(you_marker);
    }
    // Creating date //
    let comment_date = document.createElement("h2");
    comment_date.classList.add("comment-date");
    comment_date.innerHTML = comment.createdAt;
    comment_header.appendChild(comment_date);

    // Creating content //
    //                  //
    let comment_content = document.createElement("p");
    comment_content.innerHTML = comment.content;
    comment_content.classList.add("content");
    new_comment.appendChild(comment_content);

    // Creating rating div //
    //           downvoteupvote          //
    let rating_div = document.createElement("div");
    rating_div.classList.add("rating-div");
    new_comment.appendChild(rating_div);

    // Creating rating buttons
    let rating_container = document.createElement("div");
    rating_container.classList.add("rating-container");
    rating_div.appendChild(rating_container);

    let upvote_button = document.createElement("button");
    upvote_button.classList.add("upvote");
    upvote_button.setAttribute("onClick", "upVote(this)");
    upvote_button.setAttribute("aria-label", "Upvote comment");
    rating_container.appendChild(upvote_button);
    let upvote_image = document.createElement("img");
    upvote_image.src = "images/icon-plus.svg";
    upvote_button.appendChild(upvote_image);

    let rating = document.createElement("h3");
    rating.innerHTML = comment.score;
    rating_container.appendChild(rating);

    let downvote_button = document.createElement("button");
    downvote_button.classList.add("downvote");
    downvote_button.setAttribute("onClick", "downVote(this)");
    downvote_button.setAttribute("aria-label", "Downvote comment");
    rating_container.appendChild(downvote_button);
    let downvote_image = document.createElement("img");
    downvote_image.src = "images/icon-minus.svg";
    downvote_button.appendChild(downvote_image);

    // Creating div for buttons
    let buttons_div = document.createElement("div");
    buttons_div.classList.add("buttons-div");
    new_comment.appendChild(buttons_div);

    // Creating reply button
    if (comment.user.username != currentUser.username) {
        let reply_button = document.createElement("button");
        reply_button.classList.add("reply-button");
        reply_button.setAttribute("onClick", "replyToComment(this)");
        buttons_div.appendChild(reply_button);
        let reply_image = document.createElement("img");
        reply_image.src = "images/icon-reply.svg";
        reply_button.appendChild(reply_image);
        let reply_button_text = document.createElement("p");
        reply_button_text.innerHTML = "Reply";
        reply_button.appendChild(reply_button_text);
    } else {
        //Create delete and edit button
        let delete_button = document.createElement("button");
        delete_button.classList.add("delete-button");
        delete_button.setAttribute("onClick", "openDeleteWindow(this)");
        buttons_div.appendChild(delete_button);
        let delete_image = document.createElement("img");
        delete_image.src = "images/icon-delete.svg";
        delete_button.appendChild(delete_image);
        let delete_button_text = document.createElement("p");
        delete_button_text.innerHTML = "Delete";
        delete_button.appendChild(delete_button_text);

        let edit_button = document.createElement("button");
        edit_button.classList.add("edit-button");
        buttons_div.appendChild(edit_button);
        let edit_image = document.createElement("img");
        edit_image.src = "images/icon-edit.svg";
        edit_button.appendChild(edit_image);
        let edit_button_text = document.createElement("p");
        edit_button_text.innerHTML = "Edit";
        edit_button.appendChild(edit_button_text);
    }

    if (comment.replies.length) {
        let comment_replies = document.createElement("div");
        comment_replies.classList.add("replies");
        container.appendChild(comment_replies);
        for (let i = 0; i < comment.replies.length; i++) {
            createReplies(comment_replies, comment.replies[i], currentUser);
        }
    }
}

function createReplies(parent, reply, currentUser) {
    // Creating the comment
    let new_comment = document.createElement("div");
    new_comment.classList.add("comment");
    new_comment.classList.add("reply");
    parent.appendChild(new_comment);

    // Creating header //
    //                 //
    let comment_header = document.createElement("div");
    comment_header.classList.add("comment-header");
    new_comment.appendChild(comment_header);
    // Creating image in header
    let comment_image = document.createElement("img");
    comment_image.src = reply.user.image.png;
    comment_header.appendChild(comment_image);
    // Creating username in header
    let comment_user_name = document.createElement("h2");
    comment_user_name.classList.add("comment-user-name");
    comment_user_name.innerHTML = reply.user.username;
    comment_header.appendChild(comment_user_name);
    // If current user create a "you" tag
    if (typeof currentUser === "object") {
        var currentUsername = currentUser.username;
    } else {
        var currentUsername = currentUser;
    }

    if (reply.user.username == currentUsername) {
        let you_marker = document.createElement("p");
        you_marker.classList.add("you-marker");
        you_marker.innerHTML = "you";
        comment_header.appendChild(you_marker);
    }
    // Creating date
    let comment_date = document.createElement("h2");
    comment_date.classList.add("comment-date");
    comment_date.innerHTML = reply.createdAt;
    comment_header.appendChild(comment_date);

    // Creating content //
    //                  //

    let comment_content = document.createElement("p");
    comment_content.innerHTML =
        '<span class="reply-to">@' +
        reply.replyingTo +
        " </span>" +
        reply.content;
    comment_content.classList.add("content");
    new_comment.appendChild(comment_content);

    // Creating rating div //
    //                 //
    let rating_div = document.createElement("div");
    rating_div.classList.add("rating-div");
    new_comment.appendChild(rating_div);

    // Creating rating buttons
    let rating_container = document.createElement("div");
    rating_container.classList.add("rating-container");
    rating_div.appendChild(rating_container);

    let upvote_button = document.createElement("button");
    upvote_button.classList.add("upvote");
    upvote_button.setAttribute("onClick", "upVote(this)");
    upvote_button.setAttribute("aria-label", "Upvote comment");
    rating_container.appendChild(upvote_button);
    let upvote_image = document.createElement("img");
    upvote_image.src = "images/icon-plus.svg";
    upvote_button.appendChild(upvote_image);

    let rating = document.createElement("h3");
    rating.innerHTML = reply.score;
    rating_container.appendChild(rating);

    let downvote_button = document.createElement("button");
    downvote_button.classList.add("downvote");
    downvote_button.setAttribute("onClick", "downVote(this)");
    downvote_button.setAttribute("aria-label", "Downvote comment");
    rating_container.appendChild(downvote_button);
    let downvote_image = document.createElement("img");
    downvote_image.src = "images/icon-minus.svg";
    downvote_button.appendChild(downvote_image);

    //Creating buttons div

    let buttons_div = document.createElement("div");
    buttons_div.classList.add("buttons-div");
    new_comment.appendChild(buttons_div);

    // Creating reply button

    if (reply.user.username != currentUsername) {
        let reply_button = document.createElement("button");
        reply_button.classList.add("reply-button");
        reply_button.setAttribute("onClick", "replyToComment(this)");
        buttons_div.appendChild(reply_button);
        let reply_image = document.createElement("img");
        reply_image.src = "images/icon-reply.svg";
        reply_button.appendChild(reply_image);
        let reply_button_text = document.createElement("p");
        reply_button_text.innerHTML = "Reply";
        reply_button.appendChild(reply_button_text);
    } else {
        //Create delete and edit button
        let delete_button = document.createElement("button");
        delete_button.classList.add("delete-button");
        delete_button.setAttribute("onClick", "openDeleteWindow(this)");
        buttons_div.appendChild(delete_button);
        let delete_image = document.createElement("img");
        delete_image.src = "images/icon-delete.svg";
        delete_button.appendChild(delete_image);
        let delete_button_text = document.createElement("p");
        delete_button_text.innerHTML = "Delete";
        delete_button.appendChild(delete_button_text);

        let edit_button = document.createElement("button");
        edit_button.classList.add("edit-button");
        edit_button.setAttribute("onClick", "editComment(this)");
        buttons_div.appendChild(edit_button);
        let edit_image = document.createElement("img");
        edit_image.src = "images/icon-edit.svg";
        edit_button.appendChild(edit_image);
        let edit_button_text = document.createElement("p");
        edit_button_text.innerHTML = "Edit";
        edit_button.appendChild(edit_button_text);
    }
}

function openDeleteWindow(comment) {
    let lightbox = document.createElement("div");
    lightbox.classList.add("lightbox-delete");
    document.body.appendChild(lightbox);

    let delete_window = document.createElement("div");
    delete_window.classList.add("delete-window");
    lightbox.appendChild(delete_window);

    let delete_window_header = document.createElement("h2");
    delete_window_header.innerHTML = "Delete comment";
    delete_window.appendChild(delete_window_header);

    let delete_window_text = document.createElement("p");
    delete_window_text.innerHTML =
        "Are you sure you want to delete this comment? This will remove the comment and can't be undone.";
    delete_window.appendChild(delete_window_text);

    let window_buttons_container = document.createElement("div");
    window_buttons_container.classList.add("window-buttons-container");
    delete_window.appendChild(window_buttons_container);

    let cancel_button = document.createElement("button");
    cancel_button.classList.add("cancel-button");
    cancel_button.innerHTML = "NO, CANCEL";
    window_buttons_container.appendChild(cancel_button);

    cancel_button.addEventListener("click", () => {
        lightbox.remove();
    });

    let confirm_button = document.createElement("button");
    confirm_button.classList.add("confirm-button");
    confirm_button.innerHTML = "YES, DELETE";
    window_buttons_container.appendChild(confirm_button);

    confirm_button.addEventListener("click", () => {
        lightbox.remove();
        comment.parentElement.parentElement.remove();
    });
}

function replyToComment(x) {
    if (document.querySelector("textarea")) {
        return;
    }
    let comment = x.parentElement.parentElement;
    let replyToName = comment.querySelector(".comment-user-name").innerHTML;

    replyContainer = document.createElement("div");
    replyContainer.classList.add("comment");
    replyContainer.classList.add("new-reply");

    let replyInput = document.createElement("textarea");
    replyInput.classList.add("reply-input");
    replyInput.placeholder = "Add a comment...";
    replyContainer.appendChild(replyInput);

    let comment_image = document.createElement("img");

    // NEED TO FIX THIS IMAGE, THIS IS TEMPORARY!
    comment_image.src = "./images/avatars/image-juliusomo.png";
    replyContainer.appendChild(comment_image);

    let send_button = document.createElement("button");
    send_button.innerHTML = "SEND";
    send_button.classList.add("send-button");
    send_button.setAttribute(
        "onClick",
        "sendReply(this,'" + replyToName + "')"
    );
    replyContainer.appendChild(send_button);

    if (comment.parentNode.querySelector(".replies")) {
        comment.parentNode.appendChild(replyContainer);
    } else if (!comment.parentNode.querySelector(".replies")) {
        comment.parentNode.insertBefore(replyContainer, comment.nextSibling);
    }
    replyContainer.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function sendReply(x, replyToName) {
    let text = x.parentElement.parentElement.querySelector("textarea");

    if (x.parentNode.parentNode.parentNode.classList.contains("replies")) {
        var z = x.parentNode.parentNode.parentNode;
        while (z.classList.contains("replies")) {
            z = z.parentNode;
        }
    } else {
        var z = x.parentNode.parentNode.parentNode;
    }

    if (!z.querySelector(".replies")) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("replies");
        x.parentNode.parentNode.parentNode.appendChild(newDiv);
    }

    let reply = {
        id: null,
        content: text.value,
        createdAt: "1 second ago",
        score: 0,
        replyingTo: replyToName,
        user: {
            image: {
                png:
                    "./images/avatars/image-" +
                    (await currentUsername) +
                    ".png",
                webp:
                    "./images/avatars/image-" +
                    (await currentUsername) +
                    ".webp",
            },
            username: await currentUsername,
        },
    };

    createReplies(z.querySelector(".replies"), reply, await currentUsername);
    text.parentElement.remove();
}

function editComment(editButton) {
    //Stop user from editing multiple comments or posting comments at the same time
    if (document.querySelector("textarea")) {
        return;
    }

    let comment = editButton.parentNode.parentNode;
    let oldText = comment.querySelector(".content").innerHTML;
    let replyTo = comment.querySelector("span").outerHTML;

    comment.querySelector(".content").style.display = "none";
    editBox = document.createElement("textarea");
    editBox.classList.add("edit-input");
    comment.querySelector(".comment-header").after(editBox);

    editButton.setAttribute("onClick", "applyEdit(this,'" + replyTo + "')");
    editButton.querySelector("p").innerHTML = "Apply";

    editButton.parentElement
        .querySelector(".delete-button")
        .setAttribute("onClick", "undoEdit(this)");
    editButton.parentElement
        .querySelector(".delete-button")
        .querySelector("p").innerHTML = "Undo";
}

function applyEdit(editButton, replyTo) {
    editButton.setAttribute("onClick", "editComment(this)");
    editButton.querySelector("p").innerHTML = "Edit";

    editButton.parentElement
        .querySelector(".delete-button")
        .setAttribute("onClick", "openDeleteWindow(this)");
    editButton.parentElement
        .querySelector(".delete-button")
        .querySelector("p").innerHTML = "Delete";

    let comment = editButton.parentNode.parentNode;
    comment.querySelector(".content").innerHTML =
        replyTo + comment.querySelector("textarea").value;
    comment.querySelector(".content").style.display = null;

    comment.querySelector("textarea").remove();
}

function undoEdit(deleteButton, oldText) {
    deleteButton.setAttribute("onClick", "openDeleteWindow(this)");
    deleteButton.querySelector("p").innerHTML = "Delete";

    deleteButton.parentElement
        .querySelector(".edit-button")
        .setAttribute("onClick", "editComment(this)");
    deleteButton.parentElement
        .querySelector(".edit-button")
        .querySelector("p").innerHTML = "Edit";

    let comment = deleteButton.parentNode.parentNode;
    comment.querySelector("textarea").remove();

    comment.querySelector(".content").style.display = null;
}

function upVote(x) {
    let rating = x.parentElement.querySelector("h3");
    if (x.classList.contains("voted")) {
        rating.innerHTML--;
        x.classList.remove("voted");
        return;
    }
    if (
        x.parentElement.querySelector(".downvote").classList.contains("voted")
    ) {
        x.parentElement.querySelector(".downvote").classList.remove("voted");
        rating.innerHTML++;
        rating.innerHTML++;
        x.classList.add("voted");
        return;
    }
    rating.innerHTML++;
    x.classList.add("voted");
}

function downVote(x) {
    let rating = x.parentElement.querySelector("h3");
    if (x.classList.contains("voted")) {
        rating.innerHTML++;
        x.classList.remove("voted");
        return;
    }
    if (x.parentElement.querySelector(".upvote").classList.contains("voted")) {
        x.parentElement.querySelector(".upvote").classList.remove("voted");
        rating.innerHTML--;
        rating.innerHTML--;
        x.classList.add("voted");
        return;
    }
    rating.innerHTML--;
    x.classList.add("voted");
}
