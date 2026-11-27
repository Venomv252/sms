import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import config from "../config/config.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
  storeRefreshToken,
  getDeviceFingerprint,
} from "../utils/tokens.js";

const fail = (message, statusCode) =>
  Object.assign(new Error(message), { statusCode });

const normalizeUsername = (value) =>
  String(value ?? "").trim().toLowerCase();

const safeUserSelect = {
  id: true,
  email: true,
  username: true,
  role: true,
  schoolId: true,
  firstName: true,
  lastName: true,
  tokenVersion: true,
  createdAt: true,
};

async function register(input = {}) {
  const {
    email, username, password, role, firstName, lastName,
    rollNumber, grade, section, admissionNumber, dateOfBirth,
    address, phoneNumber, parentName, parentEmail, parentPhone, bloodGroup,
  } = input;

  if (!email || !password || !firstName || !lastName || !rollNumber ||
      !grade || !section || !admissionNumber || !dateOfBirth) {
    throw fail("Required account and student details are missing", 400);
  }
  if (role && role !== "STUDENT") {
    throw fail("Public registration is only available for students", 403);
  }
  if (typeof password !== "string" || password.length < 10 || password.length > 72) {
    throw fail("Password must be between 10 and 72 characters", 400);
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedUsername = normalizeUsername(username || normalizedEmail.split("@")[0]);
  if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(normalizedUsername)) {
    throw fail("Username must be 3–30 characters and use letters, numbers, dots, underscores or hyphens", 400);
  }

  const dob = new Date(dateOfBirth);
  if (!Number.isFinite(dob.getTime()) || dob > new Date()) {
    throw fail("Invalid date of birth", 400);
  }

  const passwordHash = await bcrypt.hash(password, config.bcrypt.saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        username: normalizedUsername,
        password: passwordHash,
        role: "STUDENT",
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        student: {
          create: {
            rollNumber, grade, section, admissionNumber, dateOfBirth: dob,
            address, phoneNumber, parentName, parentEmail, parentPhone, bloodGroup,
          },
        },
      },
      select: { ...safeUserSelect, student: true },
    });
    
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    const refreshTokenHash = await hashRefreshToken(refreshToken);
    
    // Store refresh token in database
    await storeRefreshToken(user.id, refreshTokenHash);
    
    return { user, accessToken, refreshToken };
  } catch (error) {
    if (error.code === "P2002") {
      throw fail("Username, email, roll number, or admission number already exists", 409);
    }
    throw error;
  }
}

async function login(username, password, deviceInfo = null) {
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername || typeof password !== "string" || !password) {
    throw fail("Username and password are required", 400);
  }
  if (normalizedUsername.length > 30 || password.length > 72) {
    throw fail("Invalid username or password", 401);
  }

  const user = await prisma.user.findUnique({
    where: { username: normalizedUsername },
    include: { student: true, teacher: true, ownedSchools: { include: { school: true } } },
  });

  // Use the same public error for unknown usernames and incorrect passwords.
  const passwordMatches = user
    ? await bcrypt.compare(password, user.password)
    : await bcrypt.compare(password, config.auth.dummyPasswordHash);

  if (!user || !passwordMatches) {
    throw fail("Invalid username or password", 401);
  }

  const { password: _password, ...safeUser } = user;
  
  // Generate tokens
  const accessToken = generateAccessToken(safeUser);
  const refreshToken = generateRefreshToken();
  const refreshTokenHash = await hashRefreshToken(refreshToken);
  
  // Store refresh token in database
  await storeRefreshToken(safeUser.id, refreshTokenHash, deviceInfo);
  
  return { user: safeUser, accessToken, refreshToken };
}

async function getMe(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      ...safeUserSelect,
      student: true,
      teacher: { include: { subjects: true } },
    },
  });
  if (!user) throw fail("User not found", 404);
  return user;
}

async function changePassword(userId, currentPassword, newPassword) {
  if (!currentPassword || !newPassword) {
    throw fail("Both passwords are required", 400);
  }
  if (typeof newPassword !== "string" || newPassword.length < 10 || newPassword.length > 72) {
    throw fail("New password must be between 10 and 72 characters", 400);
  }
  if (currentPassword === newPassword) {
    throw fail("New password must differ from current password", 400);
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw fail("User not found", 404);
  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw fail("Current password is incorrect", 401);
  }

  await prisma.user.update({
    where: { id: userId },
    data: { password: await bcrypt.hash(newPassword, config.bcrypt.saltRounds) },
  });
  return true;
}

export default { register, login, getMe, changePassword };
