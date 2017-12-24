var library;
var librarysize;
var hand;
var handsize;
var grave;
var reveal;
var revealsize;
var field;
var NullCard = "../CommonImage/NullCard.png";
var image_urls = [
    [
        "../CommonImage/card_club_01.png",
        "../CommonImage/card_club_02.png",
        "../CommonImage/card_club_03.png",
        "../CommonImage/card_club_04.png",
        "../CommonImage/card_club_05.png",
        "../CommonImage/card_club_06.png",
        "../CommonImage/card_club_07.png",
        "../CommonImage/card_club_08.png",
        "../CommonImage/card_club_09.png",
        "../CommonImage/card_club_10.png",
        "../CommonImage/card_club_11.png",
        "../CommonImage/card_club_12.png",
        "../CommonImage/card_club_13.png"
    ],
    [
        "../CommonImage/card_diamond_01.png",
        "../CommonImage/card_diamond_02.png",
        "../CommonImage/card_diamond_03.png",
        "../CommonImage/card_diamond_04.png",
        "../CommonImage/card_diamond_05.png",
        "../CommonImage/card_diamond_06.png",
        "../CommonImage/card_diamond_07.png",
        "../CommonImage/card_diamond_08.png",
        "../CommonImage/card_diamond_09.png",
        "../CommonImage/card_diamond_10.png",
        "../CommonImage/card_diamond_11.png",
        "../CommonImage/card_diamond_12.png",
        "../CommonImage/card_diamond_13.png"
    ],
    [
        "../CommonImage/card_heart_01.png",
        "../CommonImage/card_heart_02.png",
        "../CommonImage/card_heart_03.png",
        "../CommonImage/card_heart_04.png",
        "../CommonImage/card_heart_05.png",
        "../CommonImage/card_heart_06.png",
        "../CommonImage/card_heart_07.png",
        "../CommonImage/card_heart_08.png",
        "../CommonImage/card_heart_09.png",
        "../CommonImage/card_heart_10.png",
        "../CommonImage/card_heart_11.png",
        "../CommonImage/card_heart_12.png",
        "../CommonImage/card_heart_13.png"
    ],
    [
        "../CommonImage/card_spade_01.png",
        "../CommonImage/card_spade_02.png",
        "../CommonImage/card_spade_03.png",
        "../CommonImage/card_spade_04.png",
        "../CommonImage/card_spade_05.png",
        "../CommonImage/card_spade_06.png",
        "../CommonImage/card_spade_07.png",
        "../CommonImage/card_spade_08.png",
        "../CommonImage/card_spade_09.png",
        "../CommonImage/card_spade_10.png",
        "../CommonImage/card_spade_11.png",
        "../CommonImage/card_spade_12.png",
        "../CommonImage/card_spade_13.png"
    ]
];
var click_event_0 = (function () {
    function click_event_0(func) {
        this.func = func;
    }
    click_event_0.prototype.run = function () {
        this.func();
    };
    return click_event_0;
}());
var click_event_1 = (function () {
    function click_event_1(func, val) {
        this.func = func;
        this.val = val;
    }
    click_event_1.prototype.run = function () {
        this.func(this.val);
    };
    return click_event_1;
}());
var click_event_2 = (function () {
    function click_event_2(func, val, val2) {
        this.func = func;
        this.val = val;
        this.val2 = val2;
    }
    click_event_2.prototype.run = function () {
        this.func(this.val, this.val2);
    };
    return click_event_2;
}());
var card_click_action;
var reveal_click_action;
var field_click_action;
function reset() {
    var elem = document.getElementById("deck");
    elem.src = "../CommonImage/cardgame_deck.png";
    library = new Array(52);
    hand = new Array(7);
    grave = document.getElementById("grave").getContext("2d");
    reveal = new Array(5);
    card_click_action = new Array(7);
    reveal_click_action = new Array(5);
    var f = document.getElementById("field");
    f.src = NullCard;
    librarysize = 52;
    handsize = 0;
    grave.setTransform(1, 0, 0, 1, 0, 0);
    grave.fillStyle = "white";
    grave.fillRect(0, 0, 1000, 200);
    grave.scale(0.33, 0.33);
    revealsize = 0;
    field = 0;
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 13; ++j) {
            library[13 * i + j] = [i, j];
        }
    }
    for (var i = 0; i < 7; ++i) {
        var elem = document.getElementById("card" + i);
        elem.src = NullCard;
    }
    for (var i = 0; i < 5; ++i) {
        var r = document.getElementById("reveal" + i);
        r.src = NullCard;
    }
    shuffle();
    card_draw();
    card_draw();
    card_draw();
    card_draw();
    card_draw();
    card_draw();
    card_draw();
}
window.onload = function () {
    reset();
};
function shuffle() {
    for (var i = librarysize - 1; i > 0; --i) {
        var a = Math.floor(Math.random() * (i + 1));
        var b = (Math.floor(Math.random() * (i + 1)) + a) % (i + 1);
        var c = library[i];
        library[i] = library[b];
        library[b] = c;
    }
}
function hand_print(mark, num, erea) {
    var elem = document.getElementById("card" + erea);
    elem.src = image_urls[mark][num];
    elem.className = "card";
    card_click_action[erea] = new click_event_1(normal_click, erea);
}
function card_draw() {
    if (handsize != 7 && librarysize > 0) {
        hand[handsize] = library[librarysize - 1];
        var _a = hand[handsize], x = _a[0], y = _a[1];
        hand_print(x, y, handsize);
        ++handsize;
        --librarysize;
    }
    if (librarysize == 0) {
        var elem = document.getElementById("deck");
        elem.src = NullCard;
    }
}
function normal_click(x) {
    var _a = hand[x], hs = _a[0], hv = _a[1];
    for (var i = 0; i < handsize; ++i) {
        var e = document.getElementById("card" + i);
        var _b = hand[i], s = _b[0], v = _b[1];
        if (s == hs) {
            card_click_action[i] = new click_event_2(pair_click, x, i);
        }
        else {
            e.className = "card nonselect";
            card_click_action[i] = new click_event_0(function () { });
        }
    }
    var elem = document.getElementById("card" + x);
    elem.className = "card selected";
    card_click_action[x] = new click_event_1(cancel, x);
    var f = document.getElementById("field");
    console.log(hv);
    if (field == hv) {
        field_click_action = new click_event_1(cast, x);
        if (field == 0) {
            f.className = "card selected";
        }
    }
    else {
        f.className = "card nonselect";
    }
}
function pair_click(x, t) {
    var xi = new Image();
    var _a = hand[x], xs = _a[0], xv = _a[1];
    xi.src = image_urls[xs][xv];
    grave.drawImage(xi, 0, 0);
    grave.transform(1, 0, 0, 1, 81, 0);
    var ti = new Image();
    var _b = hand[t], ts = _b[0], tv = _b[1];
    ti.src = image_urls[ts][tv];
    grave.drawImage(ti, 0, 0);
    grave.transform(1, 0, 0, 1, 81, 0);
    if (x > t) {
        var c = x;
        x = t;
        t = c;
    }
    for (var i = x; i < t - 1; ++i) {
        hand[i] = hand[i + 1];
        var _c = hand[i], h = _c[0], s = _c[1];
        hand_print(h, s, i);
    }
    for (var i = t - 1; i < handsize - 2; ++i) {
        hand[i] = hand[i + 2];
        var _d = hand[i], h = _d[0], s = _d[1];
        hand_print(h, s, i);
    }
    for (var i = handsize - 2; i < handsize; ++i) {
        var e = document.getElementById("card" + i);
        e.src = NullCard;
        e.className = "card";
    }
    handsize = handsize - 2;
    for (var i = 0; i < handsize; ++i) {
        var e = document.getElementById("card" + i);
        e.className = "card nonselect";
        card_click_action[i] = new click_event_0(function () { });
    }
    for (var i = 0; i < Math.min(5, librarysize); ++i) {
        var _e = library[librarysize - i - 1], h = _e[0], s = _e[1];
        reveal[i] = library[librarysize - i - 1];
        var elem = document.getElementById("reveal" + i);
        elem.src = image_urls[h][s];
        reveal_click_action[i] = new click_event_1(reveal_click, i);
    }
    revealsize = Math.min(5, librarysize);
    librarysize -= Math.min(5, librarysize);
    var f = document.getElementById("field");
    f.className = "card";
}
function reveal_click(x) {
    for (var i = 0; i < revealsize; ++i) {
        var elem = document.getElementById("reveal" + i);
        elem.src = NullCard;
        reveal_click_action[i] = new click_event_0(function () { });
        if (i != x) {
            library[librarysize] = reveal[i];
            ++librarysize;
        }
        else {
            hand[handsize] = reveal[i];
            var _a = reveal[i], h = _a[0], s = _a[1];
            hand_print(h, s, handsize);
            ++handsize;
        }
    }
    shuffle();
    for (var i = 0; i < 7; ++i) {
        var e = document.getElementById("card" + i);
        card_click_action[i] = new click_event_1(normal_click, i);
        e.className = "card";
    }
    for (var i = handsize; i < 7; ++i) {
        card_click_action[i] = new click_event_0(function () { });
    }
}
function cancel(x) {
    for (var i = 0; i < 7; ++i) {
        var e = document.getElementById("card" + i);
        card_click_action[i] = new click_event_1(normal_click, i);
        e.className = "card";
    }
    for (var i = handsize; i < 7; ++i) {
        card_click_action[i] = new click_event_0(function () { });
    }
    var f = document.getElementById("field");
    f.className = "card";
}
function cast(x) {
    var f = document.getElementById("field");
    var _a = hand[x], hs = _a[0], hv = _a[1];
    f.src = image_urls[hs][hv];
    f.className = "card";
    field_click_action = new click_event_0(function () { });
    ++field;
    for (var i = x; i < handsize - 1; ++i) {
        hand[i] = hand[i + 1];
        var _b = hand[i], h = _b[0], s = _b[1];
        hand_print(h, s, i);
    }
    --handsize;
    if (field == 13) {
        alert("You Win!!");
        for (var i = 0; i < handsize; ++i) {
            var e = document.getElementById("card" + i);
            card_click_action[i] = new click_event_0(function () { });
            e.className = "card";
        }
        var ela = document.getElementById("card" + handsize);
        ela.className = "card";
        ela.src = NullCard;
    }
    else {
        for (var i = 0; i < handsize; ++i) {
            library[librarysize] = hand[i];
            ++librarysize;
        }
        handsize = 0;
        shuffle();
        for (var i = 0; i < 7; ++i) {
            card_draw();
        }
    }
}
