//*要素を生成する関数
const createElem = (parentSelect, elemName, className, content = "") => {
    const makeArea = document.querySelector(parentSelect);
    const newElem = document.createElement(elemName);
    newElem.classList.add(className);
    newElem.textContent = content;
    makeArea.appendChild(newElem);
    return newElem;
}
//!オープニングアニメーション
//*timelineの定義
const opening = gsap.timeline();

//*生成→アニメーション→削除のアニメーション
opening.add(() => {
    //要素を生成
    const cutLine = createElem(".aboutView", "span", "cut-line");
    const leftCurtain = createElem(".aboutView", "span", "aCurtain-left");
    const rightCurtain = createElem(".aboutView", "span", "aCurtain-right");
    const text = createElem(".aboutView", "span", "aOpening-text", "成りたいを叶える");
    const reservation = document.querySelector(".reservation");

    //文字出現
    gsap.to(text, {
        autoAlpha: 1,
        scale: 1.1,

        duration: 2,
        ease: "power4.out",
    })
    gsap.to(text, {
        autoAlpha: 0,
        onComplete: () => {
            text.remove();
        }
    }, "<+1.5")
    //ライン縦移動
    gsap.to(cutLine, {
        autoAlpha: 0,
        bottom: "10%",
        duration: 1.5,
        ease: "power4.out",
        onComplete: () => {
            cutLine.remove();
        }
    }, "<+0.5")
    //背景左へ
    gsap.to(leftCurtain, {
        xPercent: -100,
        onComplete: () => {
            leftCurtain.remove();
        }
    }, "<+.8")
    //背景右へ
    gsap.to(rightCurtain, {
        xPercent: 100,
        onComplete: () => {
            rightCurtain.remove();
            // document.querySelector(".aboutBody").style.overflowY = "visible";
        }
    }, "<")
    gsap.to(reservation, {
        autoAlpha: 1,
    }, "<")
})

//!動画のアニメーション

//*再生の関数
const videoPlay = () => {
    //現在のサイズによって格納を変更
    let mainVideo = document.querySelector(".video-first");
    ScrollTrigger.matchMedia({
        "(min-width:960px)": function () {
            mainVideo = document.querySelector(".video-second");
        }
    })

    mainVideo.play();
}

//*BGMの関数
const musicPlay = () => {
    let mainVideo = document.querySelector(".video-first");
    ScrollTrigger.matchMedia({
        "(min-width:960px)": function () {
            mainVideo = document.querySelector(".video-second");
        }
    })

    //on off切り替え
    mainVideo.muted = !mainVideo.muted;;
}

//*読み込み時3秒遅らせplay
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(videoPlay, 3000); // 3000ミリ秒 = 3秒
});


//0.3秒間の変化を検知するための変数
let timer;
let timer2;
//*幅が切り替わった際に動画をリセットして再生
window.addEventListener("resize", function () {
    this.clearTimeout(timer);
    this.clearTimeout(timer2);
    //0.3秒間受付がなかったら変更完了とみなす。
    timer = setTimeout(videoPlay, 300);
    timer2 = setTimeout(musicPlay, 300);

})

//*再生のon off切り替え
const musicBtn = document.querySelector(".video-button");
let checkOn = 0;
musicBtn.addEventListener("click", () => {
    musicPlay();
    checkOn += 1;
    if (checkOn == 1) {
        musicBtn.firstElementChild.setAttribute("src", "./img/others/icons/stop.png");
    }

    else if (checkOn == 2) {
        musicBtn.firstElementChild.setAttribute("src", "./img/others/icons/music.png");
        checkOn = 0;
    }
})

//!ヘッダーの表示非表示
const header = document.querySelector(".topHeader");
header.style.display = "none";
window.addEventListener("scroll", () => {
    if (window.scrollY >= window.innerHeight) {
        header.style.opacity = "1";
        header.style.display = "block";
    }
    else if (window.scrollY < window.innerHeight) {
        header.style.opacity = "0";
        header.style.display = "none";
    }
})

