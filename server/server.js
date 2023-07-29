const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport.js');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth.js');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const XLSX = require("xlsx");
const fs = require('fs');
const readFileToJson = require("./controllers/functionality.js");

const sourceDir = "uploads"
const MONGODB_URI = process.env.MONGODB_URI;
const port = "8080"

/**===========================================================================
 * ?                            MIDDLEWARE
=========================================================================== */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession(
    {
        name: "session",
        keys: ["aspi"],
        maxAge: 90 * 24 * 60 * 60 * 100
    }
))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}))
app.use("/auth", authRoute);
app.use(express.json());
app.use(express.urlencoded());

require('dotenv').config();

/**===========================================================================
 * ?                            MONGODB
=========================================================================== */

mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// Check if the connection is successful
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
});


//EXCEL FILE WORK
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../server/', 'uploads'),
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const storage2 = multer.diskStorage({
    destination: path.join(__dirname, '../server/', 'rollListUpload'),
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

/**===========================================================================
 * ?                            Routes
=========================================================================== */

app.post('/uploads', async (req, res) => {
    try {
        let upload = multer({ storage: storage }).single('file');
        upload(req, res, function (err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields
            if (!req.file) {
                return res.send('Please select an file to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
        });
    } catch (err) { console.log(err) }
})


app.post('/generateReport', () => {
    generateReport();
})

const DownloadFile1 = __dirname + "/Final_result.xlsx";
app.get("/result", (req, res) => {
    res.download(DownloadFile1);
});


app.post("/threshold", (req, res) => {
    data = req.body;
    for (var i in data) {
        const resu = [];
        resu.push(i, data[i]);
        console.log(resu[0]);
    }
})

/**===========================================================================
 * ?                            EXCEL FUNCTIONS
=========================================================================== */

function generateReport() {
    var targetDir = path.join(__dirname, sourceDir)     //var targetDir = __dirname + "/uploads";
    var files = fs.readdirSync(targetDir)
    var combinedData = [];

    files.forEach(function (file) {
        var fileExtension = path.parse(file).ext; //Getting file extension
        if (fileExtension === ".xlsx" && file[0] != "~") {
            var fullFilePath = path.join(__dirname, sourceDir, file);
            var data = readFileToJson(fullFilePath);
            combinedData = combinedData.concat(data);
            var result_WB = XLSX.utils.book_new();
            var result_WS = XLSX.utils.json_to_sheet(combinedData);
            XLSX.utils.book_append_sheet(result_WB, result_WS, "Combined Data"); //Combine data
            XLSX.writeFile(result_WB, "results.xlsx");   //Store it in results.xlsx

            const wb = XLSX.readFile("results.xlsx") //Give result file here
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            var range = XLSX.utils.decode_range(ws['!ref']); // get the range
            var columnWiseData = readColumnWiseData(range, ws);

            var newWB = XLSX.utils.book_new();
            var newWS = XLSX.utils.json_to_sheet(columnWiseData);
            XLSX.utils.book_append_sheet(newWB, newWS, "newData");
            XLSX.writeFile(newWB, "columnResultData.xlsx");     //transposing result data

            var TotalData = columnWiseData.map(function (record) {
                record[4] = (record[1] + record[2] + record[3]);
                return record;
            })

            TotalData[6][4] = "Total";

            var PercentData = TotalData.map(function (record) {
                record[5] = (record[4] / 30) * 100;
                return record;
            })
            PercentData[6][5] = "Percentage";

            var checkedData = PercentData.map(function (record) {
                if (record[5] >= 60) {
                    record[6] = "Y";
                }
                else {
                    record[6] = "N";
                }
                return record;
            })
            checkedData[6][6] = "Threshold 60%"

            var count = 0;
            var number = -1;
            var data1 = checkedData.map(function (record) {
                number++;
                if (record[5] >= 60) {
                    count++;
                }
                return record;
            })

            var Final_WB = XLSX.utils.book_new();
            var Final_WS = XLSX.utils.json_to_sheet(data1);
            XLSX.utils.book_append_sheet(Final_WB, Final_WS, "finalData");
            XLSX.writeFile(Final_WB, "Final_result.xlsx");
        }
    });
}


function readColumnWiseData(range, ws) {
    var columnWiseData = [];
    for (var C = range.s.c; C <= range.e.c; ++C) {
        columnWiseData[C] = [];
        for (var R = range.s.r; R <= range.e.r; ++R) {

            var cellref = XLSX.utils.encode_cell({ c: C, r: R }); // construct A1 reference for cell
            if (!ws[cellref]) continue; // if cell doesn't exist, move on
            var cell = ws[cellref];
            columnWiseData[C].push(cell.v);

        };
    }
    return columnWiseData;
}


app.listen(port, () => { console.log(`Server running on ${port}`); })