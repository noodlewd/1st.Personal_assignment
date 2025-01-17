export function displayPosts(data, container, modalBox, closeModal, baseUrl, addModalEvents) {
    const resultsMv = data.results;
  
    if (!Array.isArray(resultsMv) || resultsMv.length === 0) {
      console.error("데이터가 없거나 잘못된 구조입니다.");
      return;
    }
  
    // 기존 콘텐츠 초기화
    container.innerHTML = "";
  
    resultsMv.forEach((movie) => {
      const item = document.createElement("div");
      item.classList.add("item");
  
      const imageSrc = movie.poster_path ? baseUrl + movie.poster_path : "placeholder.jpg";
  
      item.innerHTML = `
        <img class="movie_img" src="${imageSrc}" alt="${movie.title}">
        <p class="movie_name">${movie.title}</p>
        <p class="cus_avg">평점: ${movie.vote_average.toFixed(1)}점</p>
      `;
  
      container.appendChild(item);
  
      // 모달 이벤트 연결
      addModalEvents(item, movie, modalBox, closeModal, baseUrl); // 필요한 값들을 전달
    });
  }
  