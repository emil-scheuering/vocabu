let isUnderConstruction = false;
let splashScreenShown = true;
let isBeta = false;

let randomNames = ["Vocabu Fan", "Vocabulary Master", "A-Student"];

var app = document.getElementById("app");

if(window.location.hash == ""){
    window.location.hash = "#home";
}else{
    hash_change();
}

window.addEventListener("keyup", (e)=>{
    if(e.key === "enter"){
        /* do things.. */
    }
});

setTimeout(()=>{
    document.getElementById("splash-screen").classList.remove("hidden");
}, 500);

setTimeout(()=>{
    document.getElementById("splash-screen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    splashScreenShown = false;
    hash_change();
}, 2000);

function hash_change(){
    if(splashScreenShown) return; /* skip while splash screen is displayed */

    var hash = window.location.hash;

    app.classList.add("hidden");
    switch(hash){
        case "#home":
        {
            if(localStorage.getItem("setUp") == "1"){
                LoadHomeScreen();
            }else{
                window.location.hash = "#setup";
            }
            break;
        }
        case "#setup":
        {
            if(localStorage.getItem("setUp") == "1"){
                LoadHomeScreen();
            }else{
                LoadSetupScreen();
            }
        }
        case "#quiz":
            LoadQuizScreen();
            break;
        default:
            app.classList.remove("hidden");
            app.innerHTML = "<h2 style='padding:10%'><img src='./img/icon_128.png'><br>Error 404: Could not find the page \""+hash+"\"</h2>";
            break;
    }
};
window.addEventListener("hashchange", ()=>{
    hash_change();
});

function LoadSetupScreen(){
    var setupBG = document.createElement("div");
    setupBG.className = "setup-bg";
    app.appendChild(setupBG);

    var setupContainer = document.createElement("div");
    setupContainer.className = "setup-container";
    setupBG.appendChild(setupContainer);

    var setupDIV = document.createElement("center");
    setupContainer.appendChild(setupDIV);

    var _header = document.createElement("h1");
    _header.className = "not-bold no-margin";
    _header.innerHTML = "Welcome to Vocabu";
    setupDIV.appendChild(_header);

    var _text = document.createElement("p");
    _text.className = "no-margin";
    _text.innerHTML = "Enter your (nick)name down below:";
    setupDIV.appendChild(_text);
    setupDIV.appendChild(document.createElement("br"));

    var _input = document.createElement("input");
    _input.placeholder = "Nickname";
    _input.autofocus = true;
    _input.value = "";
    _input.type = "text";
    setupDIV.appendChild(_input);
    setupDIV.appendChild(document.createElement("br"));

    var _error = document.createElement("span");
    _error.className = "error-string hidden";
    _error.innerHTML = "Please enter a name";
    setupDIV.appendChild(_error);

    var _btnContinue = document.createElement("button");
    _btnContinue.innerHTML = "Next";
    _btnContinue.addEventListener("click", ()=>{
        if(_input.value.length < 1 || _input.value[0] == " "){
            _error.classList.remove("hidden");
        }else{
            _error.classList.add("hidden");
            _btnContinue.disabled = true;
            _btnRandom.disabled = true;

            localStorage.setItem("user_name", _input.value);
            localStorage.setItem("setUp", "1");

            window.location.hash = "#home";
        }
    });
    setupDIV.appendChild(_btnContinue);

    var _btnRandom = document.createElement("button");
    _btnRandom.innerHTML = "Random name";
    _btnRandom.className = "btn-secondary";
    _btnRandom.addEventListener("click", ()=>{
        _input.value = randomNames[Math.floor(Math.random() * randomNames.length)];
    });
    setupDIV.appendChild(_btnRandom);

    app.classList.remove("hidden");
}

function LoadHomeScreen(){
    UnderConstruction();

    app.classList.remove("hidden");
}

function UnderConstruction(){
    app.innerHTML = "<h2 style='padding:10%'><img src='./img/icon_128.png'><br>This site is under construction.</h2>";
}

if(isUnderConstruction){
    UnderConstruction();
}