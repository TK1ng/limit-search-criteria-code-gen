//Limit Search Criteria Formatter

const areaInput = document.querySelector('.areas');
const hiddenElements = document.querySelector('.show');
const resultCodeContainer = document.querySelector('.result');
const criteriaFields = document.querySelector('.input');
const resultCode = document.querySelector('.code');

let definer;
let areas;

function getDefiner(val){
    definer = val.split(",");
    areaInput.style.display = "flex";
    hiddenElements.style.display = "flex";
}

function getAreas(val) {
    areas = val.split(",");
}

class CriteriaFormatter {
    constructor(definer, areas) {
        this.definer = definer;
        this.areas = areas;
    }

    format() {
        return `{
    "${this.definer.map( item => `${item}`)}":[${this.areas.map(area => `
        "${area}"`)}
    ]
}`
    }
}

document.querySelector('.format-btn').addEventListener("click", generateCode);
document.addEventListener('keyup',function(event) {
    if(event.key === 'Enter')
        document.querySelector('.format-btn').click();
})

function generateCode() {
    if (definer === undefined)
        throw new Error('Select a definer')
    if (areas === undefined)
        throw new Error('Input areas')

    const limitCriteria = new CriteriaFormatter(definer,areas);
    
    criteriaFields.style.display = "none";
    resultCode.innerHTML = limitCriteria.format();
    resultCodeContainer.style.display = "flex";
}


function resetForm(){
    location.reload();
}

function copyCode() {
    resultCode.select();
    resultCode.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied to clipboard");
}