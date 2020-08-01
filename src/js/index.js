const electron = require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const d = new Date();
const {v4:uuidv4} = require('uuid');
const fs = require('fs');
//Json Data storage class
class Store
{
    data = require('../../data.json')
    addData(value)
    {
        this.data.push(value);
    }

    searchData(id)
    {
        let value = this.data.filter((note)=>{
            return (note.id ==id);
        })
        console.log(value);
        return value[0];
    }

    read()
    {
        return this.data;
    }

    updateData(note)
    {
        for(let i =0 ; i < this.data.length ; i++)
        {
            if(this.data[i].id == note.id)
            {
                this.data[i] = note;
                break;
            }
        }
    }

    delete(note)
    {
        this.data = this.data.filter((item)=>{
            return item.id!=note.id
        })
    }
    save()
    { 
        fs.writeFileSync('data.json',JSON.stringify(this.data));
        
    }
}


var presentNote={} ; //notes which is active

// Ids
var crsBtn = document.getElementById('crsBtn');
var notesList = document.getElementById('notesList');
var heading = document.getElementById('heading');
var content = document.getElementById('content');
var addBtn = document.getElementById('addBtn');
var store = new Store();

crsBtn.addEventListener('click',(event)=>{
    store.save();
    remote.getCurrentWindow().close();
    
});

addBtn.addEventListener('click', addNote);

content.addEventListener('input',contentChanged);
heading.addEventListener('input',headingChanged);



function addNote()
{
    if(presentNote.hasOwnProperty('heading') && presentNote.hasOwnProperty('content'))
    {
        let head = presentNote.heading;
        let cont = presentNote.content;
        if((head.length==0 && head.trim().length==0) && (cont.length==0 && cont.trim().length==0))
        {
            document.getElementById(presentNote.id).remove();
            store.delete(presentNote);
        }
    }
    presentNote = {
        "heading":"",
        "content":"",
        "id":uuidv4(),
        "date":`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    }
    heading.textContent = presentNote.heading;
    content.innerText = presentNote.content;
    store.addData(presentNote);
    addNotesList(presentNote.date,presentNote.heading,presentNote.id);
    //data.append(presentNote);
}

function noteClicked(event)
{
    if(presentNote.hasOwnProperty('heading') && presentNote.hasOwnProperty('content'))
    {
        let head = presentNote.heading;
        let cont = presentNote.content;
        if((head.length==0 && head.trim().length==0) && (cont.length==0 && cont.trim().length==0))
        {
            document.getElementById(presentNote.id).remove();
            store.delete(presentNote);
        }
    }
    let id = this.id;
    presentNote = store.searchData(id);
    heading.textContent = presentNote.heading;
    content.innerText = presentNote.content;
}

function contentChanged(event)
{
    presentNote.content = this.innerText;
    presentNote.date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    console.log(presentNote.date);
    changeDate(presentNote.id);
}

function headingChanged(event)
{
    presentNote.heading = this.innerText;
    presentNote.date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
    changeDate(presentNote.id);
}


//follow up functions
function changeDate(id)
{
    let ele = document.getElementById(id);
    
    ele.firstChild.lastChild.textContent = `Date - ${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
    ele.firstChild.firstChild.textContent = presentNote.heading;
}

function addNotesList(date,name,id)
{
    let list = document.createElement('li');
    list.className="list-group-item";
    list.setAttribute('id',id);

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

store.read().forEach((item)=>{addNotesList(item.date,item.heading,item.id)});