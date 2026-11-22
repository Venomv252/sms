import { Router } from "express";
import prisma from "../config/prisma.js";
import { auth, allowRoles } from "../middleware/auth.js";
import { accessibleStudentWhere, canAccessStudent } from "../middleware/schoolScope.js";

const router = Router();
router.use(auth);

router.get("/", allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "MANAGEMENT", "ACCOUNTANT", "STUDENT", "PARENT"), async (req, res, next) => {
  try {
    const studentWhere = await accessibleStudentWhere(req);
    const fees = await prisma.feePayment.findMany({
      where: { student: studentWhere },
      orderBy: { dueDate: "asc" },
    });
    res.json({ data: fees });
  } catch (e) { next(e); }
});

router.post("/", allowRoles("SUPER_ADMIN", "DIRECTOR", "PRINCIPAL", "ACCOUNTANT"), async (req, res, next) => {
  try {
    const { studentId, amount, term, academicYear, dueDate, remarks } = req.body ?? {};
    if (!studentId || amount == null || !term || !academicYear || !dueDate) return res.status(400).json({ message: "Required fee fields are missing" });
    
    // Validate amount - decimal-safe validation for monetary values
    // Convert to string for pattern matching
    const amountStr = String(amount).trim();
    
    // Reject empty strings
    if (!amountStr) {
      return res.status(400).json({ message: "Amount cannot be empty" });
    }
    
    // Reject exponent notation (1e5, 1E5, 1e+5, 1e-5)
    if (/[eE]/.test(amountStr)) {
      return res.status(400).json({ message: "Amount cannot use exponent notation" });
    }
    
    // Reject hexadecimal notation (0x64, 0X64)
    if (/^0[xX]/.test(amountStr)) {
      return res.status(400).json({ message: "Amount cannot use hexadecimal notation" });
    }
    
    // Validate format: optional digits, optional decimal point, optional digits
    // Must be a plain decimal number
    if (!/^\d+(\.\d+)?$/.test(amountStr)) {
      return res.status(400).json({ message: "Amount must be a valid decimal number" });
    }
    
    // Check decimal precision (max 2 decimal places)
    const decimalPart = amountStr.split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
      return res.status(400).json({ message: "Amount cannot have more than 2 decimal places" });
    }
    
    // Convert to integer cents for exact comparison (decimal-safe)
    // Split into whole and fractional parts
    const [wholePart, fractionalPart = ''] = amountStr.split('.');
    
    // Pad fractional part to exactly 2 digits (for cents conversion)
    const centsPart = fractionalPart.padEnd(2, '0');
    
    // Convert to total cents as BigInt for exact arithmetic
    const wholeCents = BigInt(wholePart) * 100n;
    const fracCents = BigInt(centsPart);
    const totalCents = wholeCents + fracCents;
    
    // Reject zero and negative amounts
    if (totalCents <= 0n) {
      return res.status(400).json({ message: "Amount must be greater than zero" });
    }
    
    // Enforce Decimal(10,2) maximum: 99999999.99 = 9999999999 cents
    const MAX_CENTS = 9999999999n; // 99999999.99 in cents
    if (totalCents > MAX_CENTS) {
      return res.status(400).json({ message: "Amount cannot exceed 99999999.99" });
    }
    
    if (!(await canAccessStudent(req, studentId))) return res.status(404).json({ message: "Student not found in your school" });
    const fee = await prisma.feePayment.create({
      data: { studentId, amount: amountStr, term, academicYear, dueDate: new Date(dueDate), remarks },
    });
    res.status(201).json({ data: fee });
  } catch (e) { next(e); }
});

export default router;
