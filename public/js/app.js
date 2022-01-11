console.log("aaaaa");

const pro = document.querySelector("#pro");
const profile = document.getElementById("profile");
const btns = document.querySelectorAll(".s1");
const close_settings = document.querySelector(".close");
const settings = document.querySelector(".settings")
const btn_show_settings = document.querySelector(".btn-show-settings")

pro.addEventListener("click", () => {
  console.log("something is going on");
  if (profile.classList.contains("hidden")) {
    profile.classList.remove("hidden");
  } else {
    profile.classList.add("hidden");
  }
});

Array.from(btns).forEach((item) => {
  item.addEventListener("click", () => {
    var selected = document.getElementsByClassName("active");
    selected[0].className = selected[0].className.replace(" active", "");
    item.className += " active";
    if (!account_li.classList.contains("active")) {
      account.classList.add("display-none");
    } else if (account_li.classList.contains("active")) {
      account.classList.remove("display-none");
    }
  });
});

btn_show_settings.addEventListener("click", () => {
  settings.classList.remove("hide")
})

// settings.addEventListener("click", () => {
//   settings.classList.add('hide');
// })

close_settings.addEventListener("click", () => {
  settings.classList.add("hide");
})