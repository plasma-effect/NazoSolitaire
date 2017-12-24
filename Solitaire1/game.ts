var library: [number, number][];
var librarysize: number;
var hand: [number, number][];
var handsize: number;
var grave: CanvasRenderingContext2D;
var reveal: [number, number][];
var revealsize: number;
var field: number;

const NullCard = "../CommonImage/NullCard.png";

var image_urls = 
[
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

interface click_event
{
    run();
}
class click_event_0 implements click_event
{
    constructor(public func: ()=>void)
    {

    }
    public run()
    {
        this.func();
    }
}
class click_event_1 implements click_event
{
    constructor(public func: (v: number)=>void, public val: number)
    {

    }
    public run()
    {
        this.func(this.val);
    }
}
class click_event_2 implements click_event
{
    constructor(public func: (v: number, u: number)=>void, public val: number,public val2: number)
    {

    }
    public run()
    {
        this.func(this.val, this.val2);
    }
}

var card_click_action: click_event[];
var reveal_click_action: click_event[];
var field_click_action: click_event;

function reset()
{
    var elem = <HTMLImageElement>document.getElementById("deck");
    elem.src = "../CommonImage/cardgame_deck.png";

    library = new Array<[number, number]>(52);
    hand = new Array<[number, number]>(7);
    grave = (<HTMLCanvasElement>document.getElementById("grave")).getContext("2d");
    reveal = new Array<[number, number]>(5);
    card_click_action = new Array<click_event>(7);
    reveal_click_action = new Array<click_event>(5);

    var f = <HTMLImageElement>document.getElementById("field");
    f.src = NullCard;

    librarysize = 52;
    handsize = 0;
    grave.setTransform(1, 0, 0, 1, 0, 0);
    grave.fillStyle = "white";
    grave.fillRect(0, 0, 1000, 200);
    grave.scale(0.33, 0.33);
    revealsize = 0;
    field = 0;

    for(var i = 0; i < 4; ++i)
    {
        for(var j = 0; j < 13; ++j)
        {
            library[13*i+j] = [i, j];
        }
    }
    for(var i = 0; i < 7; ++i)
    {
        var elem = <HTMLImageElement>document.getElementById("card"+i);
        elem.src = NullCard;
    }
    for(var i = 0; i < 5; ++i)
    {
        var r = <HTMLImageElement>document.getElementById("reveal"+i);
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

window.onload=()=>
{
    reset();
}

function shuffle()
{
    for(var i = librarysize-1; i > 0; --i)
    {
        var a = Math.floor(Math.random()*(i+1));
        var b = (Math.floor(Math.random()*(i+1)) + a) % (i + 1);
        var c = library[i];
        library[i] = library[b];
        library[b] = c;
    }
}

function hand_print(mark: number, num: number, erea: number)
{
    var elem = <HTMLImageElement>document.getElementById("card" + erea);
    elem.src = image_urls[mark][num];
    elem.className = "card";
    card_click_action[erea] = new click_event_1(normal_click, erea);
}

function card_draw()
{
    if(handsize != 7&&librarysize > 0)
    {
        hand[handsize]=library[librarysize-1];
        var [x, y] = hand[handsize];
        hand_print(x, y, handsize);
        ++handsize;
        --librarysize;
    }
    if(librarysize == 0)
    {
        var elem = <HTMLImageElement>document.getElementById("deck");
        elem.src = NullCard;
    }
}

function normal_click(x: number)
{
    var [hs, hv] = hand[x];
    for(var i = 0;i < handsize; ++i)
    {
        var e = <HTMLImageElement>document.getElementById("card"+i);
        var [s, v] = hand[i];
        if(s == hs)
        {
            card_click_action[i] = new click_event_2(pair_click, x, i);
        }
        else
        {
            e.className = "card nonselect";
            card_click_action[i] = new click_event_0(()=>{});
        }
    }
    var elem = <HTMLImageElement>document.getElementById("card"+x);
    elem.className = "card selected";
    card_click_action[x] = new click_event_1(cancel, x);
    var f = <HTMLImageElement>document.getElementById("field");
    console.log(hv);
    if(field == hv)
    {
        field_click_action = new click_event_1(cast, x);
        if(field == 0)
        {
            f.className = "card selected";
        }
    }
    else
    {
        f.className = "card nonselect";
    }
}

function pair_click(x: number, t: number)
{
    var xi = new Image();
    var [xs, xv] = hand[x];
    xi.src = image_urls[xs][xv];
    grave.drawImage(xi, 0, 0);
    grave.transform(1, 0, 0, 1, 81, 0);
    var ti = new Image();
    var [ts, tv] = hand[t];
    ti.src = image_urls[ts][tv];
    grave.drawImage(ti, 0, 0);
    grave.transform(1, 0, 0, 1, 81, 0);
    
    if(x > t)
    {
        var c = x;
        x = t;
        t = c;
    }
    for(var i = x; i < t - 1; ++i)
    {
        hand[i] = hand[i + 1];
        var [h, s] = hand[i];
        hand_print(h, s, i);
    }
    for(var i = t - 1; i < handsize - 2; ++i)
    {
        hand[i] = hand[i + 2];
        var [h, s] = hand[i];
        hand_print(h, s, i);
    }
    for(var i = handsize - 2; i < handsize; ++i)
    {
        var e = <HTMLImageElement>document.getElementById("card"+i);
        e.src = NullCard;
        e.className = "card";
    }
    handsize = handsize - 2;
    for(var i = 0; i < handsize; ++i)
    {
        var e = <HTMLImageElement>document.getElementById("card"+i);
        e.className = "card nonselect";
        card_click_action[i] = new click_event_0(()=>{});
    }
    for(var i = 0; i < Math.min(5, librarysize); ++i)
    {
        var [h, s] = library[librarysize - i - 1];
        reveal[i] = library[librarysize - i - 1];
        var elem = <HTMLImageElement>document.getElementById("reveal" + i);
        elem.src = image_urls[h][s];
        reveal_click_action[i] = new click_event_1(reveal_click, i);
    }
    revealsize = Math.min(5, librarysize);
    librarysize -= Math.min(5, librarysize);
    var f = <HTMLImageElement>document.getElementById("field");
    f.className = "card";
}

function reveal_click(x: number)
{
    for(var i = 0;i < revealsize; ++i)
    {
        var elem = <HTMLImageElement>document.getElementById("reveal" + i);
        elem.src = NullCard;
        reveal_click_action[i] = new click_event_0(()=>{});
        if(i != x)
        {
            library[librarysize] = reveal[i];
            ++librarysize;
        }
        else
        {
            hand[handsize] = reveal[i];
            var [h, s] = reveal[i];
            hand_print(h, s, handsize);
            ++handsize;
        }
    }
    shuffle();
    for(var i = 0; i < 7; ++i)
    {
        var e = <HTMLImageElement>document.getElementById("card"+i);
        card_click_action[i] = new click_event_1(normal_click, i);
        e.className = "card";
    }
    for(var i = handsize; i < 7; ++i)
    {
        card_click_action[i] = new click_event_0(()=>{});
    }
}

function cancel(x: number)
{
    for(var i = 0; i < 7; ++i)
    {
        var e = <HTMLImageElement>document.getElementById("card"+i);
        card_click_action[i] = new click_event_1(normal_click, i);
        e.className = "card";
    }
    for(var i = handsize; i < 7; ++i)
    {
        card_click_action[i] = new click_event_0(()=>{});
    }
    var f = <HTMLImageElement>document.getElementById("field");
    f.className = "card";
}

function cast(x: number)
{
    var f = <HTMLImageElement>document.getElementById("field");
    var [hs, hv] = hand[x];
    f.src = image_urls[hs][hv];
    f.className = "card";
    field_click_action = new click_event_0(()=>{});
    ++field;
    for(var i = x; i < handsize - 1; ++i)
    {
        hand[i] = hand[i + 1];
        var [h, s] = hand[i];
        hand_print(h, s, i);
    }
    --handsize;
    if(field == 13)
    {
        alert("You Win!!");
        for(var i = 0; i < handsize; ++i)
        {
            var e = <HTMLImageElement>document.getElementById("card"+i);
            card_click_action[i] = new click_event_0(()=>{});
            e.className = "card";
        }
        var ela = <HTMLImageElement>document.getElementById("card"+handsize);
        ela.className = "card";
        ela.src = NullCard;
    }
    else
    {
        for(var i = 0; i < handsize; ++i)
        {
            library[librarysize] = hand[i];
            ++librarysize;
        }
        handsize = 0;
        shuffle();
        for(var i = 0; i < 7; ++i)
        {
            card_draw();
        }
    }
}