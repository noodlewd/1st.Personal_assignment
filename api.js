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
  // api로 받아온 데이터를 html에 각 위치에 뿌려줌
  .then((data) => {
    // TMDB에서 가져온 기초 이미지 src를 절대경로로 바꿔주는 작업
    const baseUrl = "https://image.tmdb.org/t/p/w200";
    document.querySelector(".movie_img").src = baseUrl + data.results[0].poster_path; // 이미지 path
    document.querySelector(".movie_name").innerHTML = data.results[0].title; // 영화 제목
    document.querySelector(".cus_avg").innerHTML = "평점: " + data.results[0].vote_average.toFixed(1) + "점"; // 관객 평점
  })
  .catch((err) => console.error(err)); // 비동기 작업 중 발생한 오류를 감지하는 코드(좀 더 공부 해볼 것.)

//검색
