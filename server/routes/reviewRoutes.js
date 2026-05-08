const express = require("express");

const router = express.Router();

const {
  addReview,
  getReviews,
  likeReview,
} = require("../controllers/reviewController");

router.post("/:id/review", addReview);

router.get("/:id/review", getReviews);

router.patch("/review/:id/like", likeReview);

module.exports = router;