const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');

let publicFilePath = process.resourcesPath;
if (!publicFilePath.includes('node_modules')) {
    publicFilePath = path.join(publicFilePath, '../public/.json');  // product
} else {
    publicFilePath = path.join(__dirname, '../public/.json');  // dev
}

/* 配置文件 */
const configFilePath = path.join(publicFilePath, '/config.json');

const readConfig = () => {
    try {
        if (fs.existsSync(configFilePath)) {
            const rawData = fs.readFileSync(configFilePath, 'utf8');
            const config = JSON.parse(rawData);
            return config.version || '';
        } else {
            console.error('config error:', configFilePath);
            return '';
        }
    } catch (error) {
        console.error('config error:', error);
        return '';
    }
}

/* 窗口最小化 */
ipcMain.on('minimize', (event) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender);
    mainWindow.minimize();
});

/* 窗口最大化 */
ipcMain.on('maximize', (event) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender);
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

/* 关闭窗口 */
ipcMain.on('close', (event) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender);
    mainWindow.close();
});
