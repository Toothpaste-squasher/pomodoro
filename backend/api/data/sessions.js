const sessions = [
  {
    id: 1,
    taskIdCompleted: [1, 23, 14],
    startTime: 1704067200000,
    duration: 1500000, // 25 mins
    completed: true,
    subjectId: 1,
    notes: "Felt productive, finished React basics."
  },
  {
    id: 2,
    taskIdCompleted: [1, 23, 14],
    endTime: 1704070800000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Got distracted briefly, but recovered."
  },
  {
    id: 3,
    taskIdCompleted: [2],
    startTime: 1704153600000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Menu component refactor was tricky."
  },
  {
    id: 4,
    taskIdCompleted: [3, 4],
    startTime: 1704240000000,
    duration: 1500000,
    completed: true,
    subjectId: 2,
    notes: "Quick grocery run planning."
  },
  {
    id: 5,
    taskIdCompleted: [],
    startTime: 1704326400000,
    duration: 1500000,
    completed: false, // Abandoned
    subjectId: 3,
    notes: "Too tired to finish reading."
  },
  {
    id: 6,
    taskIdCompleted: [5],
    startTime: 1704412800000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Safari bug finally squashed."
  },
  {
    id: 7,
    taskIdCompleted: [5, 6],
    startTime: 1704416400000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Double session for bug fixes."
  },
  {
    id: 8,
    taskIdCompleted: [6],
    startTime: 1704499200000,
    duration: 1500000,
    completed: true,
    subjectId: 4,
    notes: "Dentist appointment booked."
  },
  {
    id: 9,
    taskIdCompleted: [7, 8],
    startTime: 1704585600000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Unit tests are passing now."
  },
  {
    id: 10,
    taskIdCompleted: [8],
    startTime: 1704672000000,
    duration: 1500000,
    completed: true,
    subjectId: 5,
    notes: "Domain renewed for another year."
  },
  {
    id: 11,
    taskIdCompleted: [10, 11],
    startTime: 1704844800000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Docs updated with new API endpoints."
  },
  {
    id: 12,
    taskIdCompleted: [12],
    startTime: 1705017600000,
    duration: 1500000,
    completed: true,
    subjectId: 3,
    notes: "Learned about mixins and variables."
  },
  {
    id: 13,
    taskIdCompleted: [13],
    startTime: 1705104000000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Database schema seems solid."
  },
  {
    id: 14,
    taskIdCompleted: [],
    startTime: 1705190400000,
    duration: 1500000,
    completed: false,
    subjectId: 5,
    notes: "Got interrupted by a phone call."
  },
  {
    id: 15,
    taskIdCompleted: [16, 17],
    startTime: 1705363200000,
    duration: 1500000,
    completed: true,
    subjectId: 1,
    notes: "Images optimized, page load is faster."
  }
];

export default sessions;
