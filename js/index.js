//*要素を生成する関数
const createElem = (parentSelect, elemName, className, content = "") => {
    const makeArea = document.querySelector(parentSelect);
    const newElem = document.createElement(elemName);
    newElem.classList.add(className);
    newElem.textContent = content;
    makeArea.appendChild(newElem);
    return newElem;
}

//*アイテムのAPI取得
const url = "https://noblessenoir.microcms.io/api/v1/item?limit=100";  // APIのエンドポイント
const apiKey = "rC5nQ3gjiQEizfYBWBcmadZjiwp6qQHJ9ruv";  // 自分のAPIキーを設定
let test = 0;

//api取得
const fetchData = async () => {
    try {
        //リクエスト
        const response = await fetch(url, {
            headers: {
                'X-API-KEY': 'rC5nQ3gjiQEizfYBWBcmadZjiwp6qQHJ9ruv'
            }
        });
        //整頓
        const data = await response.json();

        // データをHTMLに反映
        renderPosts(data.contents);

    } catch (error) {
        console.error("itemデータの取得に失敗しました", error);
    }
};
// html作成
const renderPosts = (posts) => {
    const container_up = document.querySelector('#test');
    const container_bottom = document.querySelector("#test2");
    container_up.innerHTML = '';
    container_bottom.innerHTML = '';

    posts.forEach((item, index) => {

        const cardHTML = `
        <div class="swiper-slide">
            <img class="swiper-img" src="${item.image.url}" alt="">
            <span class="swiper-text">
                ${item.name}<br>
                ${item.explanation}
            </span>
        </div>
        `;
        //ここをif文で判別する
        if (index % 2 == 0) {
            container_up.insertAdjacentHTML("beforeend", cardHTML);  // 偶数 → 上段
        } else {
            container_bottom.insertAdjacentHTML("beforeend", cardHTML);  // 奇数 → 下段
        }
    });
};
fetchData();

//!オープニングアニメーション
//*timelineの定義
const opening = gsap.timeline();
opening.add(() => {
    //*要素を生成
    //背景4つ
    const upperLeft = createElem(".topView__setPoint", "span", "hide-lUpper");
    const upperRight = createElem(".topView__setPoint", "span", "hide-rUpper");
    const bottomRight = createElem(".topView__setPoint", "span", "hide-rBottom");
    const bottomLeft = createElem(".topView__setPoint", "span", "hide-lBottom");
    //落ちていく水玉
    const drop = createElem(".topView__setPoint", "span", "drop-color");
    //背景のグラデーション
    const gradation = createElem(".topView__setPoint", "span", "cover-gradation");

    const body = document.querySelector("body");
    const reservation = document.querySelector(".reservation");
    //*オープニング実行
    //文字のアップイン
    opening.fromTo(".text-move", {
        yPercent: 50,
        autoAlpha: 0,
    }, {
        yPercent: 0,
        autoAlpha: 1,
        stagger: 0.08,
        ease: "elastic.out (1,1)"
    });
    //左上背景
    gsap.to(upperLeft, {
        yPercent: -100,
        autoAlpha: .5,
        ease: "circ.in",
        onComplete: () => {
            upperLeft.remove();
        }
    }, "<1.1")
    //右上背景
    gsap.to(upperRight, {
        xPercent: 100,
        autoAlpha: .5,
        ease: "circ.in",
        onComplete: () => {
            upperRight.remove();
        }
    }, "<.1")
    //右下背景
    gsap.to(bottomRight, {
        yPercent: 100,
        autoAlpha: .5,
        ease: "circ.in",
        onComplete: () => {
            bottomRight.remove();
        }
    }, "<.1")
    //左下背景
    gsap.to(bottomLeft, {
        xPercent: -100,
        autoAlpha: .5,
        ease: "circ.in",
        onComplete: () => {
            bottomLeft.remove();
        }
    }, "<.1")
    //水滴出現から落下まで細かくアニメーション
    gsap.to(drop, {
        autoAlpha: 0,
        scale: 1,
        ease: "power4.out",
    }, "<")
    gsap.to(drop, {
        autoAlpha: 1,
        rotateZ: 360,
        "--start-color": "#3578BC",
        "--end-color": "#47C7D2",
        scale: 1.1,
    }, "<+.1")
    gsap.to(drop, {
        "--end-color": "#D75C95",
        duration: 0.7,
        borderRadius: "50%",
    }, "<+.5")
    gsap.to(drop, {
        scale: 0,
        rotateZ: 720,
        autoAlpha: 0,
        ease: "back.in",
        duration: 0.7,
        onComplete: () => {
            drop.remove();
        }
    }, "<+.5")
    //背景が広がるアニメーション
    gsap.to(gradation, {
        autoAlpha: 0.2,
        duration: 0.3,
        scale: 5,
        ease: "power1.out",

        //このあたりでスクロール制限解除
        onComplete: () => {
            document.querySelector(".topBody").style.overflowY = "visible";
        }
    }, "<+0.7")
    gsap.fromTo(".topView__subTitle", {
        // yPercent: 50,
        autoAlpha: 0,
    }, {
        // yPercent: 0,
        autoAlpha: 1,
        // stagger: 0.09,
        ease: "elastic.out (1,1)"
    }, "<")
    gsap.to(gradation, {
        width: "100%",
        height: "100%",
        borderRadius: "0%",
        scale: 1,
        duration: 2,
    }, "<+.2")
    gsap.to(".topView__swiper", {
        autoAlpha: 1,
        duration: 1,
    }, "<+.4")
    gsap.to(reservation, {
        autoAlpha: 1,
    }, "<")
})

