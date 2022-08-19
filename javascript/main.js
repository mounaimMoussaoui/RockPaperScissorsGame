let btn = document.querySelector(".container .rock-content button.rule-box");
btn.addEventListener("click", function() {
    let rules = document.querySelector(".container .roles");
    rules.classList.add("show");
    rules.children[0].children[1].addEventListener("click", function() {
        rules.classList.remove("show");
    });
});

function playAgin(boxRes) {
    let palyBtn = document.querySelector(".container .rock-content .show-pick div.result button");
    palyBtn.addEventListener("click", function () {
        let showPick = document.querySelector(".container .rock-content .show-pick");
        let rockContent = document.querySelector(".container .rock-content .section");
        let listChoices = document.querySelectorAll(".container .rock-content .section div");
        listChoices.forEach((ele) => {
            ele.classList.remove("hidden");
        });
            showPick.classList.remove("show");
            rockContent.classList.remove("hidden");
            boxRes.classList.remove("show");
            let list = document.querySelectorAll(".container .rock-content .show-pick div:not(.result, .house-pick)");
            list.forEach((el) => {
                el.remove();
            });
    });
}

function funWinner() {
    let choices = document.querySelectorAll(".container .rock-content .show-pick div:not(.result, .house-pick)");
    let boxRes = document.querySelector(".container .rock-content .show-pick .result");
    let score = document.querySelector(".container .rock-content .head .score span:last-of-type");
    boxRes.classList.add("show");
    if(choices[0].classList.contains(`${choices[1].classList[1]}`)) {
        boxRes.children[0].textContent = `Equals`;
    } else if(choices[0].classList.contains("paper")) {
        if(choices[1].classList.contains("rock")) {
            boxRes.children[0].textContent = "You win";
            choices[0].classList.add("winner");
            score.textContent = `${parseInt(score.textContent) + 1}`;
        } else if(choices[1].classList.contains("Scissors")) {
            boxRes.children[0].textContent = "You Lose";
            choices[1].classList.add("winner");
            score.textContent = `${parseInt(score.textContent) > 0 ? parseInt(score.textContent) - 1 : parseInt(score.textContent)}`;
        }
    } else if(choices[0].classList.contains("rock")) {
        if(choices[1].classList.contains("Scissors")) {
            boxRes.children[0].textContent = "You win";
            choices[0].classList.add("winner");
            score.textContent = `${parseInt(score.textContent) + 1}`;
        } else if(choices[1].classList.contains("paper")) {
            boxRes.children[0].textContent = "You Lose";
            choices[1].classList.add("winner");
            score.textContent = `${parseInt(score.textContent) > 0 ? parseInt(score.textContent) - 1 : parseInt(score.textContent)}`;
        }
    } else if(choices[0].classList.contains("Scissors")) {
        if(choices[1].classList.contains("paper")) {
            boxRes.children[0].textContent = "You win";
            choices[0].classList.add("winner");
            score.textContent = `${parseInt(score.textContent) + 1}`;
        } else if(choices[1].classList.contains("rock")) {
            boxRes.children[0].textContent = "You Lose";
            choices[1].classList.add("winner");
            score.textContent = `${parseInt(score.textContent) > 0 ? parseInt(score.textContent) - 1 : parseInt(score.textContent)}`;
        }
    }
    playAgin(boxRes);
}

function addHousePicked(picked) {
    let arr = ["images/icon-paper.svg", "images/icon-rock.svg", "images/icon-scissors.svg"];
    let arrClass = ["paper", "rock", "Scissors"];
    let indexRand = Math.trunc(Math.random() * arr.length);
    let clonePick = picked.cloneNode(true);
    clonePick.classList.forEach((el) => {
        clonePick.classList.remove(el);
    });
    clonePick.children[0].src = `${arr[indexRand]}`;
    clonePick.classList.add(arrClass[indexRand]);
    let housePlace = document.querySelector(".container .rock-content .show-pick div.house-pick");
    if(!housePlace.classList.contains("hidden")) {
        housePlace.classList.add("hidden");
    }
    let boxRes = document.querySelector(".container .rock-content .show-pick .house-pick");
    boxRes.after(clonePick);
    funWinner();
}

function addImgPicked(divPick) {
    let sect = document.querySelector(".container .rock-content .show-pick");
    let myPicked = divPick.cloneNode(true);
    sect.classList.add("show");
    sect.prepend(myPicked);
    setTimeout(() => {
        addHousePicked(divPick)
    }, 800);
}

let listImg = document.querySelectorAll(".container .rock-content .section div");

listImg.forEach((img) => {
    img.addEventListener("click", function(e) {
        listImg.forEach((el) => {
            el.classList.add("hidden");
        });
        let parent = document.querySelector(".container .rock-content .section");
        parent.classList.add("hidden");
        e.currentTarget.classList.remove("hidden");
        e.currentTarget.classList.add("show");
        let housePlace = document.querySelector(".container .rock-content .show-pick div.house-pick");
        if(housePlace.classList.contains("hidden")) {
            housePlace.classList.remove("hidden");
        }
        addImgPicked(e.currentTarget);
    });
});
