const users = [
	{
		id: 1,
		phone: "+237656895348",
		profile: { firstName: "Mikayla", lastName: "Simpson" },
	},
	{
		id: 2,
		phone: "+237658954123",
		profile: { firstName: "Héloïse Adélaïde", lastName: "Letissier" },
	},
	{
		id: 3,
		phone: "+237656412421",
		profile: { firstName: "Rick", lastName: "Astley" },
	},
	{
		id: 4,
		phone: "+237678451123",
		profile: { firstName: "William", lastName: "Kalubi" },
	},
];

module.exports = users;

//
//
// DUMMY DATA
//
//

// const {
// 	subDays,
// 	subMinutes,
// 	addHours,
// 	addDays,
// 	addMinutes,
// 	subHours,
// } = require("date-fns");

// //
// // USERS
// // --> CURRENT
// const me = {
// 	// Default attributes
// 	id: "usr-100",
// 	registeredOn: "2021-05-08T02:23:58+01:00",
// 	status: 1,
// 	phone: "+237656895348",
// 	type: "student",
// 	email: "frankkevymbappe@gmail.com",
// 	classrooms: ["cls-001", "cls-002", "cls-003"],
// 	lastTimeConnected: "2021-02-17 09:58:13",
// 	profile: {
// 		nomination: "",
// 		firstName: "Frank Kevy",
// 		lastName: "Mbappe",
// 		fullName: "Frank MBAPPE",
// 		birthday: "2001-12-19",
// 		gender: "male",
// 		picUri: "https://picsum.photos/id/1047/300/300",
// 	},
// 	pocket: {
// 		posts: ["pos-110"],
// 		notes: [],
// 	},

