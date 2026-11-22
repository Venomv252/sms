// ─── Shared Data ───────────────────────────────────────────────────────────────
export const subjects = [
  {name:"Computer Science",short:"CS",teacher:"Mr. K. Sharma",score:98,theory:75,internal:23,syllabus:92,color:"#087f5b",classAvg:82.2},
  {name:"Mathematics",short:"MA",teacher:"Mrs. Roy",score:96,theory:77,internal:19,syllabus:88,color:"#20a77a",classAvg:74.8},
  {name:"Physics & Chemistry",short:"SC",teacher:"Dr. A. Evans",score:92,theory:74,internal:18,syllabus:85,color:"#495057",classAvg:74.2},
  {name:"2nd Language",short:"2L",teacher:"Mrs. Das",score:90,theory:72,internal:18,syllabus:90,color:"#7ee8c1",classAvg:73.0},
  {name:"English Literature",short:"EN",teacher:"Mr. Kumar",score:88,theory:70,internal:18,syllabus:86,color:"#adb5bd",classAvg:81.5},
  {name:"Social Studies",short:"SS",teacher:"Mrs. Singh",score:85,theory:68,internal:17,syllabus:82,color:"#9be7cb",classAvg:76.1}
];

export const schedule = [
  {period:"P1",title:"Calculus II",teacher:"Mrs. Roy",room:"Rm 102",time:"08:30–09:15",day:"Mon",subject:"Math"},
  {period:"P1",title:"Algebraic Proofs",teacher:"Mrs. Roy",room:"Rm 102",time:"08:30–09:15",day:"Tue",subject:"Math"},
  {period:"P1",title:"Vectors",teacher:"Mrs. Roy",room:"Rm 102",time:"08:30–09:15",day:"Wed",subject:"Math"},
  {period:"P1",title:"World Prose",teacher:"Mr. D'souza",room:"Rm 108",time:"08:30–09:15",day:"Thu",subject:"English"},
  {period:"P2",title:"Shakespeare",teacher:"Mr. D'souza",room:"Rm 108",time:"09:20–10:05",day:"Mon",subject:"English"},
  {period:"P2",title:"Lit Analysis",teacher:"Mr. D'souza",room:"Rm 108",time:"09:20–10:05",day:"Tue",subject:"English"},
  {period:"P2",title:"Genetics",teacher:"Dr. P. Sen",room:"Bio Lab",time:"09:20–10:05",day:"Wed",subject:"Science"},
  {period:"P2",title:"Trigonometry",teacher:"Mrs. Roy",room:"Rm 102",time:"09:20–10:05",day:"Thu",subject:"Math"},
  {period:"P3",title:"Hydrocarbons",teacher:"Dr. H. Patel",room:"Rm 201",time:"10:25–11:10",day:"Mon",subject:"Chemistry"},
  {period:"P3",title:"Acid-Base Titration",teacher:"Dr. H. Patel",room:"Chem Lab 2",time:"10:25–11:10",day:"Tue",subject:"Chemistry",lab:true},
  {period:"P3",title:"Revolutions of 1848",teacher:"Ms. A. Sen",room:"Rm 201",time:"10:25–11:10",day:"Wed",subject:"History"},
  {period:"P3",title:"Thermodynamics",teacher:"Dr. A. Evans",room:"Rm 204",time:"10:25–11:10",day:"Thu",subject:"Physics"},
  {period:"P4",title:"Optics & Lasers",teacher:"Dr. A. Evans",room:"Rm 204",time:"11:15–12:00",day:"Mon",subject:"Physics"},
  {period:"P4",title:"Adv. EM & Induction",teacher:"Dr. A. Evans",room:"Room 204",time:"11:15–12:00",day:"Tue",subject:"Physics",live:true},
  {period:"P4",title:"Python OOP",teacher:"Mr. K. Sharma",room:"CS Lab 3",time:"11:15–12:00",day:"Wed",subject:"CS"},
  {period:"P4",title:"Hindi Core",teacher:"Dr. M. Mishra",room:"Rm 105",time:"11:15–12:00",day:"Thu",subject:"Hindi"},
  {period:"P5",title:"Data Structures",teacher:"Mr. K. Sharma",room:"CS Lab 3",time:"12:45–01:30",day:"Mon",subject:"CS"},
  {period:"P5",title:"SQL Database Lab",teacher:"Mr. K. Sharma",room:"CS Lab 3",time:"12:45–01:30",day:"Tue",subject:"CS",lab:true},
  {period:"P5",title:"Statistics",teacher:"Mrs. Roy",room:"Rm 102",time:"12:45–01:30",day:"Wed",subject:"Math"},
  {period:"P5",title:"Studio Art",teacher:"Ms. T. Joshi",room:"Art Studio",time:"12:45–01:30",day:"Thu",subject:"Arts"},
  {period:"P6",title:"Nationalism in India",teacher:"Ms. A. Sen",room:"Rm 201",time:"01:35–02:20",day:"Mon",subject:"History"},
  {period:"P6",title:"Economic Development",teacher:"Ms. Ananya Sen",room:"Rm 201",time:"01:35–02:20",day:"Tue",subject:"Social"},
  {period:"P6",title:"Grammar Workshop",teacher:"Mr. D'souza",room:"Rm 108",time:"01:35–02:20",day:"Wed",subject:"English"},
  {period:"P6",title:"Chemical Bonding",teacher:"Dr. H. Patel",room:"Chem Lab 2",time:"01:35–02:20",day:"Thu",subject:"Chemistry"},
  {period:"P7",title:"Athletics / Track",teacher:"Coach Rawat",room:"Ground A",time:"02:25–03:15",day:"Mon",subject:"PhysEd"},
  {period:"P7",title:"Football Practice",teacher:"Coach Rawat",room:"Football Ground A",time:"02:25–03:15",day:"Tue",subject:"PhysEd"},
  {period:"P7",title:"Classical Ensemble",teacher:"Mr. R. Bhat",room:"Music Hall",time:"02:25–03:15",day:"Wed",subject:"Arts"},
  {period:"P7",title:"Basketball D.",teacher:"Coach Rawat",room:"Indoor Court",time:"02:25–03:15",day:"Thu",subject:"PhysEd"},
];

