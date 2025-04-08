//!microCMS
const url = "https://noblessenoir.microcms.io/api/v1/catalog";
const apiKey = "rC5nQ3gjiQEizfYBWBcmadZjiwp6qQHJ9ruv";  // 自分のAPIキーを設定

const limit = 6;  // 1ページに表示する件数
let currentPage = 1;//現在のページ
let totalPages = 1;//全ページ

const urlParams = new URLSearchParams(window.location.search);
let selectedCategory = urlParams.get('category') || '';  // パラメータがなければ全件表示

//*APIを取得する関数
const fetchData = async (page = 1, category = '') => {
    const offset = (page - 1) * limit;
    const contentCount = document.querySelector(".title--accent");

    const endpointBase = `https://noblessenoir.microcms.io/api/v1/catalog?limit=${limit}&offset=${offset}`;
    const url = category ? `${endpointBase}&filters=category[contains]${category}` : endpointBase;
    try {
        //リクエスト
        //endpoint からurlへ
        const response = await fetch(url, {
            headers: {
                'X-API-KEY': 'rC5nQ3gjiQEizfYBWBcmadZjiwp6qQHJ9ruv'
            }
        });
        //整頓
        const data = await response.json();

        // データをHTMLに反映
        renderPosts(data.contents);
        totalPages = Math.ceil(data.totalCount / limit);  // 総ページ数を計算
        updatePagination();

        //*ページ表示ごとにアニメーション
        const opening = gsap.timeline();
        opening.fromTo(".post-move", {
            autoAlpha: 0,
        },
            {
                autoAlpha: 1,
                duration: 1,
                ease: "elastic.out (1,1)",
                stagger: 0.09,
            }
        );

        contentCount.innerHTML = data.totalCount + "件";

    } catch (error) {
        console.error("データの取得に失敗しました", error);
    }
};

//*HTMLの出力をする関数
const renderPosts = (posts) => {
    const container = document.querySelector('.catalog__content');
    container.innerHTML = '';  // 一旦中身をクリア
    posts.forEach(item => {
        let couponUrl = item.coupon;
        if (couponUrl == undefined) {
            couponUrl = "https://beauty.hotpepper.jp/slnH000689443/coupon/"
        }

        const cardHTML = `
            <article class="catalog__post post post-move">
                <a href="${couponUrl}" class="post__img" target="_blank">
                <img src="${item.img.url}" alt="${item.styleName}">
                </a>
                <div class="post__content">
                    <dl class="post__list">
                        <dt class="post__item">${item.styleName}</dt>
                        <dd class="post__item">参考価格: ¥${item.value}</dd>
                        <a href="${item.link}" target="_blank">
                            <dd class="post__item">担当者: <em class="post__stylist">${item.manager}</em></dd>
                        </a>
                    </dl>
                </div>
            </article>
        `;
        container.insertAdjacentHTML("beforeend", cardHTML);
    });
};

//前後のページを取得
const prev = document.querySelector('.pagination__prev');
const next = document.querySelector('.pagination__next');
// ページネーションの状態を更新
const updatePagination = () => {
    document.querySelector('.pagination__number').textContent = currentPage;
    //ページがない時は押せなくする
    prev.disabled = (currentPage <= 1);
    next.disabled = (currentPage >= totalPages);

    //前のページを切り替え
    if (currentPage > 1) {
        prev.textContent = currentPage - 1;
    }
    else if (currentPage == 1) {
        prev.textContent = "";
    }

    // 後のページを切り替え
    if (currentPage < totalPages) {
        next.textContent = currentPage + 1;
    }
    else if (currentPage == totalPages) {
        next.textContent = "";
    }
};

// 「次へ」ボタンをクリックした時
next.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchData(currentPage, selectedCategory);
    }
});
// 「前へ」ボタンをクリックした時
prev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage, selectedCategory);
    }
});

//*フィルター
const fil = document.querySelectorAll('.filter a');
fil.forEach(a => {
    a.addEventListener('click', (e) => {
        //押されたボタンの種類の判別と値の取得
        selectedCategory = e.target.dataset.category;
        console.log(selectedCategory);
        currentPage = 1;
        //カテゴリーをセットしてAPIを取得
        fetchData(undefined, selectedCategory);

        //フィルターのboldをリセットしてから付与
        fil.forEach(b => {
            b.style.fontWeight = "normal";
        });
        e.currentTarget.style.fontWeight = "bold";
    });
});

//*予約の表示
const reservation = document.querySelector(".reservation");
gsap.to(reservation, {
    autoAlpha: 1,
})

// 初回データ取得
fetchData(1, selectedCategory);

//topからカタログに来た際、今フィルターされているカテゴリーにbold付与
switch (selectedCategory) {
    case "":
        fil[0].style.fontWeight = "bold";
        break;
    case "male":
        fil[1].style.fontWeight = "bold";
        break;
    case "female":
        fil[2].style.fontWeight = "bold";
        break;
    case "long":
        fil[3].style.fontWeight = "bold";
        break;
    case "short":
        fil[4].style.fontWeight = "bold";
        break;
}

const tileImg = document.querySelectorAll(".post__img");
tileImg.forEach(target => {
    target.addEventListener("mouseover", () => {
        console.log("ホバー");
    })
})