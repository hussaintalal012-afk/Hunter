const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Route to handle file uploads
app.post('/upload', upload.single('video'), (req, res) => {
    if (req.file) {
        // Handle video file
        const videoPath = path.join(__dirname, 'uploads', req.file.filename);
        // Save or process the video file
        console.log('Video uploaded to:', videoPath);
    } else if (req.body) {
        // Handle JSON data (location)
        const data = JSON.parse(req.body);
        if (data.type === 'location') {
            console.log('Location data received:', data.data, 'for user:', data.userId);
        }
    }
    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
