const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
router.post("/find/:firstUserId/:secondUserId", async (req, res) => {
  if(!req.params.firstUserId || !req.params.secondUserId)
  {
    res.status(500);
  }
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    console.log(conversation)
    if(conversation){
      console.log("###################")
      
      res.status(200).json(conversation)
    }
    else{
      const newConversation = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });
      try {
        const savedConversation = await newConversation.save();
        console.log("@@@@@@@@@@@@@@@@@")
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;