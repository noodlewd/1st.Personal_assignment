const url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&region=KR";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWMxMzkzMzkzZWIwOGVmMTcyY2E0MjU5ZTg2ZjNhOCIsIm5iZiI6MTczNjI5NTU1OS4zODIwMDAyLCJzdWIiOiI2NzdkYzQ4NzM4ODFjNzk0MTliYWZhMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.2R8KyFRV-SePi968r9eoe7GXrm7pPi6eumzmqctCyQk",
  },
};

// 영화 데이터를 가져오는 함수
export function fetchData() {
  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => data.results); // 데이터의 배열만
}
