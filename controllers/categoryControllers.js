const { Category } = require("../models");

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();

    if (categories.length === 0) {
      return res.status(404).json({
        status: 404,
        status: "Not Found / Empty Data",
        data: null,
      });
    }
    
    return res.status(200).json({
      status: 200,
      message: "Data",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.storeCategory = async (req, res) => {
  try {
    let { name, description } = req.body;
    const createCategory = await Category.create({
      name,
      description,
    });
    res.status(201).json({
      status: 201,
      message: "Created",
      data: createCategory,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.getIdCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Data Not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const idCategory = await Category.findByPk(id);

    // y

    await Category.update(req.body, {
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Data Updated",
      data: idCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    
    const idCategory = await Category.findByPk(id);
    
    if (!idCategory) {
      return res.status(404).json({
        status: 404,
        message: "Data Not Found",
      });
    }
    
    await Category.destroy( {
      where: {
        id
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Data Deleted",
      data: idCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};
