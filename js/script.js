var ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];
var inputText = document.getElementById("input-text");
var outputText = document.getElementById("output-text");
var inputKey = document.getElementById("input-key");
var divOutput = document.getElementById("div-output");
//
function getCharByCode(code) {
    if (code >= 0 && code < ALPHABET.length) {
        return ALPHABET[code];
    }
    return "#"; // caracter inválido
}
//
function getCodeByChar(char) {
    for (var i = 0; i < ALPHABET.length; i++) {
        if (ALPHABET[i] == char.toLocaleUpperCase()) {
            return i;
        }
    }
    return -1; // código inválido
}
//
function getKeys(text, keyword) {
    var keys = [];
    var text_length = text.length;
    for (var i = 0; i < text_length; i++) {
        keys.push(keyword[(i % keyword.length)].toLocaleUpperCase());
    }
    return keys;
}
//
function encrypt(text, keyword) {
    /*
    Encryption
    The plaintext(P) and key(K) are added modulo 26.
    Ei = (Pi + Ki) mod 26
    
    */
    var result = "";
    var keys = getKeys(text, keyword); // get complete key
    console.log(keys);
    for (var i = 0; i < text.length; i++) {
        var P = getCodeByChar(text[i]);
        var K = getCodeByChar(keys[i]);
        if (P == -1 || K == -1) {
            result += text[i];
        }
        else {
            var E = (P + K) % 26;
            result += getCharByCode(E);
        }
    }
    return result;
}
//
function decrypt(text, keyword) {
    /*
    Decryption
    Di = (Ei - Ki + 26) mod 26
    */
    var result = "";
    var keys = getKeys(text, keyword); // get complete key
    console.log(keys);
    for (var i = 0; i < text.length; i++) {
        var E = getCodeByChar(text[i]);
        var K = getCodeByChar(keys[i]);
        if (E == -1 || K == -1) {
            result += text[i];
        }
        else {
            var D = (E - K + 26) % 26;
            result += getCharByCode(D);
        }
    }
    return result;
}
function isEmptyfields() {
    if (inputText.value == "" || inputKey.value == "") {
        return true;
    }
    else {
        return false;
    }
}
//
function clickDecrypt() {
    if (isEmptyfields()) {
        alert("Fill in  all the text fields");
        return;
    }
    var result = decrypt(inputText.value, inputKey.value);
    outputText.innerHTML = result;
    divOutput.style.display = "block";
}
//
function clickEncrypt() {
    if (isEmptyfields()) {
        alert("Fill in  all the text fields");
        return;
    }
    var result = encrypt(inputText.value, inputKey.value);
    outputText.innerHTML = result;
    divOutput.style.display = "block";
}
//
function hideResult() {
    if (isEmptyfields()) {
        divOutput.style.display = "none";
    }
}
//
function onCopy() {
    var _a;
    // Select
    outputText.select();
    outputText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    // deselect
    (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.removeAllRanges();
}
