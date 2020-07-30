const electron = require('electron');
const fs = require('fs');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const d = new Date();

//Json Data
var data = require('./data.json');
console.log(data);
var presentNote ; //notes which is active

// Ids
var crsBtn = document.getElementById('crsBtn');
var notesList = document.getElementById('notesList');
var heading = document.getElementById('heading');
var content = document.getElementById('content');
var addBtn = document.getElementById('addBtn');


crsBtn.addEventListener('click',(event)=>{
    remote.getCurrentWindow().close();
});

//addBtn.addEventListener('click', addNote);


content.addEventListener('input',contentChanged);
heading.addEventListener('input',headingChanged);


//events

function addNote()
{
    presentNote = {
        "heading":"",
        "content":"",
        "id":data.length+1,
        "date":`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    }
    heading.textContent = presentNote.heading;
    content.innerText = presentNote.content;
    data.append(presentNote);
}

function noteClicked(event)
{
    let id = this.id;
    presentNote = data[id-1];
    heading.textContent = presentNote.heading;
    content.innerText = presentNote.content;
    //console.log(editingData.content);
}

function contentChanged(event)
{
    presentNote.content = this.innerText;
    presentNote.date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    console.log(presentNote.date);
    data[presentNote.id-1] = presentNote;
    changeDate(presentNote.id);
}

function headingChanged(event)
{
    presentNote.heading = this.innerText;
    presentNote.date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    data[presentNote.id]=presentNote;
    changeDate(presentNote.id);
}


//follow up functions
function changeDate(id)
{
    let ele = document.getElementById(id);
    ele.lastChild.textContent = `Date - ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
}

function addNotesList(date,name,id)
{
    let list = document.createElement('li');
    list.className="list-group-item";

    let p1 =  document.createElement('p');
    p1.textContent = name;

    let p = document.createElement('p');
    p.textContent = `Date - ${date}`;
    p.className = "dateClass"
    
    let div = document.createElement('div');
    div.className = 'listDiv';
    div.setAttribute('id',id);

    div.append(p1);
    div.append(p);
    list.append(div);

    div.addEventListener('click',noteClicked);
    
    notesList.appendChild(list);
}

for(let i =0 ; i < data.length ; i++)
{
    addNotesList(data[i].date,data[i].heading,data[i].id);
}
