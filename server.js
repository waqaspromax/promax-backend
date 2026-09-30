const express = require("express");
const cors = require("cors");
const exec = require("yt-dlp-exec");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Extract direct media download URL using yt-dlp
    const output = await exec(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      format: "best"
    });

    if (output && output.url) {
      return res.json({ url: output.url });
    } else {
      return res.status(400).json({ error: "Could not fetch direct video link." });
    }
  } catch (err) {
    console.error("Extraction error:", err);
    return res.status(500).json({ error: "Failed to extract video." });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
