//המשחק מתחיל בכך שהשחקן מבצע מהלך ראשון. לאחר מכן המחשב מבצע מהלך רנדומלי,
// לאחר מכן השחקן מבצע מהלך שני והמחשב בודק מצבים שבו הוא(המחשב) יכול לנצח,
// במידה ואין מצב כזה הוא מבצע בדיקה בו הוא יכול להפסיד לשחקן ופועל בהתאם למצב הנתון.
// במידה ואף אחד מהמצבים אינו מתקיים המחשב מבצע שוב מהלך רנדומלי

window.onload = function () {
    addBoxEventListener();
    rendomNum();
    rendomNum_2();
    id_btn_reset.addEventListener("click", function () {
        document.location.reload();
    })
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
                    setTimeout(machineMove, 500);
                } else {
                    numChekDouble = false;
                    setTimeout(checkToWin, 1000);
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
            win_display.innerHTML = "YOU WIN!!!";
            win = true;
            id_displayInfo.classList.add("display_info_3");
        } else if (machineMoveArr.includes(winArr_win[i][0]) && machineMoveArr.includes(winArr_win[i][1]) && machineMoveArr.includes(winArr_win[i][2])) {
            win_display.innerHTML = "MACHINE WIN!!!";
            win = true;
            id_displayInfo.classList.add("display_info_2");
        } else if (playerMoveArr.length == 5) {
            //הפסקת המשחק אם אין מנצחים
            win = true;
            win_display.innerHTML = "Draw";
        }
    }
}
//פונקציה לבקידה של מצב בו המחשב עלול להפסיד ולהגיב בהתאם לכך
function checkForLosing() {
    //לופ בדיקה למצב ניצחון של השחקן לאורך ולרוחב הטבלה
    for (var i = 0; i <= 5; i++) {
        if (playerMoveArr.includes(winArr_win[i][0]) && playerMoveArr.includes(winArr_win[i][1])) {
            createMachineMove(i, 2);
            if (numChekDouble) {
                return;
            } else {
                numChekDouble = false;
            }
        } else if (playerMoveArr.includes(winArr_win[i][1]) && playerMoveArr.includes(winArr_win[i][2])) {
            createMachineMove(i, 0);
            if (numChekDouble) {
                return;
            } else {
                numChekDouble = false;
            }
        } else if (playerMoveArr.includes(winArr_win[i][0]) && playerMoveArr.includes(winArr_win[i][2])) {
            createMachineMove(i, 1);
            if (numChekDouble) {
                return;
            } else {
                numChekDouble = false;
            }
        } else {
            //לופ בדיקה למצב ניצחון של השחקן באלכסון הטבלה
            for (var x = 6; x <= 7; x++) {
                if (playerMoveArr.includes(winArr_win[x][0]) && playerMoveArr.includes(winArr_win[x][1])) {
                    createMachineMove(x, 2);
                    if (numChekDouble) {
                        return;
                    } else {
                        numChekDouble = false;
                    }
                } else if (playerMoveArr.includes(winArr_win[x][1]) && playerMoveArr.includes(winArr_win[x][2])) {
                    createMachineMove(x, 0);
                    if (numChekDouble) {
                        return;
                    } else {
                        numChekDouble = false;
                    }
                } else if (playerMoveArr.includes(winArr_win[x][0]) && playerMoveArr.includes(winArr_win[x][2])) {
                    createMachineMove(x, 1);
                    if (numChekDouble) {
                        return;
                    } else {
                        numChekDouble = false;
                    }
                }
            }
        }
    }
    //במידה ואין איום להפסד קורא שוב לפונקציה למהלך המחשב הרנדומלי
    if (!numChekDouble) {
        machineMove();
    }
}
//פונקציה המייצרת את מהלך המחשב על סמך האיום מהשחקן
function createMachineMove(x, y) {
    var machineBoxId = document.getElementById(winArr_win[x][y]);
    if (!machineBoxId.firstChild && !win && !machineMoveArr[winArr_win[x][y]]) {
        let newMove = new CreateGameMove(machineBoxId.id);
        newMove.addMachineMove();
        machineMoveArr.push(machineBoxId.id);
        numChekDouble = true;
    }
    checkForWin();
}

//פונקציה הבודקת מצב שבו המחשב יכול לנצח, במידה ואין מצב כזה הפונקציה קוראת לפונציקה שבודקת מצב שבו המחשב יכול להפסיד
function checkToWin() {
    //לופ בדיקה למצב ניצחון של השחקן לאורך ולרוחב הטבלה
    for (var i = 0; i <= 5; i++) {
        if (machineMoveArr.includes(winArr_win[i][0]) && machineMoveArr.includes(winArr_win[i][1])) {
            createMachineMove(i, 2);
            if (numChekDouble) {
                return;
            } else {
                numChekDouble = false;
            }
        } else if (machineMoveArr.includes(winArr_win[i][1]) && machineMoveArr.includes(winArr_win[i][2])) {
            createMachineMove(i, 0);
            if (numChekDouble) {
                return;
            } else {
                numChekDouble = false;
            }
        } else if (machineMoveArr.includes(winArr_win[i][0]) && machineMoveArr.includes(winArr_win[i][2])) {
            createMachineMove(i, 1);
            if (numChekDouble) {
                return;
            } else {
                numChekDouble = false;
            }
        } else {
            //לופ בדיקה למצב ניצחון של השחקן באלכסון הטבלה
            for (var x = 6; x <= 7; x++) {
                if (machineMoveArr.includes(winArr_win[x][0]) && machineMoveArr.includes(winArr_win[x][1])) {
                    createMachineMove(x, 2);
                    if (numChekDouble) {
                        return;
                    } else {
                        numChekDouble = false;
                    }
                } else if (machineMoveArr.includes(winArr_win[x][1]) && machineMoveArr.includes(winArr_win[x][2])) {
                    createMachineMove(x, 0);
                    if (numChekDouble) {
                        return;
                    } else {
                        numChekDouble = false;
                    }
                } else if (machineMoveArr.includes(winArr_win[x][0]) && machineMoveArr.includes(winArr_win[x][2])) {
                    createMachineMove(x, 1);
                    if (numChekDouble) {
                        return;
                    } else {
                        numChekDouble = false;
                    }
                }
            }
        }
    }
    //קריאה לפונקציה הבודק מצב בו המחשב עלול להפסיד
    if (!numChekDouble) {
        checkForLosing();
    }
}