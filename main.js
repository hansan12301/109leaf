// 새로고침시 위치 고정


history.scrollRestoration = "auto";

// 화면 실행시 기존 목록 불러오기
window.onload = function() {
    loadComments();
}

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

        addToGuest(text);
        localStorage.setItem(localStorage.length, text);
        input.value = '';
        input.focus();
        console.log(text);
    }
});

function loadComments() {
    storageLength = localStorage.length
    console.log(storageLength)
    console.log(localStorage.getItem(0));
    for (var i = 0; i<storageLength; i++) {
        addToGuest(localStorage.getItem(i));
    }
}

// 저장된 데이터 가지고 와서 img로 바꾼 뒤에 페이지에 넣기
function addToGuest(text) {
    const guest = document.querySelector('.guest');
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