export function addModalEvents(item, movie, modalBox, closeModal, baseUrl) {
    const openModal = item.querySelector(".movie_img");
  
    // .movie_img 요소가 존재하는지 확인
    if (openModal) {
      // 클릭 시 모달 오픈
      openModal.addEventListener("click", () => {
        modalBox.classList.add("active");
        modalBox.querySelector(".movie_img").src = baseUrl + movie.poster_path;
        modalBox.querySelector(".movie_name").textContent = movie.title;
        modalBox.querySelector(".movie_overview").textContent = movie.overview;
        modalBox.querySelector(".movie_relDate").textContent = "개봉일 " + movie.release_date;
        modalBox.querySelector(".cus_avg").textContent = "평점: " + movie.vote_average.toFixed(1);
      });
    } else {
      console.error("movie_img 요소가 없습니다.");
    }
  
    // 모달 x버튼 클릭 시 닫기
    closeModal.addEventListener("click", () => {
      modalBox.classList.remove("active");
    });
  }
  