// Timer variables
let totalTime = 60;
let remainingTime = totalTime;
let timer = null;

// XP and streak
let xp = Number(localStorage.getItem("xp")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;

// Initialize DOM
document.getElementById("xp").innerText = xp;
document.getElementById("streak").innerText = streak;
document.getElementById("timer").innerText = remainingTime;

// Detect language from URL
let urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get('lang') || 'javascript';
document.getElementById("langTitle").innerText = lang.charAt(0).toUpperCase() + lang.slice(1) + " Arena";

// Timer functions
function startTimer(){
    if(timer) return;
    timer = setInterval(()=>{
        if(remainingTime>0){
            remainingTime--;
            document.getElementById("timer").innerText = remainingTime;
        } else {
            clearInterval(timer);
            timer = null;
            alert("⏰ Time Over!");
        }
    },1000);
}

function pauseTimer(){
    clearInterval(timer);
    timer=null;
}

function resetTimer(){
    pauseTimer();
    remainingTime = totalTime;
    document.getElementById("timer").innerText = remainingTime;
}

// Submit function
function submitCode(){
    pauseTimer();
    let code = document.getElementById("codeArea").value;

    // Basic correct solution check
    if(code.includes("split") && code.includes("reverse")){
        xp += 10;
        streak++;
        showExplain(true);
    } else {
        streak = 0;
        showExplain(false);
    }

    localStorage.setItem("xp",xp);
    localStorage.setItem("streak",streak);
    document.getElementById("xp").innerText = xp;
    document.getElementById("streak").innerText = streak;
}

// Show solution
function showSolution(){
    document.getElementById("codeArea").value=
`function reverse(str){
  return str.split('').reverse().join('');
}`;
}

// Show explanation
function showExplain(correct){
    const box = document.getElementById("explainBox");
    box.innerHTML = correct
      ? `<h3 style="color:#22c55e">Correct!</h3>
         <p><b>split()</b> converts string to array → 
         <b>reverse()</b> flips it → 
         <b>join()</b> makes string again.</p>`
      : `<h3 style="color:#ef4444">Wrong!</h3>
         <p>Hint: convert string to array, reverse it, then join.</p>`;
}

// Live Mistake Detector
document.getElementById("codeArea").addEventListener("input",()=>{
    let code = document.getElementById("codeArea").value;
    let lintBox = document.getElementById("lintBox");
    let warnings = [];
    
    if((code.match(/\{/g)||[]).length !== (code.match(/\}/g)||[]).length){
        warnings.push("⚠ Mismatched braces { }");
    }
    if((code.match(/\(/g)||[]).length !== (code.match(/\)/g)||[]).length){
        warnings.push("⚠ Mismatched parentheses ( )");
    }
    if(code.includes("function") && !code.includes("{")){
        warnings.push("⚠ Function missing braces");
    }
    lintBox.innerHTML = warnings.join("<br>") || "";
});
