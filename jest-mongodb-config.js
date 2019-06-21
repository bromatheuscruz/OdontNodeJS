module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "odont_db_test"
    },
    binary: {
      version: "4.0.10",
      skipMD5: true
    },
    autoStart: false
  }
};
