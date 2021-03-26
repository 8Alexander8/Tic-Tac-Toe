//מחלקה ליצירת מהלך השחקן והמחשב ע"י הוספת ספאן עם איקס או עיגול לתוך איידי של הבוקס הנתון
function CreateGameMove(_id) {
    this.id = _id;
}

CreateGameMove.prototype.addPlayerMove = function () {
    var boxId = document.getElementById(this.id);
    console.log(this.id)
    var newMove = document.createElement("span");
    boxId.appendChild(newMove);
    newMove.innerHTML = "X";
}

CreateGameMove.prototype.addMachineMove = function () {
    var boxId = document.getElementById(this.id);
    console.log(this.id)
    var newMove = document.createElement("span");
    boxId.appendChild(newMove);
    newMove.innerHTML = "O";
}