const fs         = require('fs');
const express    = require('express');
const app        = express();
const cp         = require("child_process");
const bodyParser = require('body-parser');
const port       = 3000;
let   hostname;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

try {
  const ipStdOut = cp.execSync('ipconfig | find "IPv4"').toString();
  hostname = ipStdOut.slice(39, -1).trim();
  cp.execSync(`"http://${hostname}:${port}/" | clip`, {shell: "powershell"})
} catch (error) {
  console.error(error);
}

app.get('/', (req, res) => {
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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});