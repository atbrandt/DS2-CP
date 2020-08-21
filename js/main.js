/*
Backend engine for Dark Souls II Character Planner
*/

// Create an array containing disctionaries of default stats for classes
var classDefaults = [{
    "name": "Warrior",
    "slv": 12,
    "stats": [7, 6, 6, 5, 15, 11, 5, 5, 5],
    "total": 65
}, {
    "name": "Knight",
    "slv": 13,
    "stats": [12, 6, 7, 4, 11, 8, 9, 3, 6],
    "total": 66
}, {
    "name": "Swordsman",
    "slv": 12,
    "stats": [4, 8, 4, 6, 9, 16, 6, 7, 5],
    "total": 65
}, {
    "name": "Bandit",
    "slv": 11,
    "stats": [9, 7, 11, 2, 9, 14, 3, 1, 8],
    "total": 64
}, {
    "name": "Cleric",
    "slv": 14,
    "stats": [10, 3, 8, 10, 11, 5, 4, 4, 12],
    "total": 67
}, {
    "name": "Sorcerer",
    "slv": 11,
    "stats": [5, 6, 5, 12, 3, 7, 8, 14, 4],
    "total": 64
}, {
    "name": "Explorer",
    "slv": 10,
    "stats": [7, 6, 9, 7, 6, 6, 12, 5, 5],
    "total": 63
}, {
    "name": "Deprived",
    "slv": 1,
    "stats": [6, 6, 6, 6, 6, 6, 6, 6, 6],
    "total": 54
}];


// Determine if a value is even
function isEven(n) {
    return (
        n === parseFloat(n)
        ? !(n % 2)
        : undefined
    );
}


// Calculate total stamina
function getStamina(curEnd) {
    var stamina = 80;

    if (curEnd < 21) {
        stamina = curEnd * 2 + stamina;
    } else {
        stamina = curEnd + 20 + stamina;
    }

    document.getElementById("stam").innerHTML = stamina + " (" + stamina + ")";
}


// Calculate total max burden
function getBurden(curVit) {
    var maxBurden = 38.5;
    var curBurden = 0;

    if (curVit < 30) {
        maxBurden = curVit * 1.5 + maxBurden;
    } else if (curVit < 50) {
        maxBurden = curVit + 14.5 + maxBurden;
    } else if (curVit < 71) {
        maxBurden = (curVit - 49) * 0.5 + 63.5 + maxBurden;
    } else if (isEven(curVit - 70) === true) {
        maxBurden = (curVit - 70) * 0.25 + 74 + maxBurden;
    } else {
        maxBurden = (curVit - 70) * 0.25 + 73.75 + maxBurden;
    }

    document.getElementById("maxburden").innerHTML = maxBurden + " (" + maxBurden + ")";
    document.getElementById("curburden").innerHTML = curBurden + " / " + Math.round(curBurden / maxBurden * 1000) / 10 + "%";
}


// Calculate total attunement slots
function getAttune(curAtn) {
    var slots = 0;

    if (curAtn < 10) {
        slots = 0;
    } else if (curAtn < 13) {
        slots = 1;
    } else if (curAtn < 16) {
        slots = 2;
    } else if (curAtn < 20) {
        slots = 3;
    } else if (curAtn < 25) {
        slots = 4;
    } else if (curAtn < 30) {
        slots = 5;
    } else if (curAtn < 40) {
        slots = 6;
    } else if (curAtn < 50) {
        slots = 7;
    } else if (curAtn < 60) {
        slots = 8;
    } else if (curAtn < 75) {
        slots = 9;
    } else {
        slots = 10;
    }

    document.getElementById("atnslots").innerHTML = slots + " (" + slots + ")";
}


// Calculate total agility
function getAgility(curAtn, curAdp) {
    var agility = 80;

    if (curAtn * 0.25 + curAdp * 0.75 >= 5) {
        agility = Math.floor(curAtn * 0.25 + curAdp * 0.75 + agility);
        if (agility >= 110) {
            agility = Math.floor((agility - 110) / 7 + 110);
        }
    } else {
        agility = 85;
    }

    document.getElementById("agility").innerHTML = agility;
}


// Calculate total poise
function getPoise(curEnd, curAdp) {
    var poise = 0;

    if (curEnd <= curAdp) {
        poise = curEnd * 3 / 10;
    } else {
        poise = curAdp * 3 / 10;
    }

    document.getElementById("poise").innerHTML = poise + " (" + poise + ")";
}


