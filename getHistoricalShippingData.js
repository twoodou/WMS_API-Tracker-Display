// import config from "./src/constants/config.js";
const express = require("express");
const cors = require("cors");
const app = express();
const sql = require("mssql");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './test.csv',
    header: [
        {id: 'packNumber', title: 'PACK NUMBER'},
        {id: 'tracking', title: 'TRACKING NUMBER'},
        {id: 'shipDate', title: 'SHIPMENT DATE'}
    ]
});

const config = {
    "user": "sa",
    "password": "ACCTivate!MSSQL",
    "server": "192.168.50.9\\Acctivate",
    "database": "Acctivate$LIVE-JOHARTDESIGN",
    "options": {"encrypt": true},
    "multipleStatements": true
  }

  // "SELECT [PackNumber], [CarrierPackageID], [ShipmentDate] FROM [Acctivate$LIVE-JOHARTDESIGN].[dbo].[tbShipmentPack] WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, ShipmentDate)) = DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE()))"
// "SELECT [PackNumber], [CarrierPackageID], [ShipmentDate] FROM [Acctivate$LIVE-JOHARTDESIGN].[dbo].[tbShipmentPack] WHERE DATEADD(dd, 0, ShipmentDate) = DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE()))"

app.use(cors());

const records = [];

  sql
    .connect(config)
    .then(pool => {

      return pool
        .request()
        .query(
          "SELECT [PackNumber], [CarrierPackageID], [ShipmentDate] FROM [Acctivate$LIVE-JOHARTDESIGN].[dbo].[tbShipmentPack] WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, ShipmentDate)) = DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE()))"
        );
    })
    .then(result => {
      sql.close();
      createRecord(result.recordset);
      console.log(result)
    })
    .catch(err => {
      console.dir(err);
      sql.close();
    });

function createRecord(data) {
  console.log('Creating record array to write to CSV');
  console.log(data)

  for (let i = 0; i < data.length; i++) {
    records.push({
      packNumber: String(data[i].PackNumber),
      tracking: String(data[i].CarrierPackageID),
      shipDate: data[i].ShipmentDate.toString()
    });
  }
  csvWriter.writeRecords(records)       // returns a promise
  .then(() => {
      console.log('...Done');
  });
}

// const records = [
//   {name: 'Bob',  lang: 'French, English'},
//   {name: 'Mary', lang: 'English'}
// ];



// csvWriter.writeRecords(records)       // returns a promise
//   .then(() => {
//       console.log('...Done');
//   });

// app.listen(5000, function() {
//   console.log("Listening on port 5000");
// });
