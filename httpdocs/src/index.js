const dom = document.querySelector('h1');
dom.style.color = '#f00';
const fullName = 'Pham Dinh Hung';
const age = 21;
function showHello(fullName, age) {
    return `hello ${fullName} ${age} tuoi`
}
console.log(showHello(fullName, age));