// Calculate total cast speed
function getCastSpeed(curInt, curFth, curAtn) {
    var castSpd = 35;

    castSpd = 2 * Math.floor((curInt + curFth) * 0.25 + curAtn * 0.5) + castSpd;
    document.getElementById("castspd").innerHTML = castSpd + " (" + castSpd + ")";
}


// Calculate total physical defense
function getPhysicalDef(curEnd, curVit, curStr, curDex) {
    var physdef = Math.floor(0.25 * (curEnd + curVit + curStr + curDex));
    var strikedef = 0;
    var slashdef = 0;
    var thrustdef = 0;

    if (physdef < 11) {
        physdef = 2.5 * physdef + 52.5;
    } else {
        physdef += 70;
    }

    strikedef = Math.floor(physdef / 2);
    slashdef = Math.floor(physdef / 2);
    thrustdef = Math.floor(physdef / 2);

    document.getElementById("physdef").innerHTML = physdef;
    document.getElementById("strikedef").innerHTML = strikedef + " (" + strikedef + ")";
    document.getElementById("slashdef").innerHTML = slashdef + " (" + slashdef + ")";
    document.getElementById("thrustdef").innerHTML = thrustdef + " (" + thrustdef + ")";
}


// Calculate total poison resistance
function getPoisonRes(curVit, curAdp) {
    var psnRes = 49;

    psnRes = Math.floor(0.25 * curVit + 0.75 * curAdp) + psnRes;
    document.getElementById("psnres").innerHTML = psnRes + " (" + psnRes + ")";
}


// Calculate total bleed resistance
function getBleedRes(curFth, curAdp) {
    var bldRes = 49;

    bldRes = Math.floor(0.25 * curFth + 0.75 * curAdp) + bldRes;
    document.getElementById("bldres").innerHTML = bldRes + " (" + bldRes + ")";
}


// Calculate total petrify resistance
function getPetrifyRes(curVgr, curAdp) {
    var petRes = 49;

    petRes = Math.floor(0.25 * curVgr + 0.75 * curAdp) + petRes;
    document.getElementById("petres").innerHTML = petRes + " (" + petRes + ")";
}


// Calculate total curse resistance
function getCurseRes(curAtn, curAdp) {
    var curseRes = 49;

    curseRes = Math.floor(0.25 * curAtn + 0.75 * curAdp) + curseRes;
    document.getElementById("crsres").innerHTML = curseRes + " (" + curseRes + ")";
}


// Calculate total magic defense
function getMagicDef(curInt) {
    var magicDef = 50;

    if (curInt < 11) {
        magicDef = curInt + magicDef;
    } else if (curInt < 21) {
        magicDef = Math.floor((curInt - 10) * 2.75 + 10 + magicDef);
    } else if (curInt < 31) {
        magicDef = Math.floor((curInt - 20) * 3.35 + 37 + magicDef);
    } else if (curInt < 41) {
        magicDef = Math.floor((curInt - 30) * 1.2 + 70 + magicDef);
    } else {
        magicDef = Math.floor((curInt - 40) * 1.5 + 82 + magicDef);
    }

    document.getElementById("magicdef").innerHTML = magicDef + " (" + magicDef + ")";
}


// Calculate total fire defense
function getFireDef(curInt, curFth) {
    var fireDef = 50;
    var stat = curInt + curFth;

    if (0.5 * (stat) < 11) {
        fireDef = Math.floor(0.5 * (stat)) + fireDef;
    } else if (0.5 * (stat) < 21) {
        fireDef = Math.floor((0.5 * (stat) - 10) * 2.75 + 10 + fireDef);
    } else if (0.5 * (stat) < 31) {
        fireDef = Math.floor((0.5 * (stat) - 20) * 3.35 + 37 + fireDef);
    } else if (0.5 * (stat) < 41) {
        fireDef = Math.floor((0.5 * (stat) - 30) * 1.2 + 70 + fireDef);
    } else {
        fireDef = Math.floor((0.5 * (stat) - 40) * 1.5 + 82 + fireDef);
    }

    document.getElementById("firedef").innerHTML = fireDef + " (" + fireDef + ")";
}


// Calculate total lightning defense
function getLightningDef(curFth) {
    var ltnDef = 50;

    if (curFth < 11) {
        ltnDef = curFth + ltnDef;
    } else if (curFth < 21) {
        ltnDef = Math.floor((curFth - 10) * 2.75 + 10 + ltnDef);
    } else if (curFth < 31) {
        ltnDef = Math.floor((curFth - 20) * 3.35 + 37 + ltnDef);
    } else if (curFth < 41) {
        ltnDef = Math.floor((curFth - 30) * 1.2 + 70 + ltnDef);
    } else {
        ltnDef = Math.floor((curFth - 40) * 1.5 + 82 + ltnDef);
    }

    document.getElementById("ltndef").innerHTML = ltnDef + " (" + ltnDef + ")";
}


