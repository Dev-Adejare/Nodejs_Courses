const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const rootRoute = require("./routes/roots");
const employeeRoute = require("./routes/api/employee");
const corsOptions = require('./config/corsOption');

const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
// Built-in middleware for json
app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use("/", rootRoute);
app.use('/register', require('./routes/api/register'))   // Register an employee
app.use('/auth', require('./routes/api/auth'))          //Login Authentication


app.use("/employee", employeeRoute);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