//!mainのアニメーション
//*タイトルのスライドアニメーション
ScrollTrigger.matchMedia({
    "(min-width:1280px)": function () {
        gsap.utils.toArray(".line-move").forEach(target => {
            const from = target.dataset.from || 50;
            const to = target.dataset.to || 0;
            gsap.fromTo(target, {
                xPercent: from,
                rotateX: 360,
                scale: 0.8,
                autoAlpha: 0,
            },
                {
                    xPercent: to,
                    rotateX: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: target,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: true,
                    },
                });
        });
    },

    "(max-width:1279px)": function () {
        gsap.utils.toArray(".line-move").forEach(target => {
            const from = target.dataset.from || 50;
            const to = target.dataset.to || 0;
            gsap.fromTo(target, {
                xPercent: from,
                rotateX: 360,
                scale: 0.8,
                autoAlpha: 0,
            },
                {
                    xPercent: to,
                    rotateX: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: target,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: "true"
                    },
                });
        });
    }
})

//*本文のスライドアニメーション
gsap.utils.toArray(".text-move").forEach(target => {

    gsap.fromTo(target, {
        yPercent: 150,
        autoAlpha: 0,
    },
        {
            yPercent: 0,
            autoAlpha: 1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: target,
                start: "-50% 120%",
                end: "top 70%",
                scrub: true,
            },
        });
});

//*pcの時だけoverviewごと動かす。
ScrollTrigger.matchMedia({
    "(min-width:1280px)": function () {
        gsap.utils.toArray(".move-overview").forEach(target => {
            gsap.fromTo(target, {
                translate: "0 0",
            },
                {
                    translate: "0 -35%",
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        toggleActions: "play none none reverse", // 上スクロールで戻る
                        trigger: target,
                        start: "top 80%",
                        end: "bottom 30%",
                    },
                });
        });
    }
})

//*画像のカーテンアニメーション
gsap.utils.toArray(".curtain-move").forEach(target => {
    gsap.to(target, {
        xPercent: 150,
        autoAlpha: 1,
        scrollTrigger: {
            trigger: target,
            start: "top 75%",
            end: "bottom center",
        }
    });
});

//*画像の移動アニメーション
gsap.utils.toArray(".move-img").forEach(target => {
    const xfrom = target.dataset.xfrom || 10;
    const xto = target.dataset.xto || -10;
    gsap.fromTo(target, {
        yPercent: xfrom,
        scale: 1.2,
    },
        {
            yPercent: xto,
            scale: 1.2,
            scrollTrigger: {
                toggleActions: "play none none reverse",
                trigger: target,
                // start: "top 75%",
                // end: "bottom center",
                scrub: "true",
            }
        });
});

//!グラフのアニメーション
//*円グラフ
const graph = document.querySelectorAll(".circle__item");
//円グラフ一つ目の値
gsap.fromTo(graph[0], {
    "stroke-dasharray": "0,100",
},
    {
        "stroke-dasharray": "65,100",
        scrollTrigger: {
            trigger: ".graph__wrap",
            start: "top center",
            end: "bottom top",
        }
    }
);
//円グラフ一つ目の値
gsap.fromTo(graph[1], {
    "stroke-dasharray": "0,100",
},
    {
        "stroke-dasharray": "35,65",
        scrollTrigger: {
            toggleActions: "play none none reverse",
            trigger: ".graph__wrap",
            start: "top center",
            end: "bottom top",
        }
    }
);

//*棒グラフ
gsap.utils.toArray(".text--curtain").forEach(target => {
    gsap.fromTo(target, {
        backgroundColor: "#fff",
    },
        {
            translateY: "100%",
            backgroundColor: "#fff",
            scrollTrigger: {
                toggleActions: "play none none reverse",
                trigger: target,
                start: "top 90%",
                end: "top 10%",

                duration: 1,
            }
        })
})


gsap.to(".rect__valueNum", {
    rotateX: 360,
    scrollTrigger: {
        toggleActions: "play none none reverse",
        trigger: ".rect__value",
        start: "top 90%",
        end: "top 10%",
    }
})