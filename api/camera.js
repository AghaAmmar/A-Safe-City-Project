const express = require("express");
const router = express.Router();
const firebase = require("../firebaseServer");
//var database=firebase.database()
router.post("/", (req, res) => {
  console.log(req.body);
  firebase
    .database()
    .ref("/camera")
    .push()
    .set({
      email: req.body.email,
      camName: req.body.cameraName,
      location: req.body.location,
      Ipaddress: req.body.ipaddress,
      mode: false,
      views: 0,
    })
    .then(res.status(200).json("Camera Add"));
});
router.get("/public", async (req, res) => {
  var publicStreams = [];

  firebase
    .database()
    .ref("/camera")
    .orderByChild("mode")
    .equalTo(true)
    .once("value", (snapshot) => {
      snapshot.forEach((data) => {
        publicStreams.push(data.val());
      });
      res.json(publicStreams);
    });
});
router.get("/:email", async (req, res) => {
  var get = [];
  //console.log(req.params.email);
  firebase
    .database()
    .ref("/camera")
    .orderByChild("email")
    .equalTo(req.params.email)
    .once("value", (snap) => {
      //res.json(snap.val());
      snap.forEach((data) => {
        get.push(data.val());
      });
      res.json(get);
      //   get.map((abc) => {
      //     console.log(abc.Ipaddress);
      //   });
      //   firebase.database().ref("/camera").child("aghaammar.am@gmail.com").on("value",(snapshot)=>{
      //    //console.log(snapshot.val())
      //     get=snapshot.val()
      //     snapshot.forEach(data=>{
      //       get=data.val()
      //     console.log(get.Ipaddress)
      //      })

      //   })
    });
});
router.post("/view", (req, res) => {
  console.log(req.body);
  firebase
    .database()
    .ref("/camera")
    .orderByChild("email")
    .equalTo(req.body.email)
    .once("value", (snapshot) => {
      snapshot.forEach((data) => {
        if (data.val().Ipaddress == req.body.ip) {
          data.ref.child("views").set(req.body.views + 1);
        }
      });
    });
  res.status(200).json();
});
router.post("/UnView", (req, res) => {
  console.log(req.body);
  firebase
    .database()
    .ref("/camera")
    .orderByChild("email")
    .equalTo(req.body.email)
    .once("value", (snapshot) => {
      snapshot.forEach((data) => {
        if (data.val().Ipaddress == req.body.ip) {
          if (req.body.views == 0) {
            data.ref.child("views").set(req.body.views);
          } else {
            data.ref.child("views").set(req.body.views - 1);
          }
        }
      });
    });
  res.status(200).json();
});

router.post("/mode", async (req, res) => {
  var mode = "Public";
  var userid = req.body.userid;
  var password = req.body.password;
  if (mode == req.body.mode) {
    userid = null;
    password = null;
    firebase
      .database()
      .ref("/camera")
      .orderByChild("email")
      .equalTo(req.body.email)
      .once("value", (snapshot) => {
        snapshot.forEach((data) => {
          if (data.val().Ipaddress == req.body.ip) {
            data.ref.child("mode").set(true);
            data.ref.child("userid").set(userid);
            data.ref.child("password").set(password);
          }
        });
      });
  } else {
    firebase
      .database()
      .ref("/camera")
      .orderByChild("email")
      .equalTo(req.body.email)
      .once("value", (snapshot) => {
        snapshot.forEach((data) => {
          if (data.val().Ipaddress == req.body.ip) {
            data.ref.child("userid").set(userid);
            data.ref.child("password").set(password);
            data.ref.child("mode").set(false);
          }
        });
      });
  }
  res.status(200).json();
});
router.get("/accesscam/:email/:userid/:password", (req, res) => {
  var getdata = [];
  firebase
    .database()
    .ref("/camera")
    .orderByChild("email")
    .equalTo(req.params.email)
    .once("value", (snap) => {
      //res.json(snap.val());
      snap.forEach((data) => {
        if (
          data.val().userid == req.params.userid &&
          data.val().password == req.params.password
        ) {
          getdata.push(data.val());
        }
      });
      res.json(getdata);
    });
});

module.exports = router;
