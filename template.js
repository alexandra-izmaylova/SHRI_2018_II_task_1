var container = document.querySelector('.container');
var appendSmallCard = function (event) {
    var content = document.querySelector('#template-card-s').content;
    var card = document.importNode(content, true);
    card.querySelector('.title').textContent = event.title;
    card.querySelector('.devices').textContent = event.source;
    card.querySelector('.time').textContent = event.time;
    card.querySelector('.icons').src = "assets/" + event.icon + ".svg";
    if (event.description) {
        card.querySelector('.description_size-s').textContent =
            event.description;
    }
    else {
        card.querySelector('.card_bottom').style.display = 'none';
    }
    container.appendChild(card);
};
var appendMiddleCardThermal = function (event) {
    var content = document.querySelector('#template-card-m-thermal').content;
    var card = document.importNode(content, true);
    card.querySelector('.title').textContent = event.title;
    card.querySelector('.card-source').textContent = event.source;
    card.querySelector('.card-time').textContent = event.time;
    card.querySelector('.icons').src = "assets/" + event.icon + ".svg";
    if (event.description) {
        card.querySelector('.description_size-m').textContent = event.description;
    }
    else {
        card.querySelector('.card_bottom').style.display = 'none';
    }
    if (event.data) {
        var data = event.data;
        card.querySelector('.left_flex > .exact_data').textContent = data.temperature + " C";
        card.querySelector('.right_flex > .exact_data').textContent = data.humidity + " %";
    }
    container.appendChild(card);
};
var appendMiddleCardFridge = function (event) {
    var content = document.querySelector('#template-card-m-fridge').content;
    var card = document.importNode(content, true);
    card.querySelector('.title').textContent = event.title;
    card.querySelector('.card-source').textContent = event.source;
    card.querySelector('.card-time').textContent = event.time;
    card.querySelector('.icons').src = "assets/" + event.icon + ".svg";
    if (event.description) {
        card.querySelector('.description_size-m').textContent = event.description;
    }
    else {
        card.querySelector('.card_bottom').style.display = 'none';
    }
    if (event.data) {
        var data = event.data;
        card.querySelector('.button-yes > .choice').textContent = "" + data.buttons[0];
        card.querySelector('.button-no > .choice').textContent = "" + data.buttons[1];
    }
    container.appendChild(card);
};
var appendMiddleCardMusic = function (event) {
    var content = document.querySelector('#template-card-m-music').content;
    var card = document.importNode(content, true);
    card.querySelector('.title').textContent = event.title;
    card.querySelector('.card-source').textContent = event.source;
    card.querySelector('.card-time').textContent = event.time;
    card.querySelector('.icons').src = "assets/" + event.icon + ".svg";
    if (event.description) {
        card.querySelector('.description_size-m').textContent =
            event.description;
    }
    else {
        card.querySelector('.card_bottom').style.display = 'none';
    }
    if (event.data) {
        var data = event.data;
        card.querySelector('.name_of_the_song').textContent = data.artist + " - " + data.track.name;
        card.querySelector('.range_and_time > .details').textContent = "" + data.track.length;
        card.querySelector('.control_panel > .details').textContent = data.volume + " %";
    }
    container.appendChild(card);
};
var appendMiddleCardAc = function (event) {
    var content = document.querySelector('#template-card-m-ac').content;
    var card = document.importNode(content, true);
    card.querySelector('.title').textContent = event.title;
    card.querySelector('.card-source').textContent = event.source;
    card.querySelector('.card-time').textContent = event.time;
    card.querySelector('.icons').src = "assets/" + event.icon + ".svg";
    if (event.description) {
        card.querySelector('.description').textContent = event.description;
    }
    else {
        card.querySelector('.card_bottom').style.display = 'none';
    }
    container.appendChild(card);
};
var appendLargeCardCam = function (event) {
    var content = document.querySelector('#template-card-l-cam').content;
    var card = document.importNode(content, true);
    container.appendChild(card);
    card.querySelector('.title').textContent = event.title;
    card.querySelector('.card-source').textContent = event.source;
    card.querySelector('.card-time').textContent = event.time;
    if (event.description) {
        card.querySelector('.description').textContent = event.description;
    }
    else {
        card.querySelector('.corpus').style.display = 'none';
    }
};
var appendLargeCardStats = function (event) {
    var content = document.querySelector('#template-card-l-stats').content;
    var card = document.importNode(content, true);
    card.querySelector('.title').textContent = event.title;
    card.querySelector('.card-source').textContent = event.source;
    card.querySelector('.card-time').textContent = event.time;
    card.querySelector('.icons').src = "assets/" + event.icon + ".svg";
    if (event.description) {
        card.querySelector('.description_size-l').textContent = event.description;
    }
    else {
        card.querySelector('.corpus').style.display = 'none';
    }
    container.appendChild(card);
};
function addEvents(data) {
    data.events.forEach(function (event) {
        if (event.size === 's') {
            appendSmallCard(event);
        }
        else if (event.size === 'm') {
            if (event.icon === 'thermal') {
                appendMiddleCardThermal(event);
            }
            else if (event.icon === 'fridge') {
                appendMiddleCardFridge(event);
            }
            else if (event.icon === 'music') {
                appendMiddleCardMusic(event);
            }
            else if (event.icon === 'ac') {
                appendMiddleCardAc(event);
            }
        }
        if (event.size === 'l') {
            if (event.icon === 'cam') {
                appendLargeCardCam(event);
            }
            else if (event.icon === 'stats') {
                appendLargeCardStats(event);
            }
        }
    });
}
fetch('./events.json')
    .then(function (response) { return response.json(); })
    .then(function (data) { return addEvents(data); });
