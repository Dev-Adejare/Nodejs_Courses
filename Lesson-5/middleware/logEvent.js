const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvent = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}`;

  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromise.mkdir((path.join(__dirname, "logs")));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "logs", logName),
      logItem
    );
  } 
};



module.exports = {logEvent, logger};
