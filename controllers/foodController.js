const foodModal = require("../modals/foodModal");

//CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    } = req.body;

    console.log("req.body =====>", req.body);

    if (!title || !description || !price || !resturant) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all fields",
      });
    }

    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item created",
      newFood,
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Food API!",
      error,
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const foodList = await foodModal.find({});
    if (!foodList) {
      return res.status(400).send({
        success: false,
        message: "No Food List found",
      });
    }

    res.status(201).send({
      success: true,
      message: "Get Food List",
      totalCount: foodList?.length,
      foodList,
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Food API!",
      error,
    });
  }
};

const getByIdFoodController = async (req, res) => {
  try {
    const { id: foodID } = req.params;
    const foodDetails = await foodModal.findById(foodID);
    if (!foodDetails) {
      return res.status(400).send({
        success: false,
        message: "Somthing Wring! or Food details not found, Provide id ",
      });
    }

    res.status(201).send({
      success: true,
      message: "Get Food Details",
      foodDetails,
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Food API!",
      error,
    });
  }
};

const getFoodByRestaurantController = async (req, res) => {
  try {
    const { id: restID } = req.params;
    const food = await foodModal.find({ resturant: restID });
    if (!food) {
      return res.status(400).send({
        success: false,
        message: "Somthing Wring! or Food details not found, Provide id ",
      });
    }

    res.status(201).send({
      success: true,
      message: "Food base on Restaurant",
      food,
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Food API!",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getByIdFoodController,
  getFoodByRestaurantController,
};
