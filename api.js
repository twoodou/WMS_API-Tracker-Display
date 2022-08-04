// import { config } from './src/constants/config';
// import { workflowIDs } from './src/constants/workflowIDs';
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const sql = require("mssql");
const path = require("path");
const fs = require("fs");

// For Logging Info
// const fs = require('fs');
const winston = require("winston");
winston.configure({
  transports: [new winston.transports.File({ filename: "masterLog.log" })],
});

const config = {
  user: "user",
  password: "MSSQL",
  server: "LOCAL.SERVER.IP\\SERVER",
  database: "DATABASE",
  options: { encrypt: true },
  multipleStatements: true,
};

const workflowIDs = [
  {
    step: "1cutting",
    id: "713E39D9-EBCD-431E-8716-070B0887909C",
    type: "production",
  },
  {
    step: "2kitting",
    id: "69B1B74E-FD5E-464B-9DC8-88206C51D226",
    type: "production",
  },
  {
    step: "3leather",
    id: "0E42ED8D-CC24-4C33-9AE6-E5414D558DD8",
    type: "production",
  },
  {
    step: "4insideSewing",
    id: "53232F85-A1DD-46FF-988C-4C2DA3BC1157",
    type: "production",
  },
  {
    step: "5qualityControl",
    id: "FA999F03-FAD6-4478-ADF2-C9234490767E",
    type: "production",
  },
  {
    step: "6readyToPost",
    id: "DDAE0CF6-9B56-4A21-9560-53AB0ACD3731",
    type: "production",
  },
  {
    step: "pip",
    id: "C805B689-57BD-4386-B122-D460B9D06B25",
    type: "fulfillment",
  },
  {
    step: "hs",
    id: "D32CF2D8-4A0A-4824-B140-A543BE1A38F5",
    type: "fulfillment",
  },
  {
    step: "inspecting",
    id: "D45905E9-245C-4FA1-B88A-F3785D7082CA",
    type: "fulfillment",
  },
  {
    step: "packaging",
    id: "0FC5FCB6-A0EE-402A-AAA7-E9A1DBEDE168",
    type: "fulfillment",
  },
  {
    step: "shipping",
    id: "36CC7B59-1FC1-42F2-8FF0-F33D7F51E56D",
    type: "fulfillment",
  },
];

app.use(cors());

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// 1) Workflow Change Endpoints\
workflowIDs.forEach(function (i) {
  app.patch("/workflow/" + i.step + "/:id", (req, res) => {
// =======================================================================
// =======================================================================
    // 1.A) WORK ORDER (Prod Assembly) Routes
    if (i.type == "production") {
      console.log("Changing " + i.type + " workflow status to: " + i.step);
      sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .query(
              "UPDATE dbo.tbINVTransaction SET GUIDProductionWorkFlowStatus ='" +
                i.id +
                "' WHERE (RegNumber =" +
                req.params.id +
                ")"
            );
        })
        .then((result) => {
          var message =
            "ASSEMBLY NUMBER: " +
            req.params.id +
            " WORKFLOW: " +
            i.step +
            " ID: " +
            i.id +
            " SQL RESPONSE: " +
            result;
          console.log(result);
          if (result.rowsAffected[0] == 1) {
            message = "Assembly Found Successfully. " + message;
            winston.info(message);
            res.send({ assembly: req.params.id, body: "success" });
          } else {
            message = "Assembly Not Found. " + message;
            winston.error(message);
            res.send({ assembly: req.params.id, body: " not found" });
          }
          sql.close();
        })
        .catch((err) => {
          var errorMessage = "Error: " + err;
          winston.error(errorMessage);
          console.log("failed");
          console.log(err);
          sql.close();
          res.send({ assembly: req.params.id, body: "sql error" });
        });
// =======================================================================
// =======================================================================
      // 1.B) SALES ORDER Routes
    } else if (i.type == "fulfillment") {
      console.log(req.body);
      console.log("Changing " + i.type + " workflow status to: " + i.step);
      sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .query(
              "UPDATE dbo.tbOrders SET GUIDOrderWorkFlowStatus ='" +
                i.id +
                "' WHERE (OrderNumber ='" +
                req.params.id +
                "')"
            );
        })
        .then((result) => {
          var message =
            "SALES ORDER GUID: " +
            req.params.id +
            " WORKFLOW: " +
            i.step +
            " ID: " +
            i.id +
            " SQL RESPONSE: " +
            result;
          console.log(result);
          if (result.rowsAffected[0] == 1) {
            message = "Sales Order Found: " + message;
            winston.info(message);
            res.send({ assembly: req.params.id, body: "order wf update success" });
          } else {
            message = "Invalid Sales Order: " + message;
            winston.error(message);
            res.send({ assembly: req.params.id, body: "order not found" });
          }
          sql.close();
        })
        .catch((err) => {
          var errorMessage = "Error: " + err;
          winston.error(errorMessage);
          console.log("failed");
          console.log(err);
          sql.close();
          res.send({ assembly: req.params.id, body: "sql error" });
        });
    } else {
      console.log("Check routing in ~/api.js foo");
    }
  });
});
// =======================================================================
// =======================================================================
app.get("/shippingdata/today", (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .query(
          "SELECT [PackNumber], [CarrierPackageID] FROM [Acctivate$LIVE-JOHARTDESIGN].[dbo].[tbShipmentPack] WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, ShipmentDate)) = DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE()))"
        );
    })
    .then((result) => {
      // console.dir(result);
      sql.close();

      res.send(result.recordset);
    })
    .catch((err) => {
      winston.error(err);
      console.dir(err);
      sql.close();
    });
});

