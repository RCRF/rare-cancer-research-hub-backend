import {
  getUserByEmailService,
  isUserAdminService,
} from "../services/userService.js";

// Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await getUserByEmailService(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Get admin status for a user
export const isUserAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await isUserAdminService(id);
    if (res.isAuthenticated) {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(403).json({ error: "User is not an admin" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
