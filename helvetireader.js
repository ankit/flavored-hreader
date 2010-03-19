// ==UserScript==
// @name        HelvetiReader: A New Flavor
// @description Helvetireader style for Google Reader
// @include     https://*.google.com/reader/view/*
// @include     http://*.google.com/reader/view/*
// @include     htt*://*.google.*/reader/view*
// @author      Helvetireader by Jon Hicks (http://www.hicksdesign.co.uk) with favicon override by MkFly
// ==/UserScript==

var currentHelvetiTheme = "day";

// var favvy = document.createElement('link');
// favvy.setAttribute('type', 'image/x-icon');
// favvy.setAttribute('rel', 'shortcut icon');
// favvy.setAttribute('href', 'http://www.helvetireader.com/favicon.png');
// var head = document.getElementsByTagName('head')[0];
// head.appendChild(favvy);

addThemeSwitchLink();
setTimeout(function(){
    switchHelvetiTheme(getThemeCookie("HelvetireaderTheme"));
}, 0);

/* Make the 'U' shortcut work with Helvetireader */
document.addEventListener("keypress",function(e){
    if(e.keyCode == 117)
    {
        setTimeout(function(){
            if(typeof(document.getElementsByClassName("banner")[0]) == "undefined")
                toggleView();
        }, 10);
    }
});

function toggleView(){
    var display = document.getElementById("nav").style.display;
    var status = (display == 'none') ? 1:0; //1 indicates fullscreen
    if(!status)
    {
        document.getElementById("nav").style.display = 'none';
        document.getElementById("search").style.display = 'none';
        document.getElementById("chrome").style.margin = "0px !important";
        document.getElementById("logo-container").style.display = 'none';
        document.getElementById("main").style.top = "15px";
    }
    else
    {
        document.getElementById("nav").style.display = 'block';
        document.getElementById("search").style.display = 'block';
        document.getElementById("chrome").style.margin = "-50px 0 10px 245px !important";
        document.getElementById("main").style.top = "65px";
    }
}

/* Add the theme switch link */
function addThemeSwitchLink(){
    var newDiv = document.createElement("div");
    newDiv.innerHTML = "";
    newDiv.id = "HelvetiThemeSwitcher";
    document.body.appendChild(newDiv);
    newDiv.addEventListener("click",function(e){
        if(currentHelvetiTheme == "day")
            switchHelvetiTheme("night");
        else
            switchHelvetiTheme("day");
    })
}

function switchHelvetiTheme(theme){
    currentHelvetiTheme = theme;
    var els = [document.body];
    var len = els.length;
    for(var i=0;i<len;i++)
    {
        el = els[i]
        if(theme == "day")
        {
            if(el)
            {
                if(el.className)
                    el.className = el.className.replace("HelvetiNight", "");
                el.className += " HelvetiDay";
            }
            document.getElementById("HelvetiThemeSwitcher").innerHTML = "go dark";
        }
        else if(theme == "night")
        {
            if(el)
            {
                if(el.className)
                    el.className = el.className.replace("HelvetiDay", "");
                el.className += " HelvetiNight";
            }
            document.getElementById("HelvetiThemeSwitcher").innerHTML = "go light";
        }
    }
    saveThemeCookie("HelvetireaderTheme", theme);
}

/* Code from http://www.quirksmode.org/js/cookies.html */

function saveThemeCookie(name, value, days){
    if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getThemeCookie(name){
    var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
    return "day"; //default
}

