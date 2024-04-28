const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2RlNjA4NDdlMThkMjhlNDI2N2RmMmNjZWM5OGIxZSIsInN1YiI6IjY2MmVhZjMyMjRmMmNlMDEyOTJhZDYyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cRtyyLqz764sem4__tpecWniTZ3pbB1eP778q6eZgWc'
    }
};

//   fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        // API(TMDB open API) 영화 데이터 가져오기
        let row = data.results; // 받아온 데이터 배열로 변수에 저장

        const cardList = document.querySelector('.card-list'); // 카드 요소
        cardList.innerHTML = ''; // 카드 넣을 요소에 빈 자리 넣어주기

        row.forEach((card) => {
            let id = card['id'];
            let image = card['poster_path'];
            let title = card['title'];
            let overview = card['overview'];
            let average = card['vote_average'];

            let temp_html = `
                <div class="movie-card" id="${id}">
                    <div class="movie-title">
                        <div class="movie-title-head">
                            <h3>movie</h3>
                        </div>
                        <div class="movie-title-body">
                            <p>${title}</p>
                        </div>
                    </div>
                    <div class="review">
                        <div class="review-head">
                            <h3>point</h3>
                        </div>
                        <div class="review-body">
                            <p>${average}</p>
                        </div>
                    </div>
                    <img src="https://image.tmdb.org/t/p/w500${image}" alt="...">
                    <div class="card-content">
                        <h3>more</h3>
                        <p>
                            ${overview}
                        </p>
                    </div>
                </div>`;

            cardList.insertAdjacentHTML('beforeend', temp_html);
        });

    });


// 카드 클릭 시 alert(영화id) 띄우기
document.addEventListener('DOMContentLoaded', () => {

    // 1. 카드 리스트에 접근해서 각 카드들 배열로 변수에 저장
    const movieCards = document.querySelectorAll('.movie-card');
    // console.log(movieCards);

    // 2. 각 영화 카드에 실행될 이벤트리스너 클릭 기능 추가
    movieCards.forEach((card) => {
        card.addEventListener('click', () => {
            // 3. 이벤트리스너에 클릭한 카드의 id값을 가져와서 alert으로 띄워주는 함수 넣기
            alert(`movie id: ${card.id}`);
        });
    });
});



// 영화 제목 검색 구현하기 (hint: filter 또는 display: none)

// 1. 영화 제목 데이터를 배열로 변수에 저장
// 2. 검색 버튼에 실행될 이벤트리스너 클릭 기능 추가
// 3. 검색 창에 텍스트 입력 시 배열의 요소 중 해당 텍스트에 일치하는 카드만 보일 수 있도록
// 4. input값 받기 (대소문자 구분 없도록)
const searchInput = document.getElementById("searchInput").value;
// 5-1. 검색하는 함수
// 5-1-1. 
// 5-1-2. input과 영화 제목 데이터가 들어있는 배열 중 true인 것들만 추출하여 새로운 배열로 생성
// 6-2. 결과를 출력하는 함수
// 6-2-1. css 요소 접근해야할 듯 -> 아직 뭘 접근해서 바꿀지는 잘 모르겠음

function searchMovie() {
    // 입력 상자에서 입력된 영화 제목 가져오기

    // 입력된 제목이 포함된 영화 필터링
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchInput.toLowerCase()));
    // 필터링된 영화 출력
    displayMovies(filteredMovies);
}