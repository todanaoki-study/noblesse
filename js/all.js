//グローバルnavのハンバーガーメニューのアニメーション
const hamburger = document.getElementsByClassName("hamburger");
const spans = document.querySelectorAll(".hamburger span");
const slider = document.getElementsByClassName("slider");
hamburger[0].addEventListener("click", function () {
    console.log("通っている");
    //メニューを３本から✖️印に
    spans[0].classList.toggle("span-first");
    spans[1].classList.toggle("span-second");
    spans[2].classList.toggle("span-third");

    //メニューを出現させる
    slider[0].classList.toggle("open-slider");
})

let waveColor = "#D75C95"
document.querySelector(".reservation").addEventListener("mouseover", () => {
    waveColor = "#3578BC"
})

$('.wave--move').wavify({
    height: 0,
    bones: 8,
    amplitude: 12,
    color: waveColor,
    speed: .35,
});
