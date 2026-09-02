console.log("PREPNOVA JavaScript is working!");

const cards = document.querySelectorAll(".resource-card");

cards.forEach(function(card) {
    card.addEventListener("mouseenter", function() {
        card.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = "translateY(0)";
    });
});
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.style.opacity = "0.6";
        });

        link.style.opacity = "1";
    });
});
const searchInput = document.querySelector("#resourceSearch");
const resourceCards = document.querySelectorAll(".resource-card");

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    resourceCards.forEach(function(card) {

        const cardText = card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {
            card.style.display = "inline-flex";
        } else {
            card.style.display = "none";
        }

    });
});
console.log(resourceCards);

const progressTasks = document.querySelectorAll(".progress-task");
const progressPercent = document.querySelector("#progress-percent");

progressTasks.forEach(function(task, index) {

    const savedProgress =
        localStorage.getItem("prepNovaTask" + index);

    if (savedProgress === "true") {
        task.checked = true;
    }

});

function updateProgress() {

    let completed = 0;

    progressTasks.forEach(function(task, index) {

        if (task.checked) {
            completed++;
            localStorage.setItem("prepNovaTask" + index, "true");
        } else {
            localStorage.setItem("prepNovaTask" + index, "false");
        }

    });

    const percentage =
        Math.round((completed / progressTasks.length) * 100);

    progressPercent.textContent = percentage + "%";
}

progressTasks.forEach(function(task) {

    task.addEventListener("change", updateProgress);

});

updateProgress();

window.addEventListener("load", function() {
    console.log("Welcome to PREPNOVA! 🚀");
});