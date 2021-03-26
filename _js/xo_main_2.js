window.onload = function () {
    addBoxEventListener();
    rendomNum();
    rendomNum_2();
}
//קביעת משתנה עבור פונקציה ליצירת מספר רנדומלי
var num;
var num_2;

var numChekDouble = false;
//קביעת משתנה עבור בדיקה למקרה של נצחון
var win = false;
var machineFirstMove = false;

//פונקציה ליצירת אירוע האזנה לכל דיב במשחק
function addBoxEventListener() {

    for (i = 0; i <= 8; i++) {
        var box_id = document.getElementById(`box_${i}`);

        box_id.addEventListener("click", function () {
            //בדיקה האם הדיב כבר מכיל איקס או עיגול והאם כבר היה נצחון
            if (!this.firstChild && !win) {
                //יצירת מהלך השחקן
                let newMove = new CreateGameMove(this.id);
                newMove.addPlayerMove();
                //הוספת שם ה-איידי של השחקן למערך שלאחר מכן מושווה למערך הנצחונות
                playerMoveArr.push(this.id);
                console.log(playerMoveArr);
                checkForWin();

                //קריאה לפונקציה המייצרת את מהלך המחשב
                if (!machineFirstMove) {
                    setTimeout(machineMove, 2000);
                } else {
                    setTimeout(checkForLosing, 2000);
                }
            }
        })
    }
}

//יצירת פונקציה ליצירת מהלך המחשב
function machineMove() {
    rendomNum();
    var machineBoxId = document.getElementById(`box_${num}`);
    console.log(machineBoxId)
    if (!machineBoxId.firstChild && !win) {
        let newMove = new CreateGameMove(machineBoxId.id);
        newMove.addMachineMove();
        machineMoveArr.push(machineBoxId.id);
        console.log(machineMoveArr);
    } else if (!win) {
        machineMove();
    }
    checkForWin();
    machineFirstMove = true;


}

//פונקציה ליצירת מספר רנדומלי עבור מהלך המחשב
function rendomNum() {
    num = Math.floor(Math.random() * 9);
    return num;
}

function rendomNum_2() {
    num_2 = Math.floor(Math.random() * 3);
    return num_2;
}

//פונקציה הבודקת נצחון של השחקן או של המחשב מתוך מערך האפשרויות לניצחון
function checkForWin() {
    for (let i in winArr_win) {
        if (playerMoveArr.includes(winArr_win[i][0]) && playerMoveArr.includes(winArr_win[i][1]) && playerMoveArr.includes(winArr_win[i][2])) {
            win_display.innerHTML = "Player Wins!!!";
            win = true;
        } else if (machineMoveArr.includes(winArr_win[i][0]) && machineMoveArr.includes(winArr_win[i][1]) && machineMoveArr.includes(winArr_win[i][2])) {
            win_display.innerHTML = "Machine Wins!!!";
            win = true;
        }
    }
}

function checkForLosing() {
    for (var i = 0; i <= 5; i++) {
        if (playerMoveArr.includes(winArr_win[i][0]) && playerMoveArr.includes(winArr_win[i][1])) {
            if (!checkIfLoseChecked_1.includes(i + 0 + i + 1)) {
                createMachineMove(i, 2);
                return
                checkIfLoseChecked_1.push((i + 0 + i + 1));
                console.log(checkIfLoseChecked_1)

            }



        } else if (playerMoveArr.includes(winArr_win[i][1]) && playerMoveArr.includes(winArr_win[i][2])) {
            if (!checkIfLoseChecked_2.includes(i + 1 + i + 2)) {
                createMachineMove(i, 0);
                return
                checkIfLoseChecked_2.push(i + 1 + i + 2);

            }

        } else if (playerMoveArr.includes(winArr_win[i][0]) && playerMoveArr.includes(winArr_win[i][2])) {
            if (!checkIfLoseChecked_3.includes(i + 0 + i + 2)) {
                createMachineMove(i, 1);
                return
                checkIfLoseChecked_3.push(i + +i + 2);

            }

        } else {
            for (var x = 6; x <= 7; x++) {
                if (playerMoveArr.includes(winArr_win[x][0]) && playerMoveArr.includes(winArr_win[x][1])) {
                    if (!checkIfLoseChecked_4.includes(x + 0 + x + 1)) {
                        createMachineMove(x, 2);
                        return
                        checkIfLoseChecked_4.push(x + 0 + x + 1);

                    }

                } else if (playerMoveArr.includes(winArr_win[x][1]) && playerMoveArr.includes(winArr_win[x][2])) {
                    if (!checkIfLoseChecked_5.includes(x + 1 + x + 2)) {
                        createMachineMove(x, 0);
                        return
                        checkIfLoseChecked_5.push(x + 1 + x + 2);

                    }

                } else if (playerMoveArr.includes(winArr_win[x][0]) && playerMoveArr.includes(winArr_win[x][2])) {
                    if (!checkIfLoseChecked_6.includes(x + 0 + x + 2)) {
                        createMachineMove(x, 1);
                        return
                        checkIfLoseChecked_6.push(x + 0 + x + 2);

                    }

                }

            }
        }

    }


}

function createMachineMove(x, y) {
    var machineBoxId = document.getElementById(winArr_win[x][y]);
    if (!machineBoxId.firstChild && !win && !machineMoveArr[winArr_win[x][y]]) {
        let newMove = new CreateGameMove(machineBoxId.id);
        newMove.addMachineMove();
        machineMoveArr.push(machineBoxId.id);
    }
    checkForWin();
    numChekDouble = true;
}