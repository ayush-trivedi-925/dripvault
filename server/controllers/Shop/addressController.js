const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(500).json({
        success: false,
        message: "Invalid data",
      });
    }
    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();
    res.status(200).json({
      success: true,
      message: "Address added successfully",
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding address",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res.status(500).json({
        success: false,
        message: "No userId & addressId found",
      });
    }
    const findAddress = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!findAddress) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: findAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating address",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "No userId found",
      });
    }

    const findAddress = await Address.find({ userId });
    if (findAddress.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "No addresses found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: findAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching address",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(500).json({
        success: false,
        message: "No userId & addressId found",
      });
    }
    const findAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });
    if (!findAddress) {
      return res.status(404).json({
        success: false,
        message: "No address found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting address",
    });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
