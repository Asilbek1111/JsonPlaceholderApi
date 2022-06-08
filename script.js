"use strict";

function Fdata(posts) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${uId}`)
    .then((response) => response.json())
    .then(data);
}

var wrapper = document.querySelector("#wrapper");
function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      const htmlNames = data
        .map((user) => {
          return (
            `<div class="box"><h3 data-id=${user.id} class="heading">Name:${user.name}</h3>` +
            `<p>Username: ${user.username}</p>` +
            `<p>City: ${user.address.city}</p>` +
            `<p>Email: ${user.email}</p></div>`
          );
        })
        .join("");
      wrapper.insertAdjacentHTML("afterbegin", htmlNames);
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchData();

var postsHtml = document.querySelector(".posts");
function RenderHtml(posts) {
  const HtmlPosts = posts
    .map((user) => {
      return (
        `<div class = "box"><h3 data-id=${user.id} class="heading">Title: ${user.title}</h3>` +
        `<p>Body: ${user.body}</p></div>`
      );
    })
    .join("");
  postsHtml.insertAdjacentHTML("afterbegin", HtmlPosts);
}
var CommentsHtml = document.querySelector(".comments");

function RenderComments(comment) {
  console.log(comment);
  const HtmlComments = comment
    .map((user) => {
      return (
        `<div class ="box"><h3 class="heading">Name: ${user.name}</h3>` +
        `<p>Body: ${user.body}</p></div>`
      );
    })
    .join("");
  CommentsHtml.insertAdjacentHTML("afterbegin", HtmlComments);
}

wrapper.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${e.target.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => RenderHtml(data));
    postsHtml.innerHTML = "";
  }
});

postsHtml.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${e.target.dataset.id}/comments`
    )
      .then((res) => res.json())
      .then((data) => RenderComments(data));
    CommentsHtml.innerHTML = "";
  }
});
