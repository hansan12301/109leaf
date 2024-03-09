// 화면 실행시 기존 목록 불러오기
window.addEventListener('DOMContentLoaded', function(){
    loadComments();
});

// 화면 크기 변경시 새로고침
var delay = 300;
var timer = null; 
$(window).on('resize', function(){
	clearTimeout(timer);
	timer = setTimeout(function(){
	document.location.reload();
	}, delay);
});

// 스크롤바를 숨기는 함수
function hideScrollbar() {
    document.body.style.overflow = 'hidden'; // 스크롤바를 숨깁니다.
}


const guest = document.querySelector('.guest');

// 입력하기 버튼 클릭시 함수 호출
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', () => {
    const input = document.querySelector('#input');
    let text = input.value.trim();
    if (text !== '') {
        // 입력된 문자열 특수문자, 숫자, 영문 등 한글 제외 제거
        const reg1 = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
        const reg2 = /[0-9 ]/gim;
        const reg3 = /[a-zA-Z ]/gim;
        const reg4 = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
        text = text.replace(reg1, '');
        text = text.replace(reg2, '');
        text = text.replace(reg3, '');
        text = text.replace(reg4, '');
        if (text.length <= 5) {
            // 문자열에서 필요한 부분을 없애도 빈 문자열이 아니라면
            if (text !== '') {
                // 입력된 문자열 분리 후 배열로 내보내기
                const strValueSplit = text.split("");
                console.log(strValueSplit);
                text = ''

                // 배열 길이 만큼 반복문 실행
                for (var num in strValueSplit) {
                    // 문자 분리 후 문자열에 덧붙이기
                    text = text + disassemble(strValueSplit[num])
                }

                text = text.replace(reg1, '');
                text = text.replace(reg2, '');
                text = text.replace(reg3, '');
                text = text.replace(reg4, '');

                // 문자열 local storage에 넣기
                localStorage.setItem(localStorage.length, text);

                // 방명록 지우고 다 다시 부르기
                var childrenCount = guest.children.length;
                var childrenToRemove = childrenCount - 2; // 더보기를 제외하고 방명록 지우기

                for (var i = 0; i < childrenToRemove; i++) {
                    guest.removeChild(guest.firstElementChild);
                }
                loadComments(); // 방명록 다시 로드하기
            }
        }
    input.value = '';
    input.focus();
    console.log(text);
    }
});

// 저장된 데이터 가지고 오기
function loadComments() {
    storageLength = localStorage.length
    console.log(storageLength)
    if (storageLength <= 5) {
        console.log('less then 5')
        for (var i = 0; i<storageLength; i++) {
            console.log(i, localStorage.getItem(i))
            addToGuest(localStorage.getItem(i));
        }
    } else {
        for (var i = storageLength - 5; i<storageLength; i++) {
            addToGuest(localStorage.getItem(i));
        }
    }
}

// 저장된 데이터 가지고 와서 img로 바꾼 뒤에 페이지에 넣기
function addToGuest(text) {
    const newListItem1 = document.createElement('div');
    const newListItem2 = document.createElement('div');
    newListItem1.classList.add('stem');
    newListItem2.classList.add('leaf');

    const strValueSplit = text.split("");
    console.log(strValueSplit);
    text = ''

    // 배열 길이 만큼 반복문 실행
    for (var num in strValueSplit) {
        const invertedLetter = invertLetter(strValueSplit[num]);
        const img = new Image();
        img.src = `./letter/${invertedLetter}.svg`;
        newListItem2.appendChild(img)
    }

    guest.prepend(newListItem2);
    guest.prepend(newListItem1);
}

// 문자열에 맞는 발음기호 찾기
function invertLetter(letter) {
    switch(letter) {
        case 'ㄱ': return 'g';
        case 'ㄲ': return 'kk';
        case 'ㄴ': return 'n';
        case 'ㄷ': return 'd';
        case 'ㄸ': return 'tt';
        case 'ㄹ': return 'r';
        case 'ㅁ': return 'm';
        case 'ㅂ': return 'b';
        case 'ㅃ': return 'pp';
        case 'ㅅ': return 's';
        case 'ㅆ': return 'ss';
        case 'ㅇ': return 'ng';
        case 'ㅈ': return 'j';
        case 'ㅉ': return 'jj';
        case 'ㅊ': return 'ch';
        case 'ㅋ': return 'k';
        case 'ㅌ': return 't';
        case 'ㅍ': return 'p';
        case 'ㅎ': return 'h';

        case 'ㅏ': return 'a';
        case 'ㅐ': return 'ae';
        case 'ㅑ': return 'ya';
        case 'ㅒ': return 'yae';
        case 'ㅓ': return 'eo';
        case 'ㅔ': return 'e';
        case 'ㅕ': return 'yeo';
        case 'ㅖ': return 'ye';
        case 'ㅗ': return 'o';
        case 'ㅘ': return 'wa';
        case 'ㅙ': return 'wae';
        case 'ㅚ': return 'oe';
        case 'ㅛ': return 'yo';
        case 'ㅜ': return 'u';
        case 'ㅝ': return 'weo';
        case 'ㅞ': return 'we';
        case 'ㅟ': return 'wi';
        case 'ㅠ': return 'yu';
        case 'ㅡ': return 'eu';
        case 'ㅢ': return 'ui';
        case 'ㅣ': return 'i';
    }
}


