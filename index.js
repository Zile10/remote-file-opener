// Imports & Server Variables
const fs         = require('fs');
const express    = require('express');
const app        = express();
const cp         = require("child_process");
const bodyParser = require('body-parser');
const screenshot = require('screenshot-desktop');
const { render } = require('ejs');
const port       = 3000;
let   hostname;

// Setup Server To Parse Json Content On Request Bodies. 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Grabbing IPv4 Address And Setting it As the Server Hostname 
try {
  const ipStdOut = cp.execSync('ipconfig | find "IPv4"').toString();
  hostname = ipStdOut.match(/(\d+\.\d+\.\d+\.\d+)/)[0];
  // cp.execSync(`"http://${hostname}:${port}/" | clip`, {shell: "powershell"})
} catch (error) {
  console.error(error);
  throw error;
}

// Setting View Engine to Use EJS
app.set('view engine', 'ejs');

// Home Route
app.get('/', (req, res) => {
  res.render('index')
})

// Routes
app.post('/text', (req, res) => {
  fs.writeFile('./files/text.txt', req.body.msg, (err) => {
    if (err) {
      console.error(err)
    }
    cp.exec('notepad.exe "./files/text.txt"', (error) => {
      if (error) {
        console.error(error)
      }
    }); 
    res.send('Success!')
  })

})

app.get('/screen', async (req, res) => {
  try {
    // Capture a new screen screenshot
    const newImageBuffer = await screenshot();
    
    // Send the updated image buffer to the client
    res.json({ imageBuffer: newImageBuffer.toString('base64') });
  } catch (error) {
    console.error('Error capturing or sending updated screenshot:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});