const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const User = require('./models/User');
const userRoutes = require('./routes/UserRoutes');
const chapterRoutes = require("./routes/chapterRoutes");
const videoRoutes = require('./routes/videoRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const port = 3000;
// const fileUpload = require('express-fileupload');

// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: '/tmp/'
// }));
app.use(express.json());
app.use(cors());
app.use(helmet());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Final_YearProjects', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use('/api', userRoutes);
app.use('/api/courses', courseRoutes);
app.use("/api/chapters", chapterRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/pdfs', pdfRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});