// 문자열 자모 분리
function disassemble(hangul) {
    const hangul_start = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
        'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
        'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];

    const hangul_mid = [
        'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
        'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
        'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
    ];

    const hangul_end = [
        '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
        'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
        'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
        'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];

    const UNICODE_HANGUL_START = 44032;
    const UNICODE_HANGUL_END = 55203;

    const unicode = hangul.charCodeAt(0);

    if (unicode < UNICODE_HANGUL_START || unicode > UNICODE_HANGUL_END) {
        return [ hangul ];
    }

    const dif = unicode - UNICODE_HANGUL_START;

    const start_index = parseInt(dif / 588);
    const mid_index = parseInt((dif - (start_index * 588)) / 28);
    const end_index = parseInt(dif % 28);

    if (hangul_end[end_index]) {
        if (hangul_end[end_index] == 'ㄺ'){
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                'ㄹㄱ'
            ];
        } else if (hangul_end[end_index] == 'ㄻ'){
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                'ㄹㅁ'
            ];
        } else if (hangul_end[end_index] == 'ㄽ'){
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                'ㄹㅅ'
            ];
        } else if (hangul_end[end_index] == 'ㄾ'){
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                'ㄹㅌ'
            ];
        } else if (hangul_end[end_index] == 'ㄿ'){
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                'ㄹㅍ'
            ];
        } else if (hangul_end[end_index] == 'ㅀ'){
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                'ㄹㅎ'
            ];
        } else if (hangul_end[end_index] == 'ㅄ'){
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                'ㅂㅅ'
            ];
        } else {
            return [
                hangul_start[start_index],
                hangul_mid[mid_index],
                hangul_end[end_index]
            ];
        }
    }
    return [
        hangul_start[start_index],
        hangul_mid[mid_index]
    ];
}


// 슬라이드 화면 구현

const greenSection = document.querySelector('.green-section');
const pageList = document.querySelector('.page-list');
const pages = document.querySelectorAll('.page');

const pageNum = document.querySelector('#page-num')
console.log(pageNum.childNodes)

let currentIndex = 0; // 현재 슬라이드 화면 인덱스

pages.forEach((page) => {
  page.style.width = `${greenSection.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

pageList.style.width = `${greenSection.clientWidth * pages.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

/*
    버튼에 이벤트 등록하기
*/
const buttonLeft = document.querySelector('.left-button');
const buttonRight = document.querySelector('.right-button');

buttonLeft.addEventListener('click', () => {
    console.log("left clicked");
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = pages.length - 1; // 인덱스가 첫 번째 페이지보다 작으면 마지막 페이지로 설정
    }
    pageList.style.marginLeft = `-${greenSection.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
    clearInterval(interval); // 기존 동작되던 interval 제거
    interval = getInterval();
    updatePageIndicator(currentIndex);
});

buttonRight.addEventListener('click', () => {
    console.log("right");
    currentIndex++;
    if (currentIndex >= pages.length) {
        currentIndex = 0; // 인덱스가 마지막 페이지를 넘어가면 첫 번째 페이지로 설정
    }
    pageList.style.marginLeft = `-${greenSection.clientWidth * currentIndex}px`;
    clearInterval(interval); // 기존 동작되던 interval 제거
    interval = getInterval();
    updatePageIndicator(currentIndex);
});


const updatePageIndicator = (index) => {
    const pageDots = document.querySelectorAll('#page-num > .round-un, #page-num > .round-selected');
    if (index >= 0 && index < pageDots.length) {
        pageDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.replace('round-un', 'round-selected');
            } else {
                dot.classList.replace('round-selected', 'round-un');
            }
        });
    } else {
        console.error(`Invalid index: ${index}`);
    }
};
const getInterval = () => {
    return setInterval(() => {
        currentIndex++;
        currentIndex = currentIndex >= pages.length ? 0 : currentIndex;
        pageList.style.marginLeft = `-${greenSection.clientWidth * currentIndex}px`;
        updatePageIndicator(currentIndex);
    }, 4000);
};

let interval = getInterval(); // interval 등록
