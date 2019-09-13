// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  logging: true,
  intentMap: {
    'AMAZON.StopIntent': 'END',
  },
  db: {
    FileDb: {
      pathToFile: '../db/db.json',
    }
  },
  cms: {
    GoogleSheetsCMS: {
      spreadsheetId: '181SPtb9PvP5HtWaDWGqz2biopzGeL4adSgAgNxsFw-k',
      access: 'public',
      sheets: [
        {
          name: 'lines',
          type: 'ObjectArray',
          position: 1,
        },
      ],
      caching: false,
    }
  },
};
