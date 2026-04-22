import Permission from "./permission.model.js";

// CREATE PERMISSION
export const createPermission = async (req, res) => {
  try {
    const permission = await Permission.create(req.body);

    res.status(201).json({
      success: true,
      data: permission,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET ALL PERMISSIONS
export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
console.log("Permissions:", permissions);


    res.json({
      success: true,
      data: permissions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE PERMISSION
export const deletePermission = async (req, res) => {
  try {
    await Permission.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Permission deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};