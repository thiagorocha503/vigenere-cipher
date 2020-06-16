const ALPHABET: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];
const inputText: HTMLInputElement = document.getElementById("input-text") as HTMLInputElement;
const outputText: HTMLInputElement = document.getElementById("output-text") as HTMLInputElement;
const inputKey: HTMLInputElement = document.getElementById("input-key") as HTMLInputElement;
const divOutput: HTMLDivElement = document.getElementById("div-output") as HTMLDivElement;
//
function getCharByCode(code: number): string {
    if (code >= 0 && code < ALPHABET.length) {
        return ALPHABET[code];
    }
    return "#";// caracter inválido
}
//
function getCodeByChar(char: string) {
    for (let i = 0; i < ALPHABET.length; i++) {
        if (ALPHABET[i] == char.toLocaleUpperCase()) {
            return i;
        }
    }
    return -1;// código inválido
}
//
function getKeys(text: string, keyword: string): string[] {
    let keys: string[] = [];
    let text_length = text.length;
    for (let i = 0; i < text_length; i++) {
        keys.push(keyword[(i % keyword.length)].toLocaleUpperCase());
    }
    return keys;
}
//
function encrypt(text: string, keyword: string): string {
    /*
    Encryption
    The plaintext(P) and key(K) are added modulo 26.
    Ei = (Pi + Ki) mod 26
    
    */
    let result: string = "";
    let keys = getKeys(text, keyword);// get complete key
    console.log(keys);
    for (let i = 0; i < text.length; i++) {
        let P: number = getCodeByChar(text[i]);
        let K: number = getCodeByChar(keys[i]);
        if (P == -1 || K == - 1) {
            result += text[i];
        } else {
            let E: number = (P + K) % 26;
            result += getCharByCode(E);
        }
    }
    return result;
}
//
function decrypt(text: string, keyword: string) {
    /*
    Decryption
    Di = (Ei - Ki + 26) mod 26
    */

    let result: string = "";
    let keys = getKeys(text, keyword);// get complete key
    console.log(keys);
    for (let i = 0; i < text.length; i++) {
        let E: number = getCodeByChar(text[i]);
        let K: number = getCodeByChar(keys[i]);
        if (E == -1 || K == - 1) {
            result += text[i];
        } else {
            let D: number = (E - K + 26) % 26;
            result += getCharByCode(D);
        }
    }
    return result;
}


function isEmptyfields():boolean{
    if(inputText.value == "" || inputKey.value == ""){
        return true;
    } else{
        return false;
    }
}
//
function clickDecrypt(): void {
    if (isEmptyfields()) {
        alert("Fill in  all the text fields");
        return;
    }
    let result: string = decrypt(inputText.value, inputKey.value);
    outputText.innerHTML = result;
    divOutput.style.display = "block";
}
//
function clickEncrypt(): void {
    if (isEmptyfields()) {
        alert("Fill in  all the text fields");
        return;
    }
    let result: string = encrypt(inputText.value, inputKey.value);
    outputText.innerHTML = result;
    divOutput.style.display = "block";
}
//
function hideResult(): void {
    if (isEmptyfields()) {
        divOutput.style.display = "none";
    }
}
//
function onCopy() {
    // Select
    outputText.select();
    outputText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    // deselect
    document.getSelection()?.removeAllRanges();
}