export const allNotices = [
  {id:1,tag:"Academic",category:"Academic",date:"Due this Friday",title:"National Science Olympiad Synopsis",text:"Submit experimental project synopses to Dr. Evans before 4:00 PM. All essays, portfolios, and codebases undergo automated similarity scanning upon submission.",urgent:true},
  {id:2,tag:"Sports & House",category:"Sports & House",date:"Yesterday",title:"Annual Inter-House Football Championship Semifinal: Emerald Falcons vs Ruby Lions",text:"The championship knockout stage kicks off at the Main Athletics Arena this Friday afternoon.",urgent:false},
  {id:3,tag:"Campus Life",category:"Campus Life",date:"3 days ago",title:"Greenwood Annual Science Exhibition & Model UN Delegations Invitation",text:"Applications are now invited for country delegates in the upcoming 9th Annual Greenwood Model United Nations.",urgent:false},
  {id:4,tag:"Administration",category:"Administration",date:"4 days ago",title:"Upcoming School Timing Adjustments for Founder's Day Rehearsals",text:"Please be advised that from February 26th to March 1st, classes will be concluded at 01:45 PM.",urgent:false},
  {id:5,tag:"Academic",category:"Academic",date:"Last week",title:"Mandatory Pre-Board Assessment Guidelines & Seating Protocol for Class 10-B",text:"All students enrolled in Grade 10 Section B must strictly follow the updated institutional assessment protocols commencing Monday, February 24th, 2025.",urgent:true},
  {id:6,tag:"Sports & House",category:"Sports & House",date:"5 days ago",title:"Annual Athletic Meet 2025 Registration",text:"Entries for Track & Field events are now open. Register before Saturday.",urgent:false},
  {id:7,tag:"Campus Life",category:"Campus Life",date:"8 days ago",title:"Library Digital Pass Integration",text:"Scan your Greenwood student bar-code at the turnstiles from Monday.",urgent:false},
  {id:8,tag:"Academic",category:"Academic",date:"Last week",title:"PTM Rescheduled",text:"Parent-Teacher Meeting has been rescheduled to March 22nd, 10 AM – 1 PM.",urgent:false},
  {id:9,tag:"Campus Life",category:"Campus Life",date:"9 days ago",title:"School Canteen Menu Update",text:"New healthy meal options have been added to the school canteen from Monday.",urgent:false},
  {id:10,tag:"Academic",category:"Academic",date:"10 days ago",title:"Mathematics Olympiad Results",text:"Congratulations to Aarav Sharma for securing 1st place in the district Maths Olympiad.",urgent:false},
  {id:11,tag:"Campus Life",category:"Campus Life",date:"11 days ago",title:"Smart ID Card Distribution",text:"New RFID-enabled smart ID cards will be distributed from the admin office this week.",urgent:false},
  {id:12,tag:"Academic",category:"Academic",date:"12 days ago",title:"Project Work Submission",text:"Science project models must be submitted to the lab by end of month.",urgent:false},
  {id:13,tag:"Sports & House",category:"Sports & House",date:"13 days ago",title:"Yoga Day Practice Sessions",text:"International Yoga Day preparation sessions start every morning at 7 AM on the terrace.",urgent:false},
  {id:14,tag:"Campus Life",category:"Campus Life",date:"2 weeks ago",title:"Campus Wi-Fi Upgrade",text:"Campus Wi-Fi has been upgraded to 1 Gbps. Students can connect with their ERP credentials.",urgent:false},
];

