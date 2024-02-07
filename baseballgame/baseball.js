

// random 3자리 숫자 answer
let i, j, k;
do {
    i = Math.floor(Math.random() * 10);
    j = Math.floor(Math.random() * 10);
    k = Math.floor(Math.random() * 10);
} while (i === j || j === k || i === k);

let answer;
if(i === 0) {
    answer = `0${j}${k}`;
    console.log(answer);
} else {
    answer = `${i}${j}${k}`;
    console.log(answer);
}


// 사용자에게 입력값(userName) 받기
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!");
play();

// 정답여부 판별
async function check(userNum, answer) {
    const users = userNum.toString().split('').map(Number);
    const computers = answer.toString().split('').map(Number);

    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 3; i++) {
        if (users[i] === computers[i]) {
            strike++;
        } else if (computers.includes(users[i])) {
            ball++;
        }
    }
    console.log(`${strike}S${ball}B`);
    return strike === 3;
    
}

// 진행
async function play() {
    let count = 1;
    while(true) {
        const userNum = await askNumber(`${count}번째 시도 : `);
        if(await check(userNum, answer)) {
            console.log(`${count}번만에 맞히셨습니다.`);
            console.log(`게임을 종료합니다.`);
            rl.close();
            break;
        } else{
            count++;
        } 
    }
}

// 사용자에게 질문을 하는 함수
function askNumber(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}