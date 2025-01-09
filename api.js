const url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWMxMzkzMzkzZWIwOGVmMTcyY2E0MjU5ZTg2ZjNhOCIsIm5iZiI6MTczNjI5NTU1OS4zODIwMDAyLCJzdWIiOiI2NzdkYzQ4NzM4ODFjNzk0MTliYWZhMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2R8KyFRV-SePi968r9eoe7GXrm7pPi6eumzmqctCyQk",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    const baseUrl = "https://image.tmdb.org/t/p/w200";
    const container = document.querySelector(".container");

    // 데이터 검증단계 - api 데이터인 data.results 배열이 잘 넘어오는지 확인하는 방법
    if (!Array.isArray(data.results) || data.results.length === 0) {
      console.error("데이터가 없거나 잘못된 구조입니다.");
      return;
    }

    // 기존 콘텐츠 초기화(중복 방지)
    container.innerHTML = "";

    // data.results배열을 movie 를 통해서 순회
    data.results.forEach((movie) => {
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
      const openModal = document.querySelector(".movie_img");
      const closeModal = document.querySelector("#close_btn");
      const modalBox = document.querySelector(".modal");

      openModal.addEventListener("click", () => {
        modalBox.classList.add("active");
      });

      closeModal.addEventListener("click", () => {
        modalBox.classList.remove("active");
      });
    });
  })

  .catch((err) => console.error("API 호출 오류:", err));

//검색
