const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 5000; // server port
const app = express();
app.use(express.json());

// Hardcode the Merkle root
const MERKLE_ROOT = 'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa';

app.post('/gift', (req, res) => {
  const { name, proof } = req.body;

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("🎁 You got a toy robot!");
  } else {
    res.send("❌ You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`✅ Server listening on port ${port}!`);
});
