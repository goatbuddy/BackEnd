const express = require("express");
const restricted = require("../middleware/restricted");
// const usercheck = require("../middleware/usercheck")

const db = require("../models/userModel.js");
const goatDB = require("../models/goatModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

router.get("/:id", restricted, (req, res) => {
  const user_id = req.params.id;
  db.findById(user_id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  })
  .catch(error => {
    if (error) {
      res.status(500).json({ message: `Error : ${error}` })
    }
  });
});

// For this route, we will be pulling up the contacts that match the id of the user

router.get("/:id/contacts", restricted, async (req, res) => {
  const user_id = req.params.id;
  contactDB
    .findByUser(user_id)
    .then(contacts => {
      if (contacts) {
        res.status(200).json(contacts);
      } else {
        res
          .status(404)
          .json({
            Message: "Contacts lost like the Donner party...sad indeed"
          });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: ` The Contacts seems to be lost try again` });
    });
});

router.get("/:email", restricted, (req, res) => {
  const { email } = req.params;

  db.findByEmail(email)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "we failed you", error: err });
    });
});

router.post("/", restricted, async (req, res) => {
  try {
    const userData = req.body;
    const checkEmail = await db.findByEmail(userData.email);
    if (!checkEmail) {
      try {
        const userId = await db.add(userData);
        // const user = await db.findById(userId[0]);
        res.status(201).json(userId);
      } catch (error) {
        res.status(500).json({ error: "Unable to add user to database" });
      }
    } else {
      res.status(200).json(checkEmail);
    }
    // res.status(201).json(user);
  } catch (error) {
    let message = "error creating the user";

    res.status(500).json({ message, error });
  }
});

router.delete("/:id", restricted, (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count < 1) {
        res.status(404).json({ message: "please try a valid user" });
      } else {
        res.status(200).json({ message: "user has been deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting user", err });
    });
});

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} user(s) updated` });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "thats our bad", err });
    });
});

module.exports = router;