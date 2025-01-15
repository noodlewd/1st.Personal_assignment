const url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWMxMzkzMzkzZWIwOGVmMTcyY2E0MjU5ZTg2ZjNhOCIsIm5iZiI6MTczNjI5NTU1OS4zODIwMDAyLCJzdWIiOiI2NzdkYzQ4NzM4ODFjNzk0MTliYWZhMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2R8KyFRV-SePi968r9eoe7GXrm7pPi6eumzmqctCyQk",
  },
};

let postArray = [];

function fetchData() {
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      postArray = data.results; 
      displayPosts(data);
    });
}

function displayPosts(data) {
  const baseUrl = "https://image.tmdb.org/t/p/w200";
  const container = document.querySelector(".container");
  const resultsMv = data.results;
  // 데이터 검증단계 - api 데이터인 data.results 배열이 잘 넘어오는지 확인하는 방법
  if (!Array.isArray(resultsMv) || resultsMv.length === 0) {
    console.error("데이터가 없거나 잘못된 구조입니다.");
    return;
  }

  // 기존 콘텐츠 초기화(중복 방지)
  container.innerHTML = "";

  // data.results배열을 movie 를 통해서 순회
  resultsMv.forEach((movie) => {
    const item = document.createElement("div");
    item.classList.add("item");

    // 데이터 처리 - 삼항 연산자를 사용해서 이미지가 안넘어 올 시 예비 이미지 사용
    const imageSrc = movie.poster_path ? baseUrl + movie.poster_path : "placeholder.jpg";

    // HTML 설정 - 백틱을 이옹하여 추가
    item.innerHTML = `
        <img class="movie_img" src="${imageSrc}" alt="${movie.title}">
        <p class="movie_name">${movie.title}</p>
        <p class="cus_avg">평점: ${movie.vote_average.toFixed(1)}점</p>
      `;

    container.appendChild(item);

    // 클릭 이벤트
    const openModal = item.querySelector(".movie_img");
    const closeModal = document.querySelector("#close_btn");
    const modalBox = document.querySelector(".modal");

    openModal.addEventListener("click", () => {
      modalBox.classList.add("active");
      modalBox.querySelector(".movie_img").src = baseUrl + movie.poster_path;
      modalBox.querySelector(".movie_name").textContent = movie.title;
      modalBox.querySelector(".movie_overview").textContent = movie.overview;
      modalBox.querySelector(".movie_relDate").textContent = "개봉일 " + movie.release_date;
      modalBox.querySelector(".cus_avg").textContent = "평점: " + movie.vote_average.toFixed(1);
    });

    closeModal.addEventListener("click", () => {
      modalBox.classList.remove("active");
    });
  });
}
fetchData();

const searchMV = document.querySelector("#search_btn");
const searchInput = document.querySelector("#search");

searchMV.addEventListener("click", function () {
  // 1. 검색 필드에 영화목록 가져오기
  // 2. 영화들 필터링
  const keyword = searchInput.value;
  const filteredPosts = postArray.filter(function (m) {
    // 검색값과 데이터가 전부 소문자로 변형
    return m.title.toLowerCase().includes(keyword.toLowerCase());
  });

  // 객체에서 필터링된 값 불러오기
  displayPosts({ results: filteredPosts });

  // 검색된 값이 알맞지 않거나 값이 존재하지 않을 때 alert
  if (filteredPosts.length === 0 || keyword === "") {
    alert(`다시 검색해주세요.`);
  } else {
    // 검색 후 버튼 나타내기 및 값이 없을 땐 버튼 x
    backBtn.style.display = "inline-block";
  }
});

const backBtn = document.querySelector("#back_btn");

backBtn.addEventListener("click", function () {
  // 뒤로가기를 통해 초기화면으로 돌아가면 다시 사라짐
  backBtn.style.display = "none";
  // 배열 전체를 보여줌
  displayPosts({ results: postArray });
  // 검색값 초기화
  searchInput.value = "";
});
