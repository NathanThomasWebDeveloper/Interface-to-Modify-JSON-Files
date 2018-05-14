const tbody = document.querySelector("tbody");
const thead = document.querySelector("thead"); 
const form = document.querySelector("form");
const fileList = document.getElementById("file-list"); 
const jsontitle = document.getElementById("jsontitle");
const submitButton = document.getElementById("submit-button");
const addButton = document.getElementById("add-button");
const jsontitleinput = document.getElementById("jsontitleinput");
const filenames = document.getElementById("filenames");
const filename = document.getElementById("filenames").querySelector("span");
const newfilename = document.getElementById("filenames").querySelector("input");
var cells = [];
var numberofColumns = 1;
let number = 0;
listofColumns = ["name"];

//initialiser

listFiles();

//event listeners

addButton.addEventListener("click", addNewRow);
//functions

function addNewRow(){
    var file = [{}];
    listofColumns.forEach(function(column){
        if (column == "name") {
            let random = Math.floor(Math.random() * 9999999 + 1);
            random = "xx" + random;
            file[0][column] = random;
        } else {
        file[0][column] = "undefined";} 
    });
    console.log(file);
createRows(file);
}

function listFiles(){
    files.forEach(function(file){
        let fileItem;
        fileItem = document.createElement("a");
        fileItem.href = "#";
        fileItem.className = "list-group-item " + file.slug;
        fileItem.innerHTML = file.title;
        fileItem.addEventListener("click", function(){
            showFile(file.slug);
        });
        fileList.append(fileItem);
    });
}


function showFile(slug) {
    files.forEach(function(file){
        if (slug == file.slug){
            clearTable();
            jsontitleinput.value = file-slug;
            jsontitle.innerHTML = file.title;
            submitButton.style.display = "inline-block";
            addButton.style.display = "inline-block";
            filenames.style.display = "block";
            listofColumns = ["name"];
            filename.innerHTML = slug + ".json";
            newfilename.value = slug + ".json";
            setnumberofColumns(file.content);
                 createHeadRow();
                createRows(file.content);
        }
    });
}
function clearTable(){
    tbody.innerText = " ";
    thead.innerText = " ";

}

function setnumberofColumns(data) {
    for (let x in data)
    {        let keys = Object.keys(data[x]);
        keys.forEach(function(eachKey){
            if (eachKey != "slug") {
           if(!listofColumns.includes(eachKey)) {
                listofColumns.push(eachKey);
           }
        }
        })    
    }
    for (i = 0; i <= data.length-1; i++){
        listofColumns.forEach(function(eachColumn){
            if(!data[i][eachColumn]){
                data[i][eachColumn] = undefined;
            }
        }) 
    }
}

function createHeadRow(){
    var tr;
    tr = document.createElement("tr");
    listofColumns.forEach(function(column){
        let th;
        th = document.createElement("th");
        th.innerHTML = column;
        tr.append(th);
    })
    thead.append(tr);
}


function createRows(data) {
    var row;
    for (let x in data){
        if (isNumeric(x)){
            data[x].name = "xx" + x;
        } else {
        data[x].name = x; }
    data[x].slug =  data[x].name.replace(/\s+/g, '-').toLowerCase();
    row = document.createElement("tr");
    row.id = data[x].slug;
    tbody.append(createCells(row, data[x]));
    number++;
    }
}

function createCells(rowObject, rowData) {
    var cellsAdded = 0;
    console.log("cells total: " + numberofColumns);
    listofColumns.forEach(function(eachColumn){
        let cell;
        let span;
        let input;
        if (typeof rowData[eachColumn] == "object")
        { 
            rowData[eachColumn] = JSON.stringify(rowData[eachColumn]);
        }
        cell = document.createElement("td");
        cell.className = rowData.slug + " " + eachColumn;
        cell.id = rowData.slug + "-" + eachColumn;
        input = document.createElement("input");
        input.type = "text";
        input.name = rowData.slug + "-" + eachColumn;
        input.value = rowData[eachColumn];
        input.style.width = "100%";
        input.style.display = "none";
        cell.append(input);
        span = document.createElement("span");
        span.innerHTML = rowData[eachColumn];
        cell.append(span);
        if (typeof rowData[eachColumn] == "string") {
            if (isStringImage(rowData[eachColumn])){
                let img;
                img = document.createElement("img");
                img.src = rowData[eachColumn];
                img.style.maxWidth = "300px";
                cell.append(img);
            }
        }
        rowObject.append(cell);
        span.addEventListener("click", function(){
            span.parentElement.querySelector("input").style.display = "block";
            span.parentElement.querySelector("input").focus();
            span.style.display = "none";
        });
        input.addEventListener("blur", function(e){
            let sliced;
            input.parentElement.querySelector("span").style.display = "block"; 
            input.style.display = "none";
            sliced = e.target.name.slice(e.target.name.lastIndexOf('-')+1);
            if (sliced == "name"){
                let row;
                row = e.srcElement.parentElement.parentElement;
                changeRow(row, input.value);
                
            }
        });
        input.addEventListener("input", function(){
            input.parentElement.querySelector("span").innerHTML = input.value;
        });
        cellsAdded++;
        
    }) 

    let Dlt;
    Dlt = document.createElement("td");
    Dlt.className = "delete";
    Dlt.innerHTML = `<button type="button" class="close mx-auto" style="width: 100%" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>`;
    Dlt.addEventListener("click", function(){
        Dlt.parentElement.remove();
        onDelt();
    });
    rowObject.append(Dlt);
return rowObject;
}

function onDelt(){


}
function changeRow(tr, newID){
    let IDtoAdd;
    console.log(tr);
    tr.id = newID;
    console.log(tr.children);
    for (let index = 0; index < tr.children.length-1; index++) { //-1 to avoid delete cell.
        let sliced;
        let element = tr.children[index];
        let inputtoChange = tr.children[index].querySelector("input");
        sliced = element.id.slice(element.id.lastIndexOf('-'));
        element.id = newID + sliced;
        element.classList.replace(element.classList[0], newID);
        sliced = inputtoChange.name.slice(inputtoChange.name.lastIndexOf('-'));
        inputtoChange.name = newID + sliced;
    }
   
}

function isStringImage(string){
    var isTrue = false;
    string.slice(-3);
    const imagesexts = ["png", "jpeg", "jpg", "gif"];
    imagesexts.forEach(function(imageext){
        console.log(imageext);
        if (string.includes(imageext)){
            isTrue = true;
        }
    });
    return isTrue;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }