const filepath = "/home/optimans/Desktop/fakedata.json";

const fs = require('fs');
const express = require('express');
const app = express();


app.get('/api/readjson', (req, res) => {
    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.log(`${err}`);
            res.end();
            return;
        }
        res.send(data.toString());
    });
});

app.get("/", (req, res) => {
  fs.exists(filepath, (exists) => {
    if (!exists) {
      res.send(`<h1>Error</h1><p>No file found at '${filepath}'</p>`)
      return;
    }
    console.log(exists ? `SUCCESS: The path '${filepath}' is correct` : `WARNING: no file found at path '${filepath}'`);
    res.send(`<h1>Success</h1><p>Filereader is running with file '${filepath}'</p>`);
  });
});

fs.readFile("/home/optimans/Desktop/creds.json", (err, data) => {
  if (err)
    return;

  app.get('/api/credentials', (req, res) => {
    res.send(JSON.parse(data));
  });
});

fs.exists(filepath, (exists) => {
  console.log(exists ? `SUCCESS: The path '${filepath}' is correct` : `WARNING: no file found at path '${filepath}'`);
});

app.listen(3000);
