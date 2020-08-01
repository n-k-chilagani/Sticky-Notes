const electon = require('electron');
const BrowserWindow = electon.BrowserWindow;
const app = electon.app;
const path = require('path')
const Menu = electon.Menu
const url = require('url');

const ipc = electon.ipcMain;

function createWindow()
{
    var win = new BrowserWindow({
		height:450,
		width:650,
		frame:false,
		webPreferences:{
			nodeIntegration:true
		}
	});
	//win.webContents.openDevTools();
    win.loadFile(path.join(__dirname+'/index.html'));
}

app.whenReady().then(createWindow)

app.on('ready', function(){
    //template = []
	//const menu = Menu.buildFromTemplate(template)
	//Menu.setApplicationMenu(menu);
})

ipc.on('close',(event,args)=>{
	console.log(args);
	event.returnValue="Success";
})