// 	// Specific attributes
// 	faculty: "General nursing",
// 	school: {
// 		id: "school-00001",
// 		name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
// 	},
// 	grade: 12,
// 	reportCard: {},
// };
// // --> TEACHERS
// const teachers = [
// 	{
// 		// Default attributes
// 		id: "usr-210",
// 		registeredOn: "2021-02-17T17:32:51+01:00",
// 		status: 0,
// 		phone: "+237656895347",
// 		type: "teacher",
// 		email: "samwellkong@gmail.com",
// 		classrooms: ["cls-001", "cls-002"],
// 		lastTimeConnected: "2021-02-17 09:58:13",
// 		profile: {
// 			nomination: "Dr.",
// 			firstName: "Samwell",
// 			lastName: "KONG",
// 			fullName: "Dr. Samwell KONG",
// 			birthday: "1985-02-05",
// 			gender: "male",
// 			picUri: "https://picsum.photos/id/1005/300/300",
// 		},
// 		pocket: {
// 			posts: ["pos-110"],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		// --> As a consultant
// 		company: "Polyclinique IDIMED - Douala, Bonapriso",
// 		proPhone: "+237653243512",
// 		proEmail: "drsamwellkong@idimail.com",
// 		mainDomain: "domain-00001",
// 		additDomains: ["domain-00002", "domain-00003"],
// 		yearsOfExperience: 15,
// 		// --> As a teacher
// 		lecturesAt: [
// 			{
// 				id: "school-00001",
// 				name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
// 			},
// 			{
// 				id: "school-00002",
// 				name: "University of Buea - Buea",
// 			},
// 		],
// 		lectures: [
// 			"General Nursing Science",
// 			"Professional Nursing 1",
// 			"Concepts in Pathophysiology & Pharmacology",
// 			"Nursing Care of Adults Across the Life Span ",
// 		],
// 	},
// 	{
// 		// Default attributes
// 		id: "usr-211",
// 		registeredOn: "2020-08-11 10:13:28",
// 		status: 0,
// 		phone: "+237656895349",
// 		type: "teacher",
// 		email: "ewubemarceline@gmail.com",
// 		classrooms: ["cls-001", "cls-002"],
// 		lastTimeConnected: "2021-02-17 10:25:02",
// 		profile: {
// 			nomination: "Mrs.",
// 			firstName: "Marceline",
// 			lastName: "EWUBE",
// 			fullName: "Mrs. Marceline EWUBE",
// 			birthday: "1987-03-14",
// 			gender: "female",
// 			picUri: "https://picsum.photos/id/237/300/300",
// 		},
// 		pocket: {
// 			posts: ["pos-111"],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		// --> As a consultant
// 		company: "Polyclinique IDIMED - Douala, Bonapriso",
// 		proPhone: "+237653243513",
// 		proEmail: "drewubemarceline@idimail.com",
// 		mainDomain: "domain-00002",
// 		additDomains: ["domain-00001", "domain-00003"],
// 		yearsOfExperience: 12,
// 		// --> As a teacher
// 		lecturesAt: [
// 			{
// 				id: "school-00001",
// 				name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
// 			},
// 			{
// 				id: "school-00002",
// 				name: "University of Buea - Buea",
// 			},
// 		],
// 		lectures: [
// 			"General Nursing Science",
// 			"Physiotherapy",
// 			"Health Assessment and Communication",
// 		],
// 	},
// ];
// // --> STUDENTS
// const students = [
// 	{
// 		// Default attributes
// 		id: "usr-110",
// 		registeredOn: "2021-02-21T17:32:51+01:00",
// 		status: 0,
// 		phone: "+237656895354",
// 		type: "student",
// 		email: "jojoelmatador27@gmail.com",
// 		classrooms: ["cls-001", "cls-002", "cls-003"],
// 		lastTimeConnected: "2021-02-17 09:58:13",
// 		profile: {
// 			nomination: "",
// 			firstName: "Joseph",
// 			lastName: "KRUMAH",
// 			fullName: "Joseph KRUMAH",
// 			birthday: "1999-12-18",
// 			gender: "male",
// 			picUri: "https://picsum.photos/id/1015/300/300",
// 		},
// 		pocket: {
// 			posts: [],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		faculty: "Critical Care Nurse",
// 		school: {
// 			id: "school-00001",
// 			name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
// 		},
// 		grade: 12,
// 		reportCard: {},
// 	},
// 	{
// 		// Default attributes
// 		id: "usr-111",
// 		registeredOn: "2021-04-21T17:32:51+01:00",
// 		status: 0,
// 		phone: "+237656895354",
// 		type: "student",
// 		email: "carolaveli@gmail.com",
// 		classrooms: ["cls-001", "cls-003"],
// 		lastTimeConnected: "2021-02-17 09:58:13",
// 		profile: {
// 			nomination: "",
// 			firstName: "Caroline Estelle Manuella",
// 			lastName: "Mokam Tene",
// 			fullName: "Caroline Mokam",
// 			birthday: "1997-04-01",
// 			gender: "female",
// 			picUri: "https://picsum.photos/id/1014/300/300",
// 		},
// 		pocket: {
// 			posts: [],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		faculty: "Critical Care Nurse",
// 		school: {
// 			id: "school-00001",
// 			name: "Institut Universitaire de la Côte (IUC) - Douala, Logbessou",
// 		},
// 		grade: 12,
// 		reportCard: {},
// 	},
// 	{
// 		// Default attributes
// 		id: "usr-112",
// 		registeredOn: "2020-05-08T20:31:07+01:00",
// 		status: 0,
// 		phone: "+237656895355",
// 		type: "student",
// 		email: "clairekbrown@gmail.com",
// 		classrooms: ["cls-001", "cls-002"],
// 		lastTimeConnected: "2021-02-17 09:58:13",
// 		profile: {
// 			nomination: "",
// 			firstName: "Claire-Ameline",
// 			lastName: "Sontchou",
// 			fullName: "Claire-Ameline SONTCHOU",
// 			birthday: "1998-06-15",
// 			gender: "female",
// 			picUri: "https://picsum.photos/id/1016/300/300",
// 		},
// 		pocket: {
// 			posts: [],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		faculty: "Geriatric Nursing",
// 		school: {
// 			id: "school-00002",
// 			name: "University of Buea - Buea",
// 		},
// 		grade: 12,
// 		reportCard: {},
// 	},
// 	{
// 		// Default attributes
// 		id: "usr-113",
// 		registeredOn: "2021-05-08T20:31:07+01:00",
// 		status: 0,
// 		phone: "+237656895356",
// 		type: "student",
// 		email: "base10bigmop@gmail.com",
// 		classrooms: ["cls-001", "cls-002", "cls-003"],
// 		lastTimeConnected: "2021-02-17 09:58:13",
// 		profile: {
// 			nomination: "",
// 			firstName: "Basile Joël",
// 			lastName: "Mekontchou",
// 			fullName: "Joël MEKONTCHOU",
// 			birthday: "2001-12-14",
// 			gender: "male",
// 			picUri: "https://picsum.photos/id/1025/300/300",
// 		},
// 		pocket: {
// 			posts: [],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		faculty: "Cardiac Nurse",
// 		school: {
// 			id: "school-00002",
// 			name: "University of Buea - Buea",
// 		},
// 		grade: 12,
// 		reportCard: {},
// 	},
// ];
// // --> CONSULTANTS
// const consultants = [
// 	{
// 		// Default attributes
// 		id: "usr-310",
// 		registeredOn: "2020-09-09T20:31:07+01:00",
// 		status: 0,
// 		phone: "+237656895350",
// 		type: "consultant",
// 		email: "paulinebea2654@gmail.com",
// 		classrooms: ["cls-001"],
// 		lastTimeConnected: "2021-02-17 09:58:13",
// 		profile: {
// 			nomination: "Dr.",
// 			firstName: "Anne Pauline",
// 			lastName: "Béa",
// 			fullName: "Dr. Anne Pauline Béa",
// 			birthday: "1990-02-05",
// 			gender: "female",
// 			picUri: "https://picsum.photos/id/1003/300/300",
// 		},
// 		pocket: {
// 			posts: [],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		// --> As a consultant
// 		company: "Fondation Médicale Adlucem - Douala, Bonamoussadi",
// 		proPhone: "+237653243514",
// 		proEmail: "drbeannepaul@adlucem.com",
// 		mainDomain: "domain-00003",
// 		additDomains: ["domain-00001"],
// 		yearsOfExperience: 5,
// 	},
// 	{
// 		// Default attributes
// 		id: "usr-311",
// 		registeredOn: "2020-05-08T20:31:07+01:00",
// 		status: 0,
// 		phone: "+237656895351",
// 		type: "consultant",
// 		email: "adelechukweze@gmail.com",
// 		classrooms: ["cls-002"],
// 		lastTimeConnected: "",
// 		profile: {
// 			nomination: "Dr.",
// 			firstName: "Adele",
// 			lastName: "Chukweze",
// 			fullName: "Dr. Adele CHUKWEZE",
// 			birthday: "1998-01-21",
// 			gender: "female",
// 			picUri: "https://picsum.photos/id/1010/300/300",
// 		},
// 		pocket: {
// 			posts: [],
// 			notes: [],
// 		},

