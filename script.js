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

function updateProgressDisplay() {

    let completed = 0;

    progressTasks.forEach(function(task) {

        if (task.checked) {
            completed++;
        }

    });

    const percentage =
        Math.round((completed / progressTasks.length) * 100);

    progressPercent.textContent = percentage + "%";
}




async function loadProgress() {

    const token = localStorage.getItem("prepNovaToken");

    if (!token) {
        updateProgressDisplay();
        return;
    }

    try {

        const response = await fetch("https://prep-nova-backend.onrender.com/progress", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await response.json();

        if (response.ok) {

            data.progress.forEach(function(value, index) {

                if (progressTasks[index]) {
                    progressTasks[index].checked = value;
                }

            });

            updateProgressDisplay();

        }

    } catch (error) {

        console.log("Unable to load progress.");

    }

}




async function saveProgress() {

    const token = localStorage.getItem("prepNovaToken");

    if (!token) {
        return;
    }

    const progress = [];

    progressTasks.forEach(function(task) {

        progress.push(task.checked);

    });

    try {

        await fetch("https://prep-nova-backend.onrender.com/progress", {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },

            body: JSON.stringify({
                progress: progress
            })

        });

    } catch (error) {

        console.log("Unable to save progress.");

    }

}




progressTasks.forEach(function(task) {

    task.addEventListener("change", function() {

        updateProgressDisplay();
        saveProgress();

    });

});




loadProgress();




const signupForm = document.querySelector("#signupForm");
const signupMessage = document.querySelector("#signupMessage");

signupForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.querySelector("#signupName").value;
    const email = document.querySelector("#signupEmail").value;
    const password = document.querySelector("#signupPassword").value;

    try {

        const response = await fetch("https://prep-nova-backend.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        signupMessage.textContent = data.message;

    } catch (error) {

        signupMessage.textContent = "Unable to connect to server.";

    }

});

const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");

loginForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.querySelector("#loginEmail").value;
    const password = document.querySelector("#loginPassword").value;

    try {

        const response = await fetch("https://prep-nova-backend.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

if (response.ok) {
    localStorage.setItem("prepNovaToken", data.token);
}

loginMessage.textContent = data.message;

    } catch (error) {

        loginMessage.textContent = "Unable to connect to server.";

    }

});
const logoutButton = document.querySelector("#logoutButton");

logoutButton.addEventListener("click", function() {

    localStorage.removeItem("prepNovaToken");

    alert("You have been logged out successfully!");

});