const Review = require("../models/Review");

const addReview = async (req, res) => {
  try {
    const { fullName, subject, reviewText, rating } =
      req.body;

    const review = await Review.create({
      companyId: req.params.id,
      fullName,
      subject,
      reviewText,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    let sortOption = {
  createdAt: -1,
};

// HIGHEST RATING
if (req.query.sort === "highest") {
  sortOption = {
    rating: -1,
  };
}

// LOWEST RATING
if (req.query.sort === "lowest") {
  sortOption = {
    rating: 1,
  };
}

// OLDEST
if (req.query.sort === "oldest") {
  sortOption = {
    createdAt: 1,
  };
}

    const reviews = await Review.find({
      companyId: req.params.id,
    }).sort(sortOption);

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.likes += 1;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review liked",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getReviews,
  likeReview,
};