export const homeworkList = [
  {id:1,subject:"Physics",tag:"Physics",color:"#495057",title:"Advanced Electromagnetism Numerical Problem Set #4",instructor:"Dr. A. Evans",desc:"Maxwell's equations, magnetic flux through toroids & induced EMF derivations.",due:"Today (4 hrs left • 05:00 PM)",weight:"15% Continuous Assessment",file:"assignment_sheet_ch4.pdf (2.4 MB)",questions:"10 Multi-Part Questions",status:"due",urgent:true},
  {id:2,subject:"Computer Science",tag:"Computer Science",color:"#087f5b",title:"Data Structures in Python: Binary Search Tree Implementation",instructor:"Mr. K. Sharma",desc:"Implement recursive insert, in-order traversal, and node deletion with unit test cases.",due:"Tomorrow 23:59",weight:"Language: Python 3.11",file:"bst_starter_kit_v2.zip (1.1 MB)",questions:"PyUnit Score ≥ 9.0 Req.",status:"due",urgent:false},
  {id:3,subject:"Mathematics",tag:"Mathematics",color:"#20a77a",title:"Integrals & Substitution Worksheet 3B",instructor:"Mrs. Roy",desc:"Definite integrals of trigonometric functions & u-substitution techniques.",due:"Submitted Yesterday",weight:"3.8 MB PDF",file:"aarav_sharma_math_ws3b.pdf (3.8 MB)",questions:"514A–756 lines Verified • 1 Submission on file",status:"submitted",urgent:false},
  {id:4,subject:"English Literature",tag:"English Literature",color:"#adb5bd",title:"Shakespeare's Macbeth Act III Soliloquy Essay",instructor:"Mr. Kumar",desc:"Analytical comparison of psychological degeneration and guilt imagery.",due:"Evaluated on Mar 22",weight:"Score: 20/20 • Grade A1 (Distinction)",file:"",questions:"",status:"evaluated",urgent:false},
];

export const examSchedule = [
  {date:"FEB 25",day:"Tue",code:"PHY-102",subject:"Physics Theory & Numerical Analysis",time:"09:00 AM – 12:00 PM",room:"Hall 3",desk:"#24",syllabus:"Units 1-6 (Kinematics, Electromagnetism, Optics)",status:"upcoming"},
  {date:"FEB 27",day:"Thu",code:"MTH-104",subject:"Mathematics (Calculus, Vectors & Trigonometry)",time:"09:00 AM – 12:00 PM",room:"Hall 3",desk:"#24",syllabus:"Differential Calculus, Coordinate Geometry, Matrices",status:"upcoming"},
  {date:"MAR 02",day:"Sun",code:"CSC-108",subject:"Computer Science Practical & Theory Application",time:"09:00 AM – 12:00 PM",room:"CS Lab 2",desk:"+ Ter",syllabus:"Python OOP, SQL, Database Queries, Networking",status:"upcoming"},
  {date:"MAR 05",day:"Wed",code:"CHM-103",subject:"Chemistry Theory & Organic Chemistry",time:"09:00 AM – 12:00 PM",room:"Hall 3",desk:"#108-24",syllabus:"Carbon Compounds, Periodic Table, Electrochemistry",status:"upcoming"},
  {date:"MAR 08",day:"Sat",code:"ENG-101",subject:"English Language & Literature",time:"09:00 AM – 12:00 PM",room:"Hall 1",desk:"#108-15",syllabus:"Prose Analysis, Poetry, Critical Appreciation, Creative Essay",status:"upcoming"},
  {date:"MAR 11",day:"Tue",code:"SOC-105",subject:"Social Sciences (History, Civics & Geography)",time:"09:00 AM – 12:00 PM",room:"Hall 3",desk:"#108",syllabus:"Contemporary World History, Indian Constitution, Resource Mapping",status:"upcoming"},
];

