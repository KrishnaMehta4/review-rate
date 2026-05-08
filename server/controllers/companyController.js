const Company = require("../models/Company");
const Review = require("../models/Review");

// ADD COMPANY
const addCompany = async (req, res) => {
  try {
    const {
  name,
  location,
  foundedOn,
  logo,
  city,
  description,
} = req.body;

    const company = await Company.create({
  name,
  location,
  foundedOn,
  description,
  logo:
    logo ||
    "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  city,
});

    res.status(201).json({
      success: true,
      company,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET ALL COMPANIES
const getCompanies = async (req, res) => {
  try {

    const filter = {};

    // CITY FILTER
    if (req.query.city) {
      filter.city = {
        $regex: req.query.city,
        $options: "i",
      };
    }

    // SEARCH FILTER
if (req.query.search) {
  filter.name = {
    $regex: req.query.search,
    $options: "i",
  };
}

    const companies =
      await Company.find(filter);

    const updatedCompanies =
      await Promise.all(

        companies.map(async (company) => {

          const reviews =
            await Review.find({
              companyId: company._id,
            });

          const reviewCount =
            reviews.length;

          const averageRating =
            reviewCount > 0
              ? Number(
                  (
                    reviews.reduce(
                      (acc, item) =>
                        acc + item.rating,
                      0
                    ) / reviewCount
                  ).toFixed(1)
                )
              : 0;

          return {
            ...company._doc,
            reviewCount,
            averageRating,
          };
        })
      );

    // SORTING

    // NAME
    if (req.query.sort === "name") {

      updatedCompanies.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    // RATING
    if (req.query.sort === "rating") {

      updatedCompanies.sort(
        (a, b) =>
          b.averageRating -
          a.averageRating
      );
    }

    // REVIEWS
    if (req.query.sort === "reviews") {

      updatedCompanies.sort(
        (a, b) =>
          b.reviewCount -
          a.reviewCount
      );
    }

    // LOCATION
    if (req.query.sort === "location") {

      updatedCompanies.sort((a, b) =>
        a.location.localeCompare(
          b.location
        )
      );
    }

    res.status(200).json({
      success: true,
      companies: updatedCompanies,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET SINGLE COMPANY
const getSingleCompany = async (
  req,
  res
) => {
  try {

    const company =
      await Company.findById(
        req.params.id
      );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const reviews =
      await Review.find({
        companyId: company._id,
      });

    const reviewCount =
      reviews.length;

    const averageRating =
      reviewCount > 0
        ? Number(
            (
              reviews.reduce(
                (acc, item) =>
                  acc + item.rating,
                0
              ) / reviewCount
            ).toFixed(1)
          )
        : 0;

    res.status(200).json({
      success: true,
      company: {
        ...company._doc,
        reviewCount,
        averageRating,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  addCompany,
  getCompanies,
  getSingleCompany,
};