// Calculate total dark defense
function getDarkDef(curInt, curFth) {
    var darkDef = 50;
    var stat = null;

    if (curInt <= curFth) {
        stat = curInt;
    } else {
        stat = curFth;
    }

    if (stat < 11) {
        darkDef = stat + darkDef;
    } else if (stat < 21) {
        darkDef = Math.floor((stat - 10) * 2.75 + 10 + darkDef);
    } else if (stat < 31) {
        darkDef = Math.floor((stat - 20) * 3.35 + 37 + darkDef);
    } else if (stat < 41) {
        darkDef = Math.floor((stat - 30) * 1.2 + 70 + darkDef);
    } else {
        darkDef = Math.floor((stat - 40) * 1.5 + 82 + darkDef);
    }

    document.getElementById("darkdef").innerHTML = darkDef + " (" + darkDef + ")";
}


function getCurrentStats() {
    var curVgr = parseInt(document.getElementById("vgr").value, 10);
    curVgr = (
        Number.isNaN(curVgr)
        ? 0
        : curVgr
    );
    var curEnd = parseInt(document.getElementById("end").value, 10);
    curEnd = (
        Number.isNaN(curEnd)
        ? 0
        : curEnd
    );
    var curVit = parseInt(document.getElementById("vit").value, 10);
    curVit = (
        Number.isNaN(curVit)
        ? 0
        : curVit
    );
    var curAtn = parseInt(document.getElementById("atn").value, 10);
    curAtn = (
        Number.isNaN(curAtn)
        ? 0
        : curAtn
    );
    var curStr = parseInt(document.getElementById("str").value, 10);
    curStr = (
        Number.isNaN(curStr)
        ? 0
        : curStr
    );
    var curDex = parseInt(document.getElementById("dex").value, 10);
    curDex = (
        Number.isNaN(curDex)
        ? 0
        : curDex
    );
    var curAdp = parseInt(document.getElementById("adp").value, 10);
    curAdp = (
        Number.isNaN(curAdp)
        ? 0
        : curAdp
    );
    var curInt = parseInt(document.getElementById("int").value, 10);
    curInt = (
        Number.isNaN(curInt)
        ? 0
        : curInt
    );
    var curFth = parseInt(document.getElementById("fth").value, 10);
    curFth = (
        Number.isNaN(curFth)
        ? 0
        : curFth
    );
    var curStats = [curVgr, curEnd, curVit, curAtn, curStr, curDex, curAdp, curInt, curFth];
    return curStats;
}


function getCurrentClasslist(curStats) {
    /*
    Set curClasses to a deep copy of classDefaults, then compare each set of the default stat properties against the current input values, store the bigger of the two, then total the current number of points spent and calculate the current Soul Level.
    */
    var curClasses = JSON.parse(JSON.stringify(classDefaults));

    function sumArray(acc, cur) {
        return acc + cur;
    }

    for (a = 0; a < 8; a += 1) {
        for (b = 0; b < 9; b += 1) {
            curClasses[a].stats[b] = (
                (curStats[b] > curClasses[a].stats[b])
                ? curStats[b]
                : curClasses[a].stats[b]
            );
        }
        curClasses[a].total = curClasses[a].stats.reduce(sumArray);
        curClasses[a].slv = curClasses[a].total - classDefaults[a].total + classDefaults[a].slv;
    }
    return curClasses;
}


function getSelectedClass(curClasses, name) {
    var a = 0;
    var dict = null;

    for (a = 0; a < curClasses.length; a += 1) {
        if (name == curClasses[a].name) {
            dict = curClasses[a];
            break;
        }
    }
    if (dict == null) {
        dict = curClasses[0];
    }
    return dict;
}


