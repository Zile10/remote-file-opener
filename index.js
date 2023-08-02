const express = require('express');
const app = express()
const port = 3000;
const hostname = '192.168.9.23'
const cp = require("child_process");


app.get('/', (req, res) => {
  cp.exec('notepad.exe "./files/text.txt"', (error) => {
    if (error) {
      console.error(error)
    }
  }); 
  res.send('Success!')
})

app.get('/watching', (req, res) => {
  cp.exec('notepad.exe "./files/watching.txt"', (error) => {
    if (error) {
      console.error(error)
    }
  }); 
  res.send('Success!')
})

app.get('/feel', (req, res) => {
  cp.exec('notepad.exe "./files/feel.txt"', (error) => {
    if (error) {
      console.error(error)
    }
  }); 
  res.send('Success!')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});