// 		// Specific attributes
// 		// --> As a consultant
// 		company: "Fondation Médicale Adlucem - Douala, Bonamoussadi",
// 		proPhone: "+237653243515",
// 		proEmail: "dradelechukweze@adlucem.com",
// 		mainDomain: "domain-00002",
// 		additDomains: ["domain-00001"],
// 		yearsOfExperience: 2,
// 	},
// ];
// // --> ALL
// const users = [...teachers, ...students, ...consultants, me];

// //
// // CLASSROOMS
// const classrooms = [
// 	{
// 		id: "cls-001",
// 		name: "IUC BTECH SWE 3 2020-2021",
// 		description:
// 			"This is the official classroom of level 3 Btech software engineering students of IUC.",
// 		teacher: teachers.find((x) => x.id === "usr-210"),
// 		students: [...students.filter((x) => "cls-001" in x.classrooms), me],
// 		consultants: consultants.filter((x) => "cls-001" in x.classrooms),
// 		participants: users.filter((x) => x.classrooms.includes("cls-001")),
// 		postsPerDay: 2.32,
// 		posts: [
// 			// Simple
// 			{
// 				id: "pos-110",
// 				author: users.find((x) => x.id === "usr-210"),
// 				createdOn: "2021-05-10T11:36:21+01:00",
// 				classroom: "cls-001",
// 				text: "Dear students, repetition is the mother of success. Keep doing what you do on and on until it becomes genuinely natural.",
// 				likes: [
// 					{ date: new Date().toISOString(), userId: "usr-110" },
// 					{ date: new Date().toISOString(), userId: "usr-111" },
// 					{ date: new Date().toISOString(), userId: "usr-112" },
// 				],
// 				comments: [
// 					{
// 						id: "pos-110-com-001",
// 						datePublished: new Date().toISOString(),
// 						author: users.find((x) => x.id === "usr-110"),
// 						text: "Pretty helpful, thanks sir !",
// 						replies: [
// 							{
// 								id: "pos-110-com-002",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-210"),
// 								text: "@usr-110 You're welcome my child",
// 							},
// 							{
// 								id: "pos-110-com-003",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-110"),
// 								text: "@usr-210 ('^ - ^)",
// 							},
// 						],
// 						likes: [
// 							{ date: new Date().toISOString(), userId: "usr-210" },
// 							{ date: new Date().toISOString(), userId: "usr-112" },
// 						],
// 					},
// 				],
// 				shares: 12,
// 				tags: ["inspiration", "motivation", "FakeItTillYouMakeIt"],
// 				haveSeen: ["usr-100"],
// 			},

// 			// With photo
// 			{
// 				id: "pos-111",
// 				author: users.find((x) => x.id === "usr-210"),
// 				createdOn: "2021-05-12T16:52:43+00:00",
// 				classroom: "cls-001",
// 				text: "Dear students, repetition is the mother of success. Keep doing what you do on and on until it becomes genuinely natural.",
// 				likes: users.map((x) => ({
// 					date: new Date().toISOString(),
// 					userId: x.id,
// 				})),
// 				comments: [
// 					{
// 						id: "pos-111-com-001",
// 						datePublished: new Date().toISOString(),
// 						author: users.find((x) => x.id === "usr-310"),
// 						text: "Tremendous quote here, I must take some notes",
// 						replies: [
// 							{
// 								id: "pos-111-com-002",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-210"),
// 								text: "@usr-310 Lol, do so then",
// 							},
// 							{
// 								id: "pos-111-com-003",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-310"),
// 								text: "@usr-210 Bet, I will",
// 							},
// 							{
// 								id: "pos-111-com-004",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-100"),
// 								text: "@usr-110 I agree, totally",
// 							},
// 						],
// 						likes: [
// 							{ date: new Date().toISOString(), userId: "usr-210" },
// 							{ date: new Date().toISOString(), userId: "usr-112" },
// 							{ date: new Date().toISOString(), userId: "usr-111" },
// 							{ date: new Date().toISOString(), userId: "usr-310" },
// 						],
// 					},
// 				],
// 				shares: 12,
// 				file: {
// 					uri: "https://picsum.photos/id/1029/200/300",
// 					type: "image",
// 					size: "148",
// 					name: "1029",
// 					extension: "jpg",
// 				},
// 				tags: ["inspiration", "motivation", "FakeItTillYouMakeIt"],
// 				haveSeen: [],
// 			},

// 			// With video
// 			{
// 				id: "pos-112",
// 				author: users.find((x) => x.id === "usr-210"),
// 				createdOn: "2020-12-25T11:36:21+01:00",
// 				classroom: "cls-001",
// 				text: "Dear students, repetition is the mother of success. Keep doing what you do on and on until it becomes genuinely natural.",
// 				likes: users.map((x) => ({
// 					date: new Date().toISOString(),
// 					userId: x.id,
// 				})),
// 				comments: [
// 					{
// 						id: "pos-112-com-001",
// 						datePublished: new Date().toISOString(),
// 						author: users.find((x) => x.id === "usr-310"),
// 						text: "Tremendous quote here, I must take some notes",
// 						replies: [
// 							{
// 								id: "pos-112-com-002",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-210"),
// 								text: "@usr-310 Lol, do so then",
// 							},
// 							{
// 								id: "pos-112-com-003",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-310"),
// 								text: "@usr-210 Bet, I will",
// 							},
// 							{
// 								id: "pos-112-com-004",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-100"),
// 								text: "@usr-110 I agree, totally",
// 							},
// 						],
// 						likes: [
// 							{ date: new Date().toISOString(), userId: "usr-210" },
// 							{ date: new Date().toISOString(), userId: "usr-112" },
// 							{ date: new Date().toISOString(), userId: "usr-111" },
// 							{ date: new Date().toISOString(), userId: "usr-310" },
// 						],
// 					},
// 				],
// 				shares: 12,
// 				file: {
// 					uri: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_2MB.mp4",
// 					type: "video",
// 					size: "2048",
// 					length: "160",
// 					name: "Big_Buck_Bunny_360_10s_2MB",
// 					extension: "mp4",
// 				},
// 				tags: ["inspiration", "motivation", "FakeItTillYouMakeIt"],
// 				haveSeen: ["usr-100"],
// 			},

