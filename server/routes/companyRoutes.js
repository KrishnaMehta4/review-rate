const express = require("express");

const router = express.Router();

const {
  addCompany,
  getCompanies,
  getSingleCompany,
} = require("../controllers/companyController");

router.post("/", addCompany);

router.get("/", getCompanies);

router.get("/:id", getSingleCompany);

module.exports = router;