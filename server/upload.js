const express = require('express');
const { NFTStorage, File } = require('nft.storage');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'uploads/' });
const app = express();
const port = process.env.PORT || 3001;
const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

app.post('/upload', upload.single('asset'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const content = await fs.promises.readFile(filePath);
    const mimeType = req.file.mimetype;
    const fileName = req.file.originalname;

    const nftFile = new File([content], fileName, { type: mimeType });

    const metadata = await client.store({
      name: req.body.name,
      description: req.body.description,
      image: nftFile,
      properties: {
        creator: req.body.creator || ''
      }
    });

    // metadata.url is ipfs://...
    res.json({ ok: true, metadata });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(port, () => console.log(`Upload server listening on ${port}`));
