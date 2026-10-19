const attrakciok = [
    {
        title: "Családi hullámvasút",
        category: "Kaland",
        desc: "Lágy kanyarok, amit a kisebbek is kibírnak egy felnőtt mellett.",
        minCm: 100,
        image: "park/coaster.jpg"
    },
    {
        title: "Mese óriáskerék",
        category: "Nyugodt",
        desc: "Lassú kör, közben rálátsz az egész parkra.",
        minCm: 90,
        image: "park/wheel.jpg"
    },
    {
        title: "Vízi csúszda",
        category: "Vizes",
        desc: "Három pálya, a végén sekély medence. Törölközőt hozz magaddal.",
        minCm: 110,
        image: "park/water.jpg"
    },
    {
        title: "Tündér körhinta",
        category: "Kicsiknek",
        desc: "Festett lovak, halk zene. A picik felnőttel ülhetnek fel.",
        minCm: 80,
        image: "park/carousel.jpg"
    },
    {
        title: "Erdei vasút",
        category: "Kaland",
        desc: "Rövid kör a fák között, megállók nélkül.",
        minCm: 90,
        image: "park/train.jpg"
    },
    {
        title: "Kalóz hajó",
        category: "Izgalmas",
        desc: "Hintázó hajó. Ha érzékeny a gyomrod, ezt hagyd ki.",
        minCm: 120,
        image: "park/ship.jpg"
    }
];

const jegyek = [
    { id: "felnott", name: "Felnőtt napijegy", price: 5000, note: "14 évtől" },
    { id: "gyerek", name: "Gyermek / nyugdíjas", price: 3500, note: "3–13 év, vagy 65+" },
    { id: "esti", name: "Esti belépő", price: 4000, note: "16:00-tól, vattacukorral" }
];

const orak = [
    { day: "Hétfő", time: "10:00–18:00", today: true },
    { day: "Kedd", time: "10:00–18:00", today: false },
    { day: "Szerda", time: "10:00–18:00", today: false },
    { day: "Csütörtök", time: "10:00–18:00", today: false },
    { day: "Péntek", time: "10:00–19:00", today: false },
    { day: "Szombat", time: "10:00–19:00", today: false },
    { day: "Vasárnap", time: "10:00–19:00", today: false }
];

const etelek = [
    { name: "Vattacukor", price: 800, note: "A bejárati bódénál" },
    { name: "Palacsinta", price: 1200, note: "Lekvár vagy nutella" },
    { name: "Pizzaszelet", price: 1500, note: "A kerthelyiségben" }
];

let valasztottJegy = "felnott";

function forint(ertek) {
    const szoveg = String(ertek);
    let ki = "";
    for (let i = 0; i < szoveg.length; i++) {
        const hatulrol = szoveg.length - i;
        if (i > 0 && hatulrol % 3 === 0) {
            ki += " ";
        }
        ki += szoveg[i];
    }
    return ki + " Ft";
}

function magassagSzures() {
    const mezo = document.getElementById("magassag");
    const lista = document.getElementById("attrakciokLista");
    const uzenet = document.getElementById("magassagUzenet");
    const ures = document.getElementById("uresUzenet");
    const cm = Number(mezo.value);
    const jo = Number.isInteger(cm) && cm >= 70 && cm <= 200;

    lista.innerHTML = "";
    if (!jo) {
        uzenet.textContent = "Egész számot adj meg 70 és 200 között.";
        ures.hidden = true;
        return;
    }

    const lathato = attrakciok.filter(function (elem) {
        return cm >= elem.minCm;
    });

    uzenet.textContent = lathato.length + " attrakció elérhető " + cm + " cm-rel.";
    ures.hidden = lathato.length !== 0;

    lathato.forEach(function (elem) {
        lista.innerHTML +=
            "<article class='attrakcio'>" +
            "<img src='" + elem.image + "' alt=''>" +
            "<div>" +
            "<p class='kategoria'>" + elem.category + "</p>" +
            "<h3>" + elem.title + "</h3>" +
            "<p class='halk'>" + elem.desc + "</p>" +
            "<p><b>Minimum " + elem.minCm + " cm</b></p>" +
            "</div></article>";
    });
}