//!mainのアニメーション
//*タイトルアニメーション
gsap.utils.toArray(".title--style").forEach(target => {
    gsap.to(target, {
        autoAlpha: 1,
        translateX: "0",
        ease: "power1.out",
        scrollTrigger: {
            trigger: target,
            start: "top 85%",
            end: "bottom top",
            duration: 0.5,
        }
    })
})

//*テキストアニメーション
gsap.utils.toArray(".text--curtain").forEach(target => {
    gsap.to(target, {
        width: "0",
        ease: "circ.out",
        scrollTrigger: {
            trigger: target,
            start: "top 85%",
            duration: 0.5,
        }
    })
})

//*画像のカーテンアニメーション
gsap.utils.toArray(".curtain-move").forEach(target => {
    const xto = target.dataset.xto || 0;
    const yto = target.dataset.yto || -150;

    gsap.to(target, {
        xPercent: xto,
        yPercent: yto,
        scrollTrigger: {
            trigger: target,
            start: "top 75%",
            end: "bottom center",
        }
    });
});

//*タイルホバー時の文字アニメーション
const tile = document.querySelectorAll(".tile");
tile.forEach(tile => {
    tile.addEventListener("mouseover", function () {
        gsap.to(this.querySelectorAll(".tile--textMove"), {
            autoAlpha: 1,
            rotateX: 360,
            scale: 1.2,
            ease: "power2.out",
        });
    }
    )
    tile.addEventListener("mouseleave", function () {
        gsap.to(this.querySelectorAll(".tile--textMove"), {
            rotateX: 0,
            scale: 1,
        });
    })
})

//*画像の移動アニメーション
gsap.utils.toArray(".move-img").forEach(target => {
    gsap.fromTo(target, {
        yPercent: 10,
        scale: 1.2,
    },
        {
            yPercent: -10,
            scale: 1.2,
            scrollTrigger: {
                toggleActions: "play none none reverse",
                trigger: target,
                scrub: true,
            }
        });
});

//!swiperのアニメーション
//? 公式サイト https://swiperjs.com/get-started
//*共通部分の定義
const commonParameter = {
    direction: 'horizontal',
    slidesPerView: "auto",
    loop: true,
    watchSlidesProgress: true,

    autoplay: {
        delay: 0,
    },
}

//上部のアイテムスライダー
let item_aSwiper = null;
let item_bSwiper = null;
// Intersection Observerの設定
const observer_up = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // スワイパーが見えたら動作開始
            if (!item_aSwiper) {
                item_aSwiper = new Swiper('.item_aSwiper', {
                    ...commonParameter,
                    speed: 4000,
                });
            } else {
                item_aSwiper.autoplay.start();
            }
        } else {
            if (item_aSwiper) {
                item_aSwiper.autoplay.stop();
            }
        }
    });
}, { threshold: 0.5 });
observer_up.observe(document.querySelector('.item_aSwiper'));

//下部のアイテムスライダー
const observer_bottom = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!item_bSwiper) {
                item_bSwiper = new Swiper(".item_bSwiper", {
                    ...commonParameter,
                    speed: 3000,
                    autoplay: {
                        ...commonParameter.autoplay,
                        reverseDirection: true,
                    },
                });
            } else {
                item_bSwiper.autoplay.start();
            }
        }
        else {
            if (item_bSwiper) {
                item_bSwiper.autoplay.stop();
            }
        }
    })
}, { threshold: 0.5 });
observer_bottom.observe(document.querySelector(".item_bSwiper"));

//*ファーストビューのスワイパー
const swiper = new Swiper('.topView__swiper', {
    ...commonParameter,
    spaceBetween: 40,
    speed: 4000,
    allowTouchMove: false,
});

//*アイテムの全体のカーテン移動
const itemCurtain = createElem(".topItem__content", "span", "item-curtain");
gsap.to(itemCurtain, {
    width: "0",
    autoAlpha: .3,
    ease: "power1.out",
    scrollTrigger: {
        trigger: ".topItem",
        start: "top center",
        end: "bottom top",
    },
    onComplete: () => {
        itemCurtain.remove();
    },
})

//todo -ここから
//*カタログタイルを選択した際にcatalogにフィルター条件を送る
document.querySelectorAll('.topCatalog__link').forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        window.location.href = `catalog.html?category=${category}`;
    });
});

//!ファーストビューの波紋アニメーション
$(".topView__img").ripples({
    dropRadius: 10,
    perturbance: 0,
    resolution: 300,
});
