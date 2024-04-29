const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2RlNjA4NDdlMThkMjhlNDI2N2RmMmNjZWM5OGIxZSIsInN1YiI6IjY2MmVhZjMyMjRmMmNlMDEyOTJhZDYyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cRtyyLqz764sem4__tpecWniTZ3pbB1eP778q6eZgWc'
    }
};

const movies = []; // API에서 가져온 데이터를 넣어 글로벌 변수로 사용하기 위해 빈 배열 생성
const cardList = document.querySelector('.card-list'); // 카드 리스트에 접근


// API(TMDB open API) 영화 데이터 가져오기
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let row = data.results; // 1. 받아온 데이터 배열로 변수에 저장
        console.log(row);
        movies.push(...row); // 2. 빈 배열에 row에 있는 영화 데이터 넣기 + 배열 안에 배열로 들어가있어서 스프레드

        cardList.innerHTML = ''; // 3. 카드 리스트에 빈 자리 넣어주기

        // 4. 카드 만들기 함수
        let showCards = (rows) => {
            rows.forEach((card) => {
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
                        <img src="https://image.tmdb.org/t/p/w500${image}" alt="..." class="card-img">
                        <div class="card-content">
                            <h3>more</h3>
                            <p>
                                ${overview}
                            </p>
                        </div>
                    </div>`;

                // 5. 카드 리스트 안에 코드 넣기
                cardList.insertAdjacentHTML('beforeend', temp_html);
            });
        };
        showCards(row);


        // 카드 클릭 시 alert(영화id) 띄우기
        // 1. 카드 리스트에 접근해서 각 카드들 배열로 변수에 저장
        const movieCards = document.querySelectorAll('.movie-card');
        // console.log(movieCards);

        // 2. 각 영화 카드에 실행될 이벤트리스너 클릭 기능 추가
        movieCards.forEach((card) => {
            card.addEventListener('click', () => {
                // 3. 이벤트리스너에 클릭한 카드의 id값을 가져와서 alert으로 띄워주는 함수 넣기
                alert(`cinema id: ${card.id}`);
            });
        });


        // 영화 제목 검색 구현하기
        // 1. 영화 데이터를 배열로 변수에 저장
        // const movieCards = document.querySelectorAll('.movie-card');

        // 2. 검색 버튼에 실행될 이벤트리스너 클릭 기능 추가
        const searchBtn = document.getElementById("search-btn");

        searchBtn.addEventListener('click', (e) => { // 클릭 이벤트 발생 시 정보들이 e에 담겨옴
            e.preventDefault();

            // 3. 검색 창에 접근
            const searchInput = document.getElementById("search-input");

            // 4. 검색 창에 텍스트 입력 시 배열의 요소 중 일치하는 카드만 보일 수 있도록 input값 받기 (대소문자 구분, 공백 없도록)
            const keyword = searchInput.value.trim().toUpperCase();

            // 5-1. 검색하는 함수
            const filteredMovies = movies.filter(movie => {
                // 5-1-1. 영화 제목 데이터 찾아오기 (대소문자 구분, 공백 없도록)
                // 5-1-2. input과 영화 제목 데이터가 포함된 배열 중 true인 것들만 추출하여 새로운 배열로 생성
                return movie.title.trim().toUpperCase().includes(keyword);
            });

            // 6-2. 결과 출력하는 함수    
            // 6-1-1. 영화 카드를 담을 컨테이너 요소에 접근
            document.getElementById("cardList");

            // 6-1-2. 해당 요소에 이전에 이미 출력된 결과 지우기
            cardList.innerHTML = '';

            // 6-2-3. 해당 요소에는 찾은 영화 카드 데이터 배열로만 채워넣기
            showCards(filteredMovies);
        });
    });

    // 검색 시 엔터 키 사용
    const onSubmitSearch = (e) => {
        if (e.key === "Enter") {
          //키를 눌렀을 때 동작할 코드
        };
    };

    // 영화 상세 설명 토글
    function openSetting(){
        if(document.getElementsByClassName("card-content").style.display==='block'){
            document.getElementsByClassName("card-content").style.display='none';
        }else{
            document.getElementsByClassName("card-content").style.display='block';
        };
    };