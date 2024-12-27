const express = require("express") ;
const app = express() ;
const cors= require('cors');

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const cookieParser = require("cookie-parser") ;

require("dotenv").config() ;
const PORT = process.env.PORT || 4000 ;

// middleware to parse the objects from the req body
app.use(express.json()) ;
app.use(cookieParser()) ;
// try adding cookie parser

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/temp/'
}));


require("./config/connectDB").connectDB();

// Connect to cloud
const cloudinary = require("./config/cloudinary")
cloudinary.clodinaryConnect();

// API routes mount
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// route import and mount
const news = require("./routes/home") ;
app.use("/api/v1", news) ;

// Import and use the notes routes
const notesRoutes = require("./routes/notes");
app.use("/api/v1", notesRoutes);

app.get("/", () => {
    console.log(`App is running on port no. ${PORT}`)
})

app.get('/api/notes', (req, res) => {
    res.status(200).json([
      { id: 1, title: 'Note 1' },
      { id: 2, title: 'Note 2' },
    ]);
});

app.delete('/api/v1/notes/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Note ID is required' });
    }
  
    // Continue with the deletion logic
});
  

// activate
app.listen(PORT, () => {
    console.log(`App is currently listening at ${PORT}`) ;
})