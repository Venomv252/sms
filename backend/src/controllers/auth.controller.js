import authService from "../services/auth.service.js";

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ status: "success", data: result });
  } catch (error) { next(error); }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body ?? {};
    const result = await authService.login(username, password);
    res.status(200).json({ status: "success", data: result });
  } catch (error) { next(error); }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.status(200).json({ status: "success", data: user });
  } catch (error) { next(error); }
};

const logout = (req, res) => {
  // Stateless access JWT is not revoked here; client must discard it.
  res.status(200).json({ status: "success", message: "Logged out successfully" });
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body ?? {};
    await authService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(200).json({ status: "success", message: "Password changed successfully" });
  } catch (error) { next(error); }
};

export default { register, login, getMe, logout, changePassword };
