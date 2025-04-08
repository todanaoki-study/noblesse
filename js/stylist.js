//!microCMS
const url = "https://noblessenoir.microcms.io/api/v1/stylist";
const apiKey = "rC5nQ3gjiQEizfYBWBcmadZjiwp6qQHJ9ruv";  // 自分のAPIキーを設定

const limit = 6;  // 1ページに表示する件数
let currentPage = 1;//現在のページ
let totalPages = 1;//全ページ

//*APIを取得する関数
const fetchData = async (page = 1) => {
    const offset = (page - 1) * limit;

    //カテゴリーの選択でendpoint変更
    let endpoint = `https://noblessenoir.microcms.io/api/v1/stylist?limit=${limit}&offset=${offset}`;

    try {
        //リクエスト
        const response = await fetch(endpoint, {
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
        console.log(endpoint)

        // //!オープニングアニメーション
        const opening = gsap.timeline();
        opening.fromTo(".post-move", {
            autoAlpha: 0,
        },
            {
                autoAlpha: 1,
                duration: 2,
                ease: "elastic.out (1,1)",
                stagger: 0.09,
            }
        );
    } catch (error) {
        console.error("データの取得に失敗しました", error);
    }
};

//*HTMLの出力をする関数
const renderPosts = (posts) => {
    const container = document.querySelector('.stylist__content');
    container.innerHTML = '';  // 一旦中身をクリア
    posts.forEach(item => {
        const cardHTML = `
        <a href="${item.link}" target="_blank"  class="stylist__post post post-move">
            <article>
            <img src="${item.img.url}" alt="${item.name}" class="post__img">
            <div class="post__content">
                <dl class="post__overview">
                    <dt class="post__item">${item.name}：${item.occupation}</dt>
                    <dd class="post__item">概要：${item.introduction}</dd>
                </dl>
                <div class="post__share">
                                    <img class="logo--size" src="./img/logo/instagram.webp" alt="XXさんのインスタグラムのリンク。instagramの画像">
                </div>
            </div>
            </article>
            </a>
        `;
        container.insertAdjacentHTML("beforeend", cardHTML);
    });
};

//前後のページを取得
const prev = document.querySelector('.pagination__prev');
const next = document.querySelector('.pagination__next');
// ページネーションの状態を更新
const updatePagination = () => {
    //!工事中
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
        fetchData(currentPage);
    }
});
// 「前へ」ボタンをクリックした時
prev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});


// 初回データ取得
fetchData();

//予約のボタンを読み込み時非透過にする
const reservation = document.querySelector(".reservation");
reservation.style.opacity = "1";