export const notes = [
  {id:1,subject:"Physics",title:"Electromagnetic Induction & Faraday's Laws – Master Summary Notes",teacher:"Dr. A. Evans",pages:14,size:"PDF (3.2 MB)",tags:["#FormulaSheet","#CBSE2025","#NumericalGuide"],rating:4.8,type:"Term II Special",color:"#495057"},
  {id:2,subject:"Mathematics",title:"Calculus & Vectors Quick Reference Guide – 45 Solved Theorems",teacher:"Mrs. Roy",pages:22,size:"PDF (4.8 MB)",tags:["#VectorAlgebra","#Integration"],rating:4.9,type:"Faculty Recommended",color:"#20a77a"},
  {id:3,subject:"Computer Science",title:"Python OOP Concepts & Binary Search Tree Code Examples",teacher:"Mr. K. Sharma",pages:11,size:"1.6 MB",tags:["#DataStructures","#PythonOOP","#Algorithms"],rating:4.7,type:"Jupyter + PDF",color:"#087f5b"},
  {id:4,subject:"Chemistry",title:"Organic Chemistry Functional Groups & Reaction Mechanisms Flowchart",teacher:"Dr. H. Patel",pages:6,size:"6.1 MB",tags:["#OrganicChemistry","#ReactionMap","#PrintablePoster"],rating:4.6,type:"Poster Map",color:"#e67700"},
  {id:5,subject:"English Literature",title:"Shakespeare's Macbeth Themes, Quotes, and Character Arc Analysis",teacher:"Ms. Clare D'Souza",pages:11,size:"1.5 MB",tags:["#ThemeQuotes","#EssayFramework"],rating:4.5,type:"Critical Essay Guide",color:"#adb5bd"},
];

export const syllabusUnits = [
  {unit:"Unit 1: Real Numbers & Polynomials",status:"Completed",score:"100% (8/8)",desc:"Fundamental theorem of Arithmetic, zeros of quadratic equations & polynomial division algorithm."},
  {unit:"Unit 2: Linear Equations & Quadratic Equations",status:"Completed",score:"97%",desc:"Pair of linear equations in two variables, graphical solutions, discriminant nature of roots."},
  {unit:"Unit 3: Arithmetic Progressions & Triangles",status:"Completed",score:"Graded A+",desc:"General term, sum of first n items, Basic Proportionality Theorem & similarity proofs."},
  {unit:"Unit 4: Coordinate Geometry & Vectors",status:"In Progress",score:"70% Covered",desc:"Distance formula, section formula, Dot Product & Coplanar Vectors. Current Lecture Focus."},
  {unit:"Unit 5: Trigonometry & Applications",status:"Upcoming",score:"–",desc:"Trigonometric identities, heights and distances, angles of elevation & depression. Starts March 5, 2025."},
  {unit:"Unit 6: Statistics & Probability",status:"Upcoming",score:"–",desc:"Mean, median, mode of grouped data, cumulative frequency distribution, classical probability."},
];

export const doubts = [
  {id:1,student:"Aarav Sharma",grade:"10-A",subject:"Physics (Electromagnetism)",question:"In Lenz's Law, how is energy conservation preserved when a magnet is pushed through a conducting copper loop?",answer:"Excellent observation, Aarav! Energy conservation in Lenz's Law is the textbook application of the Work-Energy theorem applied to the whole body system.",teacher:"Dr. Arvika Prem",verified:true,helpful:57,time:"2 days ago",status:"Faculty Replied"},
  {id:2,student:"Rohan Verma",grade:"10-A",subject:"Mathematics (Sections & 3D)",question:"How to rigorously prove collinearity of three distinct points A, B, and C using cross-product?","answer":"",helpful:8,time:"5 mins ago",status:"Under Faculty Review"},
  {id:3,student:"Dev Kulkarni",grade:"10-G",subject:"Computer Science (Algorithms)",question:"Time complexity differences between BFS and DFS traversal in cyclic directed graphs","answer":"Piyoj Sen (Peer Contributor • Grade 10) provided a solution with code examples.",helpful:12,time:"3 hrs ago",status:"Peer Resolved"},
];
