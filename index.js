import { displayPosts } from "./js/components/displayPosts.js";
import { addModalEvents } from "./js/components/addModalEvents.js"; 
import { fetchData } from "./js/api/movieApi.js";

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

const baseUrl = "https://image.tmdb.org/t/p/w200";
const container = document.querySelector(".container");
const closeModal = document.querySelector("#close_btn");
const modalBox = document.querySelector(".modal");

fetchData().then((data) => {
  postArray = data; // 배열만 받아옴
  displayPosts({ results: postArray }, container, modalBox, closeModal, baseUrl, addModalEvents);
});

// 검색
const searchMV = document.querySelector("#search_btn");
const searchInput = document.querySelector("#search");

searchMV.addEventListener("click", function () {
  const keyword = searchInput.value; // 검색어 가져오기
  const filteredPosts = postArray.filter((m) => m.title.toLowerCase().includes(keyword.toLowerCase()));

  displayPosts({ results: filteredPosts }, container, modalBox, closeModal, baseUrl, addModalEvents); // 수정

  if (keyword === "") {
    alert(`검색어를 입력해주세요.`);
  } else if (filteredPosts.length === 0) {
    alert(`다시 검색해주세요`);
  } else {
    backBtn.style.display = "inline-block";
  }
});

// 돌아가기 버튼
const backBtn = document.querySelector("#back_btn");

backBtn.addEventListener("click", function () {
  backBtn.style.display = "none";
  displayPosts({ results: postArray }, container, modalBox, closeModal, baseUrl, addModalEvents); // 수정
  searchInput.value = "";
});
