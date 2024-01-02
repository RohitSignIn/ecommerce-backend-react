const NotFoundError = require("../errors/not_found_error");
const userModel = require("../models/user_model");

class UserRepository {
  async create(email, password) {
    try {
      const response = await userModel.create({
        email,
        password,
      });
      return response;
    } catch (error) {
      console.log("User Repository Error: " + error);
      throw error;
    }
  }

  async fetch(id = null) {
    try {
      let response;
      if (id != null) {
        response = await userModel.findOne({ where: { id: id } });
      } else {
        response = await userModel.findAll();
      }
      return response;
    } catch (error) {
      console.log("User Repository Error: " + error);
      throw error;
    }
  }

  async remove(id) {
    try {
      const user = await userModel.findOne({ where: { id: id } });
      if (!user) throw new NotFoundError("user", "id", id);
      const response = await user.destroy();
      return response;
    } catch (error) {
      console.log("User Repository Error: " + error);
      throw error;
    }
  }
}

module.exports = UserRepository;
