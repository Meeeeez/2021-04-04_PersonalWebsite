var typedElement = document.getElementById("typed-element");
var stringCounter = 0;

typeString();
blinkCursor();

function typeString() {
    var i = 0;
    var strings = ["Javascript", "Python", "Java", "Kotlin", "CSS", "C", "PHP", "SQL", "ThreeJS", "Routers", "Firewalls", "VPNs", "DNS", "Cisco", "MikroTik",  "Switches", "Windows Server 2016", "NAT", "SNMP", "VMWare", "Proxys", "DMZs", "AWS", "Android Studio", "MS Project"]
    var intervalID = window.setInterval(() => {
        if (stringCounter < strings.length) {
            if (i < strings[stringCounter].length) {
                typedElement.innerHTML += strings[stringCounter].charAt(i);
                i++;
            } else {
                clearInterval(intervalID);
                window.setTimeout(deleteString, 1000)
                stringCounter++;
            }
        } else {
            stringCounter = 0;
        }
    }, 70);
}

function deleteString() {
    var intervalID = window.setInterval(() => {
        if (typedElement.innerHTML.length > 0) {
            typedElement.innerHTML = typedElement.innerHTML.slice(0, -1)
        } else {
            clearInterval(intervalID);
            window.setTimeout(typeString, 1000);
        }
    }, 70);
}

function blinkCursor() {
    var cursor = document.getElementById("typed-cursor");

    window.setInterval(function () {
        cursor.style.visibility = (cursor.style.visibility === 'hidden' ? '' : 'hidden');
    }, 650);
}
