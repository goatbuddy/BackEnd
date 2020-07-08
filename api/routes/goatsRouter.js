const router = require("express").Router();
const restricted = require("../middleware/restricted");
const usercheck = require("../middleware/usercheck");
const db = require("../models/goatModel");

//============================Create Router
router.post("/", async (req, res) => {
  
    try {
      const goat = req.body;
      const inserted = await db.addgoat(goat);
      res.status(201).json({ message: "goat created" })
    } catch (error) {
      res.status(500).json({ error: "A problem occured"})
    }
});
//============================Read Router
router.get("/", async (req, res) => {
  try {
    const goats = await db.find();
    res.status(200).json(goats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the goats" });
  }
});

//-----------------------Read By Id
router.get("/:id", async (req, res) => {
    try {
        const goat = await db.findById(req.params.id);
        if (goat) {
          res.status(200).json(goat);
        } else {
          res.status(404).json({ message: "We could not find the goat" });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "We ran into an error retrieving the goat" });
      }
});

//============================Update Router
router.put("/:id", async (req, res) => {
    const changes = req.body;

    if (changes) {
      try {
        const updated = await db.update(req.params.id, changes);
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({
            message: "That goat does not exist"
          });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "We ran into an error updating the goat" });
      }
    } else {
      res.status(400).json({
        message: "Please provide changes to update the goat"
      });
    }
});

//============================Delete Router
router.delete("/:id", async (req, res) => {
    try {
        const count = await db.remove(req.params.id);
        if (count > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            message: "That goat does not exist, perhaps they were deleted already"
          });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "We ran into an error removing the goat" });
      }
});

module.exports = router;