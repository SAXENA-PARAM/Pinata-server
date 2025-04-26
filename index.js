const express = require('express');
const cors = require('cors');
const { PinataSDK } = require("pinata")
require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.send('Hello Hono!');
});

app.get('/presigned_url', async (req, res) => {
  try {
    
    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT, // Access PINATA_JWT from environment variables
      pinataGateway: process.env.GATEWAY_URL // Access GATEWAY_URL from environment variables
    });

  
    const url = await pinata.upload.public.createSignedURL({
      expires: 60 // URL expires in 60 seconds
    });

   
    res.json({ url });
  } catch (err) {
    console.error('Error generating presigned URL:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