// 			// With other file type
// 			{
// 				id: "pos-114",
// 				author: users.find((x) => x.id === "usr-211"),
// 				createdOn: "2021-05-11T18:10:57+01:00",
// 				classroom: "cls-001",
// 				text: "Dear students, repetition is the mother of success. Keep doing what you do on and on until it becomes genuinely natural.",
// 				likes: [
// 					{ date: new Date().toISOString(), userId: "usr-100" },
// 					{ date: new Date().toISOString(), userId: "usr-110" },
// 					{ date: new Date().toISOString(), userId: "usr-111" },
// 					{ date: new Date().toISOString(), userId: "usr-112" },
// 				],
// 				comments: [
// 					{
// 						id: "pos-114-com-001",
// 						datePublished: new Date().toISOString(),
// 						author: users.find((x) => x.id === "usr-110"),
// 						text: "Pretty helpful, thanks sir !",
// 						replies: [
// 							{
// 								id: "pos-114-com-002",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-210"),
// 								text: "@usr-110 You're welcome my child",
// 							},
// 							{
// 								id: "pos-114-com-003",
// 								datePublished: new Date().toISOString(),
// 								author: users.find((x) => x.id === "usr-110"),
// 								text: "@usr-210 ('^ - ^)",
// 							},
// 						],
// 						likes: [
// 							{ date: new Date().toISOString(), userId: "usr-210" },
// 							{ date: new Date().toISOString(), userId: "usr-112" },
// 						],
// 					},
// 				],
// 				file: {
// 					uri: "http",
// 					type: "file",
// 					size: 78523,
// 					length: "160",
// 					name: "General Recommendations on Headaches and Earaches by Doctor Roselyn Sanchez",
// 					extension: "pdf",
// 				},
// 				shares: 12,
// 				tags: ["inspiration", "motivation", "FakeItTillYouMakeIt"],
// 				haveSeen: [],
// 			},
// 		],
// 		topics: [
// 			{
// 				id: "cls-001-top-001",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "Genomics",
// 			},
// 			{
// 				id: "cls-001-top-002",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "Metabolism",
// 			},
// 			{
// 				id: "cls-001-top-003",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "Hyperglycemia",
// 			},
// 			{
// 				id: "cls-001-top-004",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "Cardiac muscle",
// 			},
// 			{
// 				id: "cls-001-top-005",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "AIDS",
// 			},
// 		],
// 	},
// 	{
// 		id: "cls-002",
// 		name: "Clinical Nurse Specialists - University Of Buea",
// 		description:
// 			"This is the official classroom of the clinical nurse specialists of the University of Buea.",
// 		teacher: teachers.find((x) => x.id === "usr-211"),
// 		students: [...students.filter((x) => "cls-002" in x.classrooms), me],
// 		consultants: consultants.filter((x) => "cls-002" in x.classrooms),
// 		participants: users.filter((x) => x.classrooms.includes("cls-002")),
// 		postsPerDay: 1.04,
// 		posts: [],
// 		topic: [],
// 	},
// 	{
// 		id: "cls-003",
// 		name: "Cardiac Nursing - University Of Buea",
// 		description:
// 			"This is the official classroom of the cardiac nurses of the University of Buea.",
// 		teacher: teachers.find((x) => x.id === "usr-210"),
// 		students: [...students.filter((x) => "cls-003" in x.classrooms), me],
// 		consultants: consultants.filter((x) => "cls-003" in x.classrooms),
// 		participants: users.filter((x) => x.classrooms.includes("cls-003")),
// 		postsPerDay: 0.89,
// 		posts: [],
// 		topics: [
// 			{
// 				id: "cls-003-top-001",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "Metabolism",
// 			},
// 			{
// 				id: "cls-003-top-002",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "Cardiac muscle",
// 			},
// 			{
// 				id: "cls-003-top-003",
// 				created: subDays(new Date(), 3).toISOString(),
// 				title: "AIDS",
// 			},
// 		],
// 	},
// ];

// //
// // POSTS
// const posts = classrooms.flatMap(({ posts }) => posts);