// Grab the location of the classList, and then populate a table displaying curClasses
function populateTable(curClasses) {
    var i = 1;
    var h = 0;
    var classTable = document.getElementById("classtable");

    var row = document.getElementById("bestclass");
    var cell = document.createElement("th");
    var cellText = document.createTextNode(curClasses[0].name);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(curClasses[0].slv);
    cell.appendChild(cellText);
    row.appendChild(cell);

    for (h = 0; h < curClasses[0].stats.length; h += 1) {
        cell = document.createElement("td");
        cellText = document.createTextNode(curClasses[0].stats[h]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    classTable.appendChild(row);

    for (i = 1; i < curClasses.length; i += 1) {
        row = document.createElement("tr");
        row.className = "hidden";
        cell = document.createElement("th");
        cellText = document.createTextNode(curClasses[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);

        cell = document.createElement("td");
        cellText = document.createTextNode(curClasses[i].slv);
        cell.appendChild(cellText);
        row.appendChild(cell);

        for (h = 0; h < curClasses[i].stats.length; h += 1) {
            cell = document.createElement("td");
            cellText = document.createTextNode(curClasses[i].stats[h]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        classTable.appendChild(row);
    }
}


// Grab the location of the classList, clear its subnodes, then run populateTable()
function clearTable() {
    var i;
    var classTable = document.getElementById("classtable");
    for (i = 0; i < 8; i += 1) {
        classTable.removeChild(classTable.children[0]);
    }
    var row = document.createElement("tr");
    row.id = "bestclass";
    classTable.appendChild(row);
}


function populateDropdown() {
    var dropdown = document.getElementById("classselect");
    var option = null;
    var text = null;
    var i = 0;

    for (i = 0; i < classDefaults.length; i += 1) {
        text = document.createTextNode(classDefaults[i].name);
        option = document.createElement("option");
        option.value = i;
        option.appendChild(text);
        dropdown.appendChild(option);
    }
}


function populateInputs(className) {
    var curStats = getCurrentStats();
    var selected = getSelectedClass(classDefaults, className);
    var unchanged = document.getElementsByClassName("defvalue");
    var stats = [];

    var a;
    for (a = 0; a < unchanged.length; a += 1) {
        stats.push(unchanged[a].id);
    }

    document.getElementById("slv").innerHTML = selected.slv;

    var b;
    for (b = 0; b < stats.length; b += 1) {
        if (stats[b] == "vgr") {
            document.getElementById(stats[b]).value = selected.stats[0];
        } else if (stats[b] == "end") {
            document.getElementById(stats[b]).value = selected.stats[1];
        } else if (stats[b] == "vit") {
            document.getElementById(stats[b]).value = selected.stats[2];
        } else if (stats[b] == "atn") {
            document.getElementById(stats[b]).value = selected.stats[3];
        } else if (stats[b] == "str") {
            document.getElementById(stats[b]).value = selected.stats[4];
        } else if (stats[b] == "dex") {
            document.getElementById(stats[b]).value = selected.stats[5];
        } else if (stats[b] == "adp") {
            document.getElementById(stats[b]).value = selected.stats[6];
        } else if (stats[b] == "int") {
            document.getElementById(stats[b]).value = selected.stats[7];
        } else {
            document.getElementById(stats[b]).value = selected.stats[8];
        }
    }
    updateValues("all");
}


function resetValues() {
    var changed = document.getElementsByClassName("edited");
    var options = document.getElementById("classselect").options;
    var index = document.getElementById("classselect").selectedIndex;
    var name = options[index].text

    var a;
    for (a = 0; a < changed.length; a += 1) {
        changed[a].className = "defvalue";
    }
    populateInputs(name)
    updateValues("all")
}


// Update current stat values
function updateValues(stat) {
    // Get current values from page
    var a = 0;
    var b = 0;
    var curStats = getCurrentStats();

    // Set default HP value, then calculate HP based on new values
    var hp = 500;

    if (curStats[0] < 21) {
        hp = curStats[0] * 30 + hp;
    } else if (curStats[0] < 51) {
        hp = (curStats[0] - 20) * 20 + 600 + hp;
    } else {
        hp = (curStats[0] - 50) * 5 + 1200 + hp;
    }

    for (let a = 1; a < 9; a += 1) {
        if (curStats[a] < 21) {
            hp = curStats[a] * 2 + hp;
        } else if (curStats[a] < 51) {
            hp = curStats[a] + 40 + hp;
        } else {
            hp = hp + 70;
        }
    }

    document.getElementById("hp").innerHTML = hp + " (" + hp + ")";

    // Check which attribute was just modified, and then recalcuate the stats affected by that attribute
    switch (stat) {
    case "vgr":
        getPetrifyRes(curStats[0], curStats[6]);
        document.getElementById("vgr").className = "edited";
        break;
    case "end":
        getStamina(curStats[1]);
        getPhysicalDef(curStats[1], curStats[2], curStats[4], curStats[5]);
        getPoise(curStats[1], curStats[6]);
        document.getElementById("end").className = "edited";
        break;
    case "vit":
        getBurden(curStats[2]);
        getPhysicalDef(curStats[1], curStats[2], curStats[4], curStats[5]);
        getPoisonRes(curStats[2], curStats[6]);
        document.getElementById("vit").className = "edited";
        break;
    case "atn":
        getAttune(curStats[3]);
        getCastSpeed(curStats[7], curStats[8], curStats[3]);
        getAgility(curStats[3], curStats[6]);
        getCurseRes(curStats[3], curStats[6]);
        document.getElementById("atn").className = "edited";
        break;
    case "str":
        getPhysicalDef(curStats[1], curStats[2], curStats[4], curStats[5]);
        document.getElementById("str").className = "edited";
        break;
    case "dex":
        getPhysicalDef(curStats[1], curStats[2], curStats[4], curStats[5]);
        document.getElementById("dex").className = "edited";
        break;
    case "adp":
        getAgility(curStats[3], curStats[6]);
        getPoise(curStats[1], curStats[6]);
        getPoisonRes(curStats[2], curStats[6]);
        getBleedRes(curStats[8], curStats[6]);
        getPetrifyRes(curStats[0], curStats[6]);
        getCurseRes(curStats[3], curStats[6]);
        document.getElementById("adp").className = "edited";
        break;
    case "int":
        getCastSpeed(curStats[7], curStats[8], curStats[3]);
        getMagicDef(curStats[7]);
        getFireDef(curStats[7], curStats[8]);
        getDarkDef(curStats[7], curStats[8]);
        document.getElementById("int").className = "edited";
        break;
    case "fth":
        getCastSpeed(curStats[7], curStats[8], curStats[3]);
        getLightningDef(curStats[8]);
        getFireDef(curStats[7], curStats[8]);
        getDarkDef(curStats[7], curStats[8]);
        getBleedRes(curStats[8], curStats[6]);
        document.getElementById("fth").className = "edited";
        break;
    case "all":
        getStamina(curStats[1]);
        getBurden(curStats[2]);
        getAttune(curStats[3]);
        getAgility(curStats[3], curStats[6]);
        getPoise(curStats[1], curStats[6]);
        getCastSpeed(curStats[7], curStats[8], curStats[3]);
        getPhysicalDef(curStats[1], curStats[2], curStats[4], curStats[5]);
        getPoisonRes(curStats[2], curStats[6]);
        getBleedRes(curStats[8], curStats[6]);
        getPetrifyRes(curStats[0], curStats[6]);
        getCurseRes(curStats[3], curStats[6]);
        getMagicDef(curStats[7]);
        getFireDef(curStats[7], curStats[8]);
        getLightningDef(curStats[8]);
        getDarkDef(curStats[7], curStats[8]);
        break;
    }

    var curClasses = getCurrentClasslist(curStats)

    // Sort the dicts in curClasses lowest to highest based on the value of their Soul Level property
    curClasses.sort(function (a, b) {
        return a.slv - b.slv;
    });

    var options = document.getElementById("classselect").options;
    var index = document.getElementById("classselect").selectedIndex;
    var name = options[index].text
    var selected = getSelectedClass(curClasses, name)

    // Grab the element with the slv ID and write the current Soul Level of the class at index 0 of curClasses
    document.getElementById("slv").innerHTML = selected.slv;

    // Refresh the classList table
    clearTable();
    populateTable(curClasses);
}


/*
Get the value of the input box associated with the button that was pressed and store it as an int, check if the value is a number, then increase the value by 1 if it's less than 99, then return the value to the input box and run updateValues
*/
function increment(stat) {
    var value = parseInt(document.getElementById(stat).value, 10);
    value = (
        Number.isNaN(value)
        ? 0
        : value
    );
    if (value < 100) {
        value += 1;
    }
    document.getElementById(stat).value = value;
    updateValues(stat);
}


/*
Get the value of the input box associated with the button that was pressed and store it as an int, check if the value is a number, then decrease the value by 1 if it's more than 1, then return the value to the input box and run updateValues
*/
function decrement(stat) {
    var value = parseInt(document.getElementById(stat).value, 10);
    value = (
        Number.isNaN(value)
        ? 0
        : value
    );
    if (value > 0) {
        value -= 1;
    }
    document.getElementById(stat).value = value;
    updateValues(stat);
}


 // Change display property of an element from none to block, or vice versa
function hideshow(which) {
    var i;
    for (i = 0; i < which.length; i += 1) {
        if (which[i].style.display === "table-row") {
            which[i].style.display = "none";
        } else {
            which[i].style.display = "table-row";
        }
    }
}
