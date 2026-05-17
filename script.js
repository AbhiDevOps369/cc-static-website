// 1. Terminal Typing Simulation
const terminalCommands = [
    { cmd: "npm run dev", output: "✔ Vite v5.2.0 ready in 245ms\n  ➜ Local:   http://localhost:5173/\n  ➜ Network: use --host to expose" },
    { cmd: "node -v", output: "v20.11.0 (LTS Carbon)" },
    { cmd: "git status", output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean" },
    { cmd: "npm test", output: "PASS  src/tests/calculator.test.js\nPASS  src/tests/auth.test.js\n\nTest Suites: 2 passed, 2 total\nTests:       18 passed, 18 total\nSnapshots:   0 total\nTime:        0.98s" }
];

let commandIndex = 0;
let charIndex = 0;
const typedCmdEl = document.getElementById("typedCmd");
const termOutputEl = document.getElementById("termOutput");

function typeCommand() {
    if (!typedCmdEl) return;
    const current = terminalCommands[commandIndex];
    
    if (charIndex < current.cmd.length) {
        typedCmdEl.textContent += current.cmd.charAt(charIndex);
        charIndex++;
        setTimeout(typeCommand, 80);
    } else {
        // Command typed, show output after a brief pause
        setTimeout(() => {
            termOutputEl.textContent = current.output;
            
            // Wait, then move to next command
            setTimeout(() => {
                termOutputEl.textContent = "";
                typedCmdEl.textContent = "";
                charIndex = 0;
                commandIndex = (commandIndex + 1) % terminalCommands.length;
                setTimeout(typeCommand, 500);
            }, 5000);
        }, 500);
    }
}

// 2. Web Development Quiz Logic
const quizData = [
    {
        question: "Which CSS property is used to create smooth transition animations?",
        options: ["animation-delay", "transition", "transform", "keyframe"],
        correct: 1,
        feedback: "Correct! The 'transition' property allows changes in CSS properties to occur smoothly over a specified duration."
    },
    {
        question: "What is the output of typeof null in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'string'"],
        correct: 2,
        feedback: "Correct! This is a long-standing bug/behavior in JavaScript where 'typeof null' evaluates to 'object'."
    },
    {
        question: "Which of the following is NOT a semantic HTML5 element?",
        options: ["<article>", "<section>", "<div>", "<nav>"],
        correct: 2,
        feedback: "Correct! While <div> is a layout block, it has no semantic meaning, unlike <article>, <section>, or <nav>."
    },
    {
        question: "What does the 'Async/Await' keywords handle in modern JavaScript?",
        options: ["Synchronous loops", "CSS Grid compiling", "Asynchronous Promises", "DOM event listening"],
        correct: 2,
        feedback: "Correct! Async/Await provides a clean, synchronous-looking syntax to write asynchronous Promise code."
    }
];

let currentQuestion = 0;
let score = 0;
let answerSelected = false;

function loadQuiz() {
    const questionEl = document.getElementById("quizQuestion");
    const optionsEl = document.getElementById("quizOptions");
    const feedbackEl = document.getElementById("quizFeedback");
    const progressBar = document.getElementById("progressBar");
    const scoreEl = document.getElementById("quizScore");
    const nextBtn = document.getElementById("nextBtn");

    if (!questionEl) return;

    answerSelected = false;
    nextBtn.style.display = "none";
    feedbackEl.innerText = "";
    feedbackEl.className = "quiz-feedback";

    const currentQuiz = quizData[currentQuestion];
    questionEl.innerText = `${currentQuestion + 1}. ${currentQuiz.question}`;
    
    // Progress
    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    optionsEl.innerHTML = "";
    currentQuiz.options.forEach((option, idx) => {
        const button = document.createElement("button");
        button.className = "quiz-option";
        button.innerText = option;
        button.onclick = () => selectAnswer(idx, button);
        optionsEl.appendChild(button);
    });

    scoreEl.innerText = `Score: ${score} / ${quizData.length}`;
}

function selectAnswer(selectedIndex, buttonEl) {
    if (answerSelected) return;
    answerSelected = true;

    const currentQuiz = quizData[currentQuestion];
    const options = document.querySelectorAll(".quiz-option");
    const feedbackEl = document.getElementById("quizFeedback");
    const nextBtn = document.getElementById("nextBtn");

    if (selectedIndex === currentQuiz.correct) {
        buttonEl.classList.add("correct");
        score++;
        feedbackEl.innerText = currentQuiz.feedback;
        feedbackEl.className = "quiz-feedback t-success";
    } else {
        buttonEl.classList.add("wrong");
        options[currentQuiz.correct].classList.add("correct");
        feedbackEl.innerText = "Incorrect. " + currentQuiz.feedback;
        feedbackEl.className = "quiz-feedback t-warning";
    }

    const scoreEl = document.getElementById("quizScore");
    scoreEl.innerText = `Score: ${score} / ${quizData.length}`;
    nextBtn.style.display = "inline-flex";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        // Quiz complete!
        const questionEl = document.getElementById("quizQuestion");
        const optionsEl = document.getElementById("quizOptions");
        const feedbackEl = document.getElementById("quizFeedback");
        const nextBtn = document.getElementById("nextBtn");
        const progressBar = document.getElementById("progressBar");

        progressBar.style.width = "100%";
        questionEl.innerText = "🎉 Quiz Completed!";
        optionsEl.innerHTML = `<h3>You scored ${score} out of ${quizData.length}!</h3>`;
        feedbackEl.innerText = score === quizData.length 
            ? "Flawless Score! You are a master of web development! 🚀" 
            : "Nice attempt! Review the frontend stack to achieve full mastery.";
        feedbackEl.className = "quiz-feedback t-success";
        nextBtn.style.display = "inline-flex";
        nextBtn.innerText = "Restart Quiz";
        nextBtn.onclick = () => {
            currentQuestion = 0;
            score = 0;
            nextBtn.innerText = "Next →";
            nextBtn.onclick = nextQuestion;
            loadQuiz();
        };
    }
}

// 3. Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll(".stat-number");
    
    const countUp = (element) => {
        const target = +element.getAttribute("data-target");
        let count = 0;
        const speed = target / 50; // speed up step based on target size
        
        const updateCount = () => {
            if (count < target) {
                count += Math.ceil(speed);
                if (count > target) count = target;
                element.innerText = count;
                setTimeout(updateCount, 30);
            } else {
                element.innerText = target;
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// 4. Live Local/Clock Ticker
function updateLocalTime() {
    const liveTimeEl = document.getElementById("liveTime");
    if (!liveTimeEl) return;
    
    setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        liveTimeEl.innerText = timeStr;
    }, 1000);
}

// 5. Utility functions
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 70, // subtract navbar height
            behavior: "smooth"
        });
    }
}

function copyCode() {
    const codeText = `async function fetchRecords(endpoint) {\n    try {\n        const response = await fetch(\`/api/v1/\${endpoint}\`, {\n            method: 'GET',\n            headers: {\n                'Content-Type': 'application/json'\n            }\n        });\n        if (!response.ok) throw new Error(\`Network error: \${response.status}\`);\n        return await response.json();\n    } catch (error) {\n        console.error("Failed to load repository data:", error.message);\n        return null;\n    }\n}`;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.querySelector(".copy-btn");
        copyBtn.innerText = "Copied! ✓";
        setTimeout(() => {
            copyBtn.innerText = "Copy Code";
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    // Start terminal typing
    setTimeout(typeCommand, 1000);

    // Initialize Quiz
    loadQuiz();

    // Start Live Clock
    updateLocalTime();

    // Start Intersection Observer for stats
    initStatsCounter();
});