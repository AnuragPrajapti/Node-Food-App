const categoryModal = require("../modals/categoryModal");

// CREATE CATEGORY
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please Provide category title",
      });
    }

    const newCategory = new categoryModal({ title, imageUrl });
    await newCategory.save();
    res.status(200).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error In Create Category API!",
      error,
    });
  }
};

//GET CATEGORY
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModal.find({});
    if (!categories) {
      return res.status(400).send({
        success: false,
        message: "No Categories found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get Categories list",
      totalCategories: categories?.length,
      categories,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Eerror In get All categories",
      error,
    });
  }
};

//UPDATE CATEGORY
const updateCategoryController = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const { title, imageUrl } = req.body;
    if (!categoryID) {
      return res.status(400).send({
        success: false,
        message: "Please provide ID Or category not found",
      });
    }

    const updatedValue = await categoryModal.findByIdAndUpdate(
      categoryID,
      {
        title,
        imageUrl,
      },
      { new: true }
    );
    console.log(33333, updatedValue);

    if (!updatedValue) {
      return res.status(500).send({
        success: false,
        message: "No Category find",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      updatedValue,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error In Update Category API!",
      error,
    });
  }
};

//DELETE CATEGORY
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDetail = await categoryModal.findById(id);
    if (!categoryDetail) {
      return res.status(400).send({
        success: false,
        message: "Category Not found or Please provide category ID",
      });
    }

    await categoryModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Successfully Category Deleted",
    });
  } catch (error) {
    console.error(9999, error);
    return res.status(500).send({
      success: false,
      message: "Error in Category Delete API!",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  deleteCategoryController,
};
