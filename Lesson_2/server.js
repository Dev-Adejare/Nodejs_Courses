const fsPromises = require("fs").promises;
const paths = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      paths.join(__dirname, "files", "gig.txt"),
      "utf8"
    );
    console.log(data);

    await fsPromises.unlink(paths.join(__dirname, "files", "gig.txt"));

    await fsPromises.writeFile(
      paths.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      paths.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you too 👨‍💻",
      "utf8"
    );
    await fsPromises.rename(
      paths.join(__dirname, "files", "promiseWrite.txt"),
      paths.join(__dirname, "files", "promiseComplete.txt")
    );

    const Data2 = await fsPromises.readFile(
      paths.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );
    console.log(Data2);
  } catch (error) {
    console.error(error);
  }
};


fileOps();