app.get("/shippingdata/range/:id", (req, res) => {
  console.log(req.params.id);
  const beginDate = req.params.id.split("_")[0];
  const endDate = req.params.id.split("_")[1];
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .query(
          "SELECT [PackNumber], [CarrierPackageID], ShipmentDate FROM [Acctivate$LIVE-JOHARTDESIGN].[dbo].[tbShipmentPack] WHERE ShipmentDate >= '" +
            beginDate +
            "' AND ShipmentDate <=  '" +
            endDate +
            "'"
        );
    })
    .then((result) => {
      sql.close();

      res.send(result.recordset);
    })
    .catch((err) => {
      console.dir(err);
      sql.close();
    });
});

app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .query(
          "SELECT OrderNumber, tbOrders.GUIDOrder, tbOrderDetail.GUIDProduct, tbProduct.ProductID, tbOrderDetail.SpecialInstructions, tbOrderDetail.Description, tbOrderDetail.QtyOrdered, tbOrderDetail.QtyShipped, tbOrderDetail.LineNumber From tbOrders JOIN tbOrderDetail ON tbOrders.GUIDOrder = tbOrderDetail.GUIDOrder JOIN tbProduct ON tbOrderDetail.GUIDProduct = tbProduct.GUIDProduct WHERE OrderNumber = '" +
            req.params.id +
            "' AND tbOrderDetail.LineType = 'P' AND tbOrderDetail.Completed = 0;"
        );
    })
    .then((result) => {
      sql.close();

      console.log(result);

      res.send(result.recordset);
    })
    .catch((err) => {
      console.dir(err);
      sql.close();
    });
});

app.post("/packageScan", (req, res) => {
  console.log("$$$$$$$$$$$$$$$");
  console.log("req data:");
  console.log(req.query);
  console.log(req.connection.remoteAddress);
  console.log("end req data");
  console.log("###############");

  var data = req.query;

  var stream = fs.createWriteStream("packScans.txt", { flags: "a" });

  if (!data.dateTime || !data.id) {
    res.status(500);
    res.render("error: could not read data from scan");
  } else {
    stream.write(
      data.dateTime +
        " || " +
        data.id +
        "||" +
        req.connection.remoteAddress +
        "\n"
    );
    res.status(200);
    res.send("OK");
  }
});

app.get("/packcamlog", (req, res) => {

  const orderLog = fs.readFile("./packScans.txt", (err, data) => {
    if (err) throw err;
    console.log(orderLog);
    res.send(data);
  });
});

app.post("/missingPic", (req, res) => {
  console.log("$$$$$$$$$$$$$$$");
  console.log("req data:");
  console.log(req.query);
  console.log(req.connection.remoteAddress);
  console.log("end req data");
  console.log("###############");

  var data = req.query;

  var stream = fs.createWriteStream("missingPics.txt", { flags: "a" });

  if (!data.dateTime || !data.product) {
    res.status(500);
    res.render("error: could not read data from scan");
  } else {
    stream.write(
      data.dateTime +
        " || " +
        data.product +
        "||" +
        req.connection.remoteAddress +
        "\n"
    );
    res.status(200);
    res.send("OK");
  }
});

app.listen(5000, function () {
  console.log("Listening on port 5000");
});
