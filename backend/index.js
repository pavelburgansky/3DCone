const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors"); 
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.post("/api", (req, res) => {
 let { height, radius, segments } = req.body;
  let circleApex = [];
  let triangulationData = [];
  let pointApex = [0, 0, height];
  for (let i = 0; i <= segments; i++) {
    let phi = (2 * Math.PI * i) / segments;
    let x = radius * Math.cos(phi);
    let y = radius * Math.sin(phi);
    circleApex.push([x, y, 0]);
  }
  for (let i = 0; i < segments; i++) {
    let point = circleApex[i];
    let nextPont = circleApex[(i+1)%segments]
    triangulationData.push([pointApex, point, nextPont]);
  }
  res.send(triangulationData);
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});