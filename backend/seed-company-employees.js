import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const companyEmployees = [
  {
    employeeId: "EMP001",
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@company.com",
    phone: "+91 9876543210",
    role: "Chief Technology Officer",
    department: "Executive",
    joiningDate: new Date("2020-01-15"),
    employmentType: "FULL_TIME",
    monthlySalary: 250000,
    isActive: true
  },
  {
    employeeId: "EMP002",
    fullName: "Priya Sharma",
    email: "priya.sharma@company.com",
    phone: "+91 9876543211",
    role: "Senior Software Developer",
    department: "Engineering",
    joiningDate: new Date("2021-03-20"),
    employmentType: "FULL_TIME",
    monthlySalary: 120000,
    isActive: true
  },
  {
    employeeId: "EMP003",
    fullName: "Amit Patel",
    email: "amit.patel@company.com",
    phone: "+91 9876543212",
    role: "Software Developer",
    department: "Engineering",
    joiningDate: new Date("2022-06-10"),
    employmentType: "FULL_TIME",
    monthlySalary: 85000,
    isActive: true
  },
  {
    employeeId: "EMP004",
    fullName: "Sneha Reddy",
    email: "sneha.reddy@company.com",
    phone: "+91 9876543213",
    role: "UI/UX Designer",
    department: "Design",
    joiningDate: new Date("2021-09-05"),
    employmentType: "FULL_TIME",
    monthlySalary: 75000,
    isActive: true
  },
  {
    employeeId: "EMP005",
    fullName: "Vikram Singh",
    email: "vikram.singh@company.com",
    phone: "+91 9876543214",
    role: "DevOps Engineer",
    department: "Engineering",
    joiningDate: new Date("2022-01-15"),
    employmentType: "FULL_TIME",
    monthlySalary: 95000,
    isActive: true
  },
  {
    employeeId: "EMP006",
    fullName: "Anjali Mehta",
    email: "anjali.mehta@company.com",
    phone: "+91 9876543215",
    role: "Product Manager",
    department: "Product",
    joiningDate: new Date("2020-11-20"),
    employmentType: "FULL_TIME",
    monthlySalary: 150000,
    isActive: true
  },
  {
    employeeId: "EMP007",
    fullName: "Karan Joshi",
    email: "karan.joshi@company.com",
    phone: "+91 9876543216",
    role: "Quality Assurance Engineer",
    department: "Engineering",
    joiningDate: new Date("2022-08-12"),
    employmentType: "FULL_TIME",
    monthlySalary: 70000,
    isActive: true
  },
  {
    employeeId: "EMP008",
    fullName: "Neha Gupta",
    email: "neha.gupta@company.com",
    phone: "+91 9876543217",
    role: "Marketing Manager",
    department: "Marketing",
    joiningDate: new Date("2021-05-18"),
    employmentType: "FULL_TIME",
    monthlySalary: 110000,
    isActive: true
  },
  {
    employeeId: "EMP009",
    fullName: "Rohit Verma",
    email: "rohit.verma@company.com",
    phone: "+91 9876543218",
    role: "Sales Executive",
    department: "Sales",
    joiningDate: new Date("2022-02-28"),
    employmentType: "FULL_TIME",
    monthlySalary: 65000,
    isActive: true
  },
  {
    employeeId: "EMP010",
    fullName: "Deepika Nair",
    email: "deepika.nair@company.com",
    phone: "+91 9876543219",
    role: "HR Manager",
    department: "Human Resources",
    joiningDate: new Date("2020-07-01"),
    employmentType: "FULL_TIME",
    monthlySalary: 90000,
    isActive: true
  },
  {
    employeeId: "EMP011",
    fullName: "Arjun Rao",
    email: "arjun.rao@company.com",
    phone: "+91 9876543220",
    role: "Software Developer",
    department: "Engineering",
    joiningDate: new Date("2023-01-10"),
    employmentType: "FULL_TIME",
    monthlySalary: 80000,
    isActive: true
  },
  {
    employeeId: "EMP012",
    fullName: "Kavya Iyer",
    email: "kavya.iyer@company.com",
    phone: "+91 9876543221",
    role: "Content Writer",
    department: "Marketing",
    joiningDate: new Date("2022-11-05"),
    employmentType: "PART_TIME",
    monthlySalary: 40000,
    isActive: true
  },
  {
    employeeId: "EMP013",
    fullName: "Siddharth Chopra",
    email: "siddharth.chopra@company.com",
    phone: "+91 9876543222",
    role: "Finance Manager",
    department: "Finance",
    joiningDate: new Date("2021-02-14"),
    employmentType: "FULL_TIME",
    monthlySalary: 125000,
    isActive: true
  },
  {
    employeeId: "EMP014",
    fullName: "Riya Das",
    email: "riya.das@company.com",
    phone: "+91 9876543223",
    role: "Junior Developer",
    department: "Engineering",
    joiningDate: new Date("2023-07-01"),
    employmentType: "FULL_TIME",
    monthlySalary: 55000,
    isActive: true
  },
  {
    employeeId: "EMP015",
    fullName: "Manish Agarwal",
    email: "manish.agarwal@company.com",
    phone: "+91 9876543224",
    role: "Business Analyst",
    department: "Product",
    joiningDate: new Date("2022-04-20"),
    employmentType: "FULL_TIME",
    monthlySalary: 95000,
    isActive: true
  },
  {
    employeeId: "EMP016",
    fullName: "Pooja Desai",
    email: "pooja.desai@company.com",
    phone: "+91 9876543225",
    role: "Customer Support Lead",
    department: "Support",
    joiningDate: new Date("2021-10-10"),
    employmentType: "FULL_TIME",
    monthlySalary: 70000,
    isActive: true
  },
  {
    employeeId: "EMP017",
    fullName: "Aditya Kapoor",
    email: "aditya.kapoor@company.com",
    phone: "+91 9876543226",
    role: "Intern - Software Development",
    department: "Engineering",
    joiningDate: new Date("2023-09-01"),
    employmentType: "INTERN",
    monthlySalary: 25000,
    isActive: true
  },
  {
    employeeId: "EMP018",
    fullName: "Meera Pillai",
    email: "meera.pillai@company.com",
    phone: "+91 9876543227",
    role: "Legal Counsel",
    department: "Legal",
    joiningDate: new Date("2020-03-25"),
    employmentType: "FULL_TIME",
    monthlySalary: 180000,
    isActive: true
  },
  {
    employeeId: "EMP019",
    fullName: "Nikhil Bansal",
    email: "nikhil.bansal@company.com",
    phone: "+91 9876543228",
    role: "Data Analyst",
    department: "Analytics",
    joiningDate: new Date("2022-09-15"),
    employmentType: "FULL_TIME",
    monthlySalary: 85000,
    isActive: true
  },
  {
    employeeId: "EMP020",
    fullName: "Simran Kohli",
    email: "simran.kohli@company.com",
    phone: "+91 9876543229",
    role: "Graphic Designer",
    department: "Design",
    joiningDate: new Date("2023-03-10"),
    employmentType: "CONTRACT",
    monthlySalary: 60000,
    isActive: true
  },
  {
    employeeId: "EMP021",
    fullName: "Rahul Bhatt",
    email: "rahul.bhatt@company.com",
    phone: "+91 9876543230",
    role: "Senior DevOps Engineer",
    department: "Engineering",
    joiningDate: new Date("2019-08-20"),
    employmentType: "FULL_TIME",
    monthlySalary: 135000,
    isActive: true
  },
  {
    employeeId: "EMP022",
    fullName: "Tanvi Shah",
    email: "tanvi.shah@company.com",
    phone: "+91 9876543231",
    role: "Accountant",
    department: "Finance",
    joiningDate: new Date("2021-12-05"),
    employmentType: "FULL_TIME",
    monthlySalary: 75000,
    isActive: true
  },
  {
    employeeId: "EMP023",
    fullName: "Varun Malhotra",
    email: "varun.malhotra@company.com",
    phone: "+91 9876543232",
    role: "Sales Manager",
    department: "Sales",
    joiningDate: new Date("2020-09-10"),
    employmentType: "FULL_TIME",
    monthlySalary: 140000,
    isActive: true
  },
  {
    employeeId: "EMP024",
    fullName: "Ishita Khanna",
    email: "ishita.khanna@company.com",
    phone: "+91 9876543233",
    role: "Office Manager",
    department: "Administration",
    joiningDate: new Date("2022-05-20"),
    employmentType: "FULL_TIME",
    monthlySalary: 55000,
    isActive: true
  },
  {
    employeeId: "EMP025",
    fullName: "Gaurav Saxena",
    email: "gaurav.saxena@company.com",
    phone: "+91 9876543234",
    role: "Security Analyst",
    department: "Security",
    joiningDate: new Date("2021-07-15"),
    employmentType: "FULL_TIME",
    monthlySalary: 105000,
    isActive: false
  }
];

async function seedCompanyEmployees() {
  console.log('Starting company employee seeding...\n');

  try {
    // Delete existing company employees
    console.log('Clearing existing company employees...');
    await prisma.companyEmployee.deleteMany({});
    console.log('✓ Cleared existing data\n');

    // Create new employees
    console.log('Creating company employees...');
    for (const employee of companyEmployees) {
      const created = await prisma.companyEmployee.create({
        data: employee
      });
      console.log(`✓ Created: ${created.employeeId} - ${created.fullName} (${created.role})`);
    }

    console.log(`\n✅ Successfully seeded ${companyEmployees.length} company employees!`);
    
    // Show statistics
    const stats = {
      total: companyEmployees.length,
      active: companyEmployees.filter(e => e.isActive).length,
      inactive: companyEmployees.filter(e => !e.isActive).length,
      totalMonthlySalary: companyEmployees.reduce((sum, e) => sum + Number(e.monthlySalary), 0),
    };
    
    console.log('\n📊 Statistics:');
    console.log(`   Total Employees: ${stats.total}`);
    console.log(`   Active: ${stats.active}`);
    console.log(`   Inactive: ${stats.inactive}`);
    console.log(`   Total Monthly Salary: ₹${stats.totalMonthlySalary.toLocaleString('en-IN')}`);
    console.log(`   Total Annual Salary: ₹${(stats.totalMonthlySalary * 12).toLocaleString('en-IN')}`);
    console.log(`   Average Monthly Salary: ₹${Math.round(stats.totalMonthlySalary / stats.total).toLocaleString('en-IN')}`);
    
    console.log('\n🎯 Departments:');
    const depts = {};
    companyEmployees.forEach(e => {
      depts[e.department] = (depts[e.department] || 0) + 1;
    });
    Object.entries(depts).forEach(([dept, count]) => {
      console.log(`   ${dept}: ${count} employees`);
    });

  } catch (error) {
    console.error('❌ Error seeding company employees:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedCompanyEmployees()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
