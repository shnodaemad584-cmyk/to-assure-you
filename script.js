const answers = {
    future: {
        icon: "❤️",
        title: "Afraid of the future",
        text: `فاهمك وفاهم مشاعرك وطبع شخصيتك والقلق من موضوعنا، بس أنا معك وبحاول بكل اللي بإيدي عشان أكون معك.

وزي ما حكيت، كل شيء بيجي شوي شوي.`
    },

    distance: {
        icon: "🌍",
        title: "The distance between us worries me",
        text: `ياه، معك حق. بس في غيرنا كتير عملوها، وفي ناس أبعد منّا كمان وعملوها.

ليه إحنا لا؟ إحنا مش أقل من حدا.`
    },

    miss: {
        icon: "🫂",
        title: "I miss you and need reassurance",
        text: `فك يو، ابعتيلي بالشات ❤️`
    },

    overthinking: {
        icon: "💭",
        title: "Overthinking things",
        text: `احكيلي أكتر، إيش بتفكري…

Don't be afraid; I won't judge you.`
    },

    fit: {
        icon: "🥺",
        title: "Feeling like I’m not the right fit",
        text: `إنتِ غيرتي طريقة تفكيري وميولي وأفكاري ومبادئي.

إنتِ أنسب حد بحياتي. بحب كتير طريقة تفكيرك، وكتير عقلانية. إنتِ جد كتير مناسبة إلي.`
    },

    lose: {
        icon: "💔",
        title: "Afraid we might lose each other",
        text: `ما رح نخسر بعض طالما إحنا قريبين وبنحاول سوا، وأنا دايمًا رح أضل أحاول عشانك.

عشان آخر شيء بدي أخسره هو إنتِ ووجودك بحياتي.`
    }
};

const homeScreen = document.getElementById("home");
const questionsScreen = document.getElementById("questions");
const answerScreen = document.getElementById("answer");

const startButton = document.getElementById("startBtn");
const homeButton = document.getElementById("homeBtn");
const backButton = document.getElementById("backBtn");
const moreButton = document.getElementById("moreBtn");

const answerIcon = document.getElementById("answerIcon");
const answerTitle = document.getElementById("answerTitle");
const answerText = document.getElementById("answerText");
const answerEyebrow = document.getElementById("answerEyebrow");

const thoughtCards = document.querySelectorAll(".thought-card");
const cursorGlow = document.querySelector(".cursor-glow");

let typingTimer = null;

function showScreen(screen) {
    if (!screen) {
        return;
    }

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(currentScreen) {
        currentScreen.classList.remove("active");
    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function typeText(element, text, speed) {
    if (!element) {
        return;
    }

    if (typingTimer !== null) {
        clearInterval(typingTimer);
    }

    element.textContent = "";

    let index = 0;

    typingTimer = setInterval(function() {
        element.textContent += text.charAt(index);
        index++;

        if (index >= text.length) {
            clearInterval(typingTimer);
            typingTimer = null;
        }
    }, speed);
}

function openAnswer(answerKey) {
    const answer = answers[answerKey];

    if (!answer) {
        return;
    }

    if (answerIcon) {
        answerIcon.textContent = answer.icon;
    }

    if (answerTitle) {
        answerTitle.textContent = answer.title;
    }

    if (answerEyebrow) {
        answerEyebrow.textContent = "A thought you don't have to carry alone";
    }

    if (answerText) {
        answerText.textContent = "";
    }

    showScreen(answerScreen);

    setTimeout(function() {
        typeText(answerText, answer.text, 18);
    }, 300);
}

if (startButton) {
    startButton.addEventListener("click", function() {
        showScreen(questionsScreen);
    });
}

if (homeButton) {
    homeButton.addEventListener("click", function() {
        showScreen(homeScreen);
    });
}

if (backButton) {
    backButton.addEventListener("click", function() {
        showScreen(questionsScreen);
    });
}

thoughtCards.forEach(function(card) {
    card.addEventListener("click", function() {
        const answerKey = card.getAttribute("data-answer");
        openAnswer(answerKey);
    });
});

if (moreButton) {
    moreButton.addEventListener("click", function() {
        showScreen(questionsScreen);
    });
}

if (cursorGlow) {
    window.addEventListener("pointermove", function(event) {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}

document.addEventListener("keydown", function(event) {
    if (
        event.key === "Escape" &&
        answerScreen &&
        answerScreen.classList.contains("active")
    ) {
        showScreen(questionsScreen);
    }
});