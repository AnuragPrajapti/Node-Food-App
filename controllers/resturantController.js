const resturantModal = require("../modals/resturantModal");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    console.log("req.body", req.body);

    if (!title || !coords) {
      res.status(404).send({
        success: false,
        message: "title & address is required",
      });
    }

    const newResturant = new resturantModal({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "Resturant create successfully",
      newResturant,
    });
  } catch (error) {
    console.log("error -->", error);
    res.status(500).send({
      success: false,
      message: "Error in create resturant API!",
      error,
    });
  }
};

const getAllResturantController = async (req, res) => {
  try {
    const resturants = await resturantModal.find({});
    console.log("resturants ---->", resturants);
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Available",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Successfully get resturants list",
      totalCount: resturants?.length,
      resturants,
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(500).send({
      success: false,
      message: "Error in resturant get API!",
      error,
    });
  }
};

const getResturantById = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide resturant ID",
      });
    }

    const resturantDetails = await resturantModal.findById(resturantId);

    if (!resturantDetails) {
      return res.status(404).send({
        success: false,
        message: "Resturant Not Found!",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Resturant Details",
      resturantDetails,
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(500).send({
      success: false,
      message: "Error in resturant get API!",
      error,
    });
  }
};

const deleteResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    console.log("resturantId", resturantId);
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        success: "Please Provide Resturent ID",
      });
    }
    await resturantModal.findByIdAndDelete(resturantId);
    return res.status(201).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log("error -->", error);
    return res.status(500).send({
      success: false,
      message: "Error In Delete Resturant API!",
      error,
    });
  }
};

module.exports = {
  createResturantController,
  getAllResturantController,
  getResturantById,
  deleteResturantByIdController,
};