function orakKirakasa() {
    const tabla = document.getElementById("orakTabla");
    let html = "";
    orak.forEach(function (sor) {
        const osztaly = sor.today ? " class='ma'" : "";
        html += "<tr" + osztaly + "><th>" + sor.day + "</th><td>" + sor.time + "</td></tr>";
    });
    tabla.innerHTML = html;
}

function etelKirakasa() {
    const lista = document.getElementById("etelLista");
    let html = "";
    etelek.forEach(function (elem) {
        html +=
            "<li><span><b>" + elem.name + "</b><br><span class='halk'>" + elem.note +
            "</span></span><span class='ar'>" + forint(elem.price) + "</span></li>";
    });
    lista.innerHTML = html;
}

function jegyGombok() {
    const tarolo = document.getElementById("jegyValaszto");
    tarolo.innerHTML = "";
    jegyek.forEach(function (jegy) {
        const gomb = document.createElement("button");
        gomb.type = "button";
        gomb.className = "jegy-gomb";
        if (jegy.id === valasztottJegy) {
            gomb.classList.add("aktiv");
        }
        gomb.innerHTML =
            "<span>" + jegy.name + "</span><strong>" + forint(jegy.price) +
            "</strong><span class='halk'>" + jegy.note + "</span>";
        gomb.addEventListener("click", function () {
            valasztottJegy = jegy.id;
            jegyGombok();
            osszegFrissites();
        });
        tarolo.appendChild(gomb);
    });
}

function kivalasztottJegy() {
    for (let i = 0; i < jegyek.length; i++) {
        if (jegyek[i].id === valasztottJegy) {
            return jegyek[i];
        }
    }
    return jegyek[0];
}

function osszegFrissites() {
    const darab = Number(document.getElementById("darab").value);
    const jo = Number.isInteger(darab) && darab >= 1 && darab <= 10;
    const cel = document.getElementById("vegosszeg");
    const esti = document.getElementById("estiMegjegyzes");
    esti.hidden = valasztottJegy !== "esti";
    if (!jo) {
        cel.textContent = "–";
        return 0;
    }
    const osszeg = kivalasztottJegy().price * darab;
    cel.textContent = forint(osszeg);
    return osszeg;
}

document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const menuGomb = document.getElementById("menuGomb");
    const form = document.getElementById("jegyForm");
    const modal = document.getElementById("sikeresModal");

    orakKirakasa();
    etelKirakasa();
    jegyGombok();
    magassagSzures();
    osszegFrissites();

    document.getElementById("magassag").addEventListener("input", magassagSzures);
    document.getElementById("magassagForm").addEventListener("submit", function (event) {
        event.preventDefault();
    });
    document.getElementById("darab").addEventListener("input", osszegFrissites);

    menuGomb.addEventListener("click", function () {
        const nyitva = menu.classList.toggle("nyitva");
        menuGomb.setAttribute("aria-expanded", nyitva ? "true" : "false");
        menuGomb.textContent = nyitva ? "Bezár" : "Menü";
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("nyitva");
            menuGomb.setAttribute("aria-expanded", "false");
            menuGomb.textContent = "Menü";
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const hiba = document.getElementById("jegyHiba");
        const darab = Number(document.getElementById("darab").value);
        const jo = Number.isInteger(darab) && darab >= 1 && darab <= 10;
        if (!jo) {
            hiba.hidden = false;
            hiba.textContent = "A darabszám 1 és 10 között legyen.";
            return;
        }
        hiba.hidden = true;
        document.getElementById("modalOsszeg").textContent = forint(kivalasztottJegy().price * darab);
        modal.hidden = false;
        valasztottJegy = "felnott";
        document.getElementById("darab").value = "1";
        jegyGombok();
        osszegFrissites();
    });

    document.getElementById("modalBezar").addEventListener("click", function () {
        modal.hidden = true;
    });
});