// //
// // EVENTS
// const events = [
// 	{
// 		id: "evt-001",
// 		type: "quiz",
// 		classroom: classrooms.find((x) => x.id === "cls-002").name,
// 		name: "Cardialogy Semester Evaluation",
// 		dateOpening: subDays(new Date(), 4).toISOString(),
// 		dateClosing: subDays(new Date(), 3).toISOString(),
// 	},
// 	{
// 		id: "evt-002",
// 		type: "quiz",
// 		classroom: classrooms.find((x) => x.id === "cls-003").name,
// 		name: "Blood pressure measurement test hhhhhhhhhh hhhhhhhhh hhhhhhhhhh",
// 		dateOpening: subMinutes(new Date(), 7).toISOString(),
// 		dateClosing: addHours(new Date(), 2).toISOString(),
// 	},
// 	{
// 		id: "evt-003",
// 		type: "quiz",
// 		classroom: classrooms.find((x) => x.id === "cls-002").name,
// 		name: "Citizenship Weekly Evaluation",
// 		dateOpening: subHours(new Date(), 1).toISOString(),
// 		dateClosing: addMinutes(new Date(), 4).toISOString(),
// 	},
// 	{
// 		id: "evt-004",
// 		type: "quiz",
// 		classroom: classrooms.find((x) => x.id === "cls-001").name,
// 		name: "IUC Nursing Department Daily Test",
// 		dateOpening: addDays(new Date(), 2).toISOString(),
// 		dateClosing: addDays(new Date(), 3).toISOString(),
// 	},
// 	{
// 		id: "evt-005",
// 		type: "quiz",
// 		classroom: classrooms.find((x) => x.id === "cls-002").name,
// 		name: "Citizenship Weekly Evaluation",
// 		dateOpening: addDays(new Date(), 7).toISOString(),
// 		dateClosing: addDays(new Date(), 8).toISOString(),
// 	},
// 	{
// 		id: "evt-006",
// 		type: "quiz",
// 		classroom: classrooms.find((x) => x.id === "cls-002").name,
// 		name: "General Nursing Semester Test",
// 		dateOpening: addDays(new Date(), 11).toISOString(),
// 		dateClosing: addDays(new Date(), 12).toISOString(),
// 	},
// ];

