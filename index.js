const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/tiktok', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Thiếu link video' });

  const command = `yt-dlp -f mp4 --no-warnings -g "${videoUrl}"`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi tải video', details: stderr });
    }
    const downloadUrl = stdout.trim();
    res.json({ success: true, download_url: downloadUrl });
  });
});

app.listen(PORT, () => {
  console.log(`TikTok API đang chạy tại http://localhost:${PORT}`);
});
