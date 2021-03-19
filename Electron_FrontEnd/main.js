const electron = require("electron");
const url = require("url");
const path = require("path");
const { app, BrowserWindow, Menu } = electron;
//SET ENV
// process.env.NODE_ENV = "production";
let mainWindow;

//create menu Template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                }
            }
        ]
    }
]
//mac issue solution
if (process.platform == "darwin") {
    mainMenuTemplate.unshift({});
}
//Add dev tools item if not in production
if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Toggle Dev Tools",
                accelerator: process.platform == "darwin" ? "Command+Shift+I" : "Ctrl+Shift+I",
                click(menuItem, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: "reload"
            }
        ]
    });
}


//listen for app to be ready
app.on("ready", () => {
    //creating a new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    //loading html file into window
    const home = process.env.NODE_ENV == "production" ? url.pathToFileURL(path.join(__dirname, "/build/index.html")).toString() : "http://localhost:3000/";
    mainWindow.loadURL(home);
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});