// //
// // QUIZZES
// const quizzes = [
// 	{
// 		id: "qzz-01",
// 		creationDate: subDays(new Date(), 4).toISOString(),
// 		title: "Second semester exams in Cardiology and Physiology",
// 		dateOpening: subDays(new Date(), 1).toISOString(),
// 		dateClosing: addDays(new Date(), 2).toISOString(),
// 		secondsPerQa: 90,
// 		qas: [
// 			{
// 				id: "1",
// 				topic: "Muscle Anatomy",
// 				question:
// 					"Within each sarcomere, contraction occurs when thin (actin) filaments are grabbed by thick (myosin) filaments and pulled toward the center of each sarcomere.",
// 				answers: [
// 					{
// 						id: "1",
// 						value: "True",
// 					},
// 					{
// 						id: "2",
// 						value: "False",
// 					},
// 				],
// 				rightAnswers: ["2"],
// 				timer: 10,
// 			},
// 			{
// 				id: "2",
// 				topic: "Cardiac Muscle & Physiology",
// 				question: "How is cardiac muscle primarily controlled?",
// 				answers: [
// 					{
// 						id: "1",
// 						value: "On a voluntary basis via the somatic nervous system",
// 					},
// 					{
// 						id: "2",
// 						value: "On an involuntary basis via the autonomic nervous system",
// 					},
// 					{ id: "3", value: "None of the above" },
// 				],
// 				rightAnswers: ["1"],
// 				timer: null,
// 			},
// 			{
// 				id: "3",
// 				topic: "Body Cavities and Membranes",
// 				question:
// 					"The three membranes found in the dorsal cavity that cover the spinal cord and brain are collectively called ...?",
// 				answers: [
// 					{
// 						id: "1",
// 						value: "Peritoneal membranes",
// 					},
// 					{
// 						id: "2",
// 						value: "Meninges",
// 					},
// 					{
// 						id: "4",
// 						value: "Serous membranes",
// 					},
// 					{ id: "3", value: "None of the above" },
// 				],
// 				rightAnswers: ["1"],
// 				timer: 10,
// 			},
// 			{
// 				id: "4",
// 				topic: "Cardiac Muscle & Physiology",
// 				question:
// 					"True or False: During gas exchange, carbon dioxide is transported across the capillary membrane to be exhaled while oxygen is transported across the capillary membrane to attach to the red blood cells.",
// 				answers: [
// 					{
// 						id: "1",
// 						value: "True",
// 					},
// 					{
// 						id: "2",
// 						value: "False",
// 					},
// 				],
// 				rightAnswers: ["2"],
// 				timer: 10,
// 			},
// 			{
// 				id: "5",
// 				topic: "Newborn Infant Reflexes NCLEX",
// 				question:
// 					"During an assessment of an infant, you note that when the infant's head is turned to the right side, the leg and arm on the right side will extend, while the leg and arm on the left side will flex. You document this as what type of reflex?",
// 				answers: [
// 					{
// 						id: "1",
// 						value: "Rooting Reflex",
// 					},
// 					{
// 						id: "2",
// 						value: "Sucking Reflex",
// 					},
// 					{
// 						id: "3",
// 						value: "Moro Reflex",
// 					},
// 					{
// 						id: "4",
// 						value: "Tonic Neck Reflex",
// 					},
// 				],
// 				rightAnswers: ["4"],
// 				timer: 10,
// 			},
// 			{
// 				id: "6",
// 				topic: "Newborn Infant Reflexes NCLEX",
// 				question:
// 					"When the Moro Reflex is stimulated in an infant, the infant will _____________the arms with the palms of the hands turned ___________ and then move the arms ___________ the body.",
// 				answers: [
// 					{
// 						id: "1",
// 						value: "flex, upward, away from",
// 					},
// 					{
// 						id: "2",
// 						value: "extend, upward, back to",
// 					},
// 					{
// 						id: "3",
// 						value: "flex, downward, back to",
// 					},
// 					{
// 						id: "4",
// 						value: "extend, downward, away from",
// 					},
// 				],
// 				rightAnswers: ["2"],
// 				timer: 10,
// 			},
// 			{
// 				id: "7",
// 				topic: "Newborn Infant Reflexes NCLEX",
// 				question:
// 					"The nurse wants to assess the crawling reflex in a newborn. How is this reflex assessed?",
// 				answers: [
// 					{
// 						id: "1",
// 						value:
// 							"The nurse places the infant in the prone position and applies pressure with the hand to the sole of the foot. In response, the infant should attempt to push against the hand and move the arms and legs in a crawling like motion.",
// 					},
// 					{
// 						id: "2",
// 						value:
// 							"The nurse places the infant in the supine position and applies pressure with the hand to the sole of the foot. In response, the infant should attempt to push against the hand and move the arms and legs in a crawling like motion.",
// 					},
// 					{
// 						id: "3",
// 						value:
// 							"The nurse places the infant in the prone position and applies pressure with the hand to the neck. In response, the infant should attempt to move the arms and legs in a crawling like motion.",
// 					},
// 					{
// 						id: "4",
// 						value:
// 							"The nurse places the infant in the supine position. In response, the infant should attempt to lift the head and move the arms and legs in a crawling like motion.",
// 					},
// 				],
// 				rightAnswers: ["1"],
// 				timer: 90,
// 			},
// 		],
// 		participated: ["usr-110", "usr-311"],
// 		isDeterministic: false,
// 	},
// ];

// //
// // NOTIFICATIONS
// const notifications = [
// 	{
// 		id: "ntf-001",
// 		pushed: subDays(new Date(), 1).toISOString(),
// 		authorId: "usr-210",
// 		content: "@usr-110 replied to your comment in @cls-001",
// 	},
// 	{
// 		id: "ntf-002",
// 		pushed: subHours(new Date(), 4).toISOString(),
// 		authorId: "usr-211",
// 		content: "@usr-111 published a new post in @cls-001",
// 	},
// 	{
// 		id: "ntf-003",
// 		pushed: subMinutes(new Date(), 18).toISOString(),
// 		authorId: "usr-310",
// 		content: "@usr-310 published a new quiz in @cls-002",
// 	},
// 	{
// 		id: "ntf-004",
// 		pushed: subHours(new Date(), 20).toISOString(),
// 		authorId: "usr-311",
// 		content: "@usr-311 also replied to @usr-111 's comment in @cls-001",
// 	},
// ];

// module.exports = {
// 	teachers,
// 	students,
// 	consultants,
// 	me,
// 	users,
// 	classrooms,
// 	posts,
// 	events,
// 	quizzes,
// 	notifications,
// };
