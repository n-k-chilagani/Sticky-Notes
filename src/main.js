const electon = require('electron');
const BrowserWindow = electon.BrowserWindow;
const app = electon.app;
var path = require('path')
const Menu = electon.Menu
var url = require('url');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron.cmd')
})

function createWindow()
{
    var win = new BrowserWindow({
		height:500,
		width:600,
		frame:false,
		webPreferences:{
			nodeIntegration:true
		}
	});
	win.webContents.openDevTools();
    win.loadFile(path.join(__dirname+'/index.html'));
}

app.whenReady().then(createWindow)

app.on('ready', function(){
    template = []
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu);
})