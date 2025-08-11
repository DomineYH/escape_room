document.addEventListener('DOMContentLoaded', () => {
    // 게임 상태 변수
    const gameState = {
        bookSolved: false,
        clockSolved: false,
        speakerSolved: false,
        computerSolved: false,
    };

    // DOM 요소 가져오기
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const areas = {
        book: document.getElementById('area-book'),
        clock: document.getElementById('area-clock'),
        speaker: document.getElementById('area-speaker'),
        computer: document.getElementById('area-computer'),
        door: document.getElementById('area-door')
    };

    // 모달 닫기
    modalCloseBtn.addEventListener('click', () => {
        modalContainer.classList.add('hidden');
    });

    // 각 영역 클릭 이벤트 리스너 추가
    areas.book.addEventListener('click', () => {
        if (!gameState.bookSolved) {
            openBookGame();
        } else {
            alert('이미 해결한 문제입니다.');
        }
    });

    areas.clock.addEventListener('click', () => {
        if (!gameState.clockSolved) {
            openClockGame();
        } else {
            alert('이미 해결한 문제입니다.');
        }
    });

    areas.speaker.addEventListener('click', () => {
        if (!gameState.speakerSolved) {
            openSpeakerGame();
        } else {
            alert('이미 해결한 문제입니다.');
        }
    });
    
    areas.computer.addEventListener('click', () => {
        if (!gameState.computerSolved) {
            openComputerGame();
        } else {
            alert('이미 해결한 문제입니다.');
        }
    });

    areas.door.addEventListener('click', openDoor);

    // 미니게임 함수들

    // 1. 책: 십자말풀이
    function openBookGame() {
        modalTitle.innerText = '십자말풀이';
        modalBody.innerHTML = `
            <p>교실과 관련된 단어로 십자말풀이를 완성하세요.</p>
            <p>가로 1: 학생이 공부하는 장소 (3글자)</p>
            <input type="text" id="crossword1" class="crossword-input" maxlength="3">
            <p>가로 2: 시간을 알려주는 물건 (2글자)</p>
            <input type="text" id="crossword2" class="crossword-input" maxlength="2">
            <br><br>
            <button class="game-submit-btn" id="book-submit">정답 확인</button>
        `;
        modalContainer.classList.remove('hidden');

        document.getElementById('book-submit').addEventListener('click', () => {
            const answer1 = document.getElementById('crossword1').value;
            const answer2 = document.getElementById('crossword2').value;
            if (answer1 === '교실' && answer2 === '시계') {
                alert('정답입니다!');
                gameState.bookSolved = true;
                document.getElementById('hint1').innerText = '힌트 1: 첫 번째 숫자는 이 교실의 창문 개수 (2)';
                areas.book.classList.add('solved');
                modalContainer.classList.add('hidden');
            } else {
                alert('틀렸습니다. 다시 생각해보세요.');
            }
        });
    }

    // 2. 시계: 현재 시간 맞추기 (단순화된 버전)
    function openClockGame() {
        modalTitle.innerText = '시계 퍼즐';
        modalBody.innerHTML = `
            <p>이미지에 있는 시계는 몇 시 몇 분을 가리키고 있나요?</p>
            <p>힌트: 짧은 바늘은 10과 11 사이, 긴 바늘은 4를 가리킵니다.</p>
            <input type="number" id="hour" placeholder="시" style="width: 50px;"> 시
            <input type="number" id="minute" placeholder="분" style="width: 50px;"> 분
            <br><br>
            <button class="game-submit-btn" id="clock-submit">정답 확인</button>
        `;
        modalContainer.classList.remove('hidden');
        
        document.getElementById('clock-submit').addEventListener('click', () => {
            const hour = document.getElementById('hour').value;
            const minute = document.getElementById('minute').value;
            if (hour === '10' && minute === '20') {
                 alert('정답입니다!');
                gameState.clockSolved = true;
                document.getElementById('hint2').innerText = '힌트 2: 두 번째 숫자는 시작도 끝도 아닌 숫자 (0)';
                areas.clock.classList.add('solved');
                modalContainer.classList.add('hidden');
            } else {
                alert('틀렸습니다. 이미지를 잘 관찰해보세요.');
            }
        });
    }

    // 3. 스피커: 간단한 질문
    function openSpeakerGame() {
        modalTitle.innerText = '청각 퀴즈';
        modalBody.innerHTML = `
            <p>교실 문 옆에 걸려있는 것은 무엇일까요?</p>
            <input type="text" id="speaker-answer" placeholder="정답을 입력하세요">
            <br><br>
            <button class="game-submit-btn" id="speaker-submit">정답 확인</button>
        `;
        modalContainer.classList.remove('hidden');

        document.getElementById('speaker-submit').addEventListener('click', () => {
            const answer = document.getElementById('speaker-answer').value.replace(/\s/g, ''); // 공백 제거
            if (answer === '스피커') {
                alert('정답입니다!');
                gameState.speakerSolved = true;
                document.getElementById('hint3').innerText = '힌트 3: 세 번째 숫자는 사과와 조각의 합 (2)';
                areas.speaker.classList.add('solved');
                modalContainer.classList.add('hidden');
            } else {
                alert('틀렸습니다. 다시 한번 생각해보세요.');
            }
        });
    }

    // 4. 컴퓨터: 칠판 글자 암호 풀기
    function openComputerGame() {
        modalTitle.innerText = '컴퓨터 암호';
        modalBody.innerHTML = `
            <p>칠판에 적힌 알 수 없는 글자들을 자세히 보세요.</p>
            <p>THE NONE G?ATIE</p>
            <p>COMA?SOC?</p>
            <p>컴퓨터 화면에는 글자들이 거울에 비친 것처럼 보입니다. 칠판의 글자들을 거울에 비춰보면 어떤 단어가 될까요? 물음표에 들어갈 알파벳을 순서대로 입력하세요.</p>
            <input type="text" id="computer-answer" placeholder="알파벳 3개" maxlength="3">
            <br><br>
            <button class="game-submit-btn" id="computer-submit">정답 확인</button>
        `;
        modalContainer.classList.remove('hidden');
        
        document.getElementById('computer-submit').addEventListener('click', () => {
            const answer = document.getElementById('computer-answer').value.toUpperCase();
            if (answer === 'ESC') {
                alert('정답입니다! 탈출(ESCAPE)의 약자군요!');
                gameState.computerSolved = true;
                document.getElementById('hint4').innerText = '힌트 4: 마지막 숫자는 지우개와 분필의 합 (5)';
                areas.computer.classList.add('solved');
                modalContainer.classList.add('hidden');
            } else {
                alert('틀렸습니다. 거울에 비친다고 생각하고 글자를 뒤집어 보세요.');
            }
        });
    }

    // 5. 문: 최종 비밀번호 입력
    function openDoor() {
        modalTitle.innerText = '비밀번호 입력';
        modalBody.innerHTML = `
            <p>찾아낸 힌트들을 조합하여 네 자리 비밀번호를 입력하세요.</p>
            <div>
                <input type="text" id="door-input1" maxlength="1" class="door-input">
                <input type="text" id="door-input2" maxlength="1" class="door-input">
                <input type="text" id="door-input3" maxlength="1" class="door-input">
                <input type="text" id="door-input4" maxlength="1" class="door-input">
            </div>
            <button id="door-submit-btn">탈출 시도</button>
        `;
        modalContainer.classList.remove('hidden');

        document.getElementById('door-submit-btn').addEventListener('click', () => {
            const pw1 = document.getElementById('door-input1').value;
            const pw2 = document.getElementById('door-input2').value;
            const pw3 = document.getElementById('door-input3').value;
            const pw4 = document.getElementById('door-input4').value;
            const finalPassword = `${pw1}${pw2}${pw3}${pw4}`;

            if (finalPassword === '2025') {
                modalBody.innerHTML = '<h2>탈출 성공!</h2><p>비밀의 교실에서 무사히 탈출했습니다!</p>';
            } else {
                alert('비밀번호가 틀렸습니다.');
            }
        });
    }
});