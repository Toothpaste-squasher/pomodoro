const settings = [
  {
    userId: 1,
    theme: 'dark',
    defaultDur: 25 * 60 * 1000, // 25 minutes
    shortBreakDur: 5 * 60 * 1000,
    longBreakDur: 15 * 60 * 1000,
    autoStart: false,
    notifications: true
  },
  {
    userId: 2,
    theme: 'light',
    defaultDur: 30 * 60 * 1000,
    shortBreakDur: 5 * 60 * 1000,
    longBreakDur: 20 * 60 * 1000,
    autoStart: true,
    notifications: false
  },
  {
    userId: 3,
    theme: 'system',
    defaultDur: 45 * 60 * 1000,
    shortBreakDur: 10 * 60 * 1000,
    longBreakDur: 25 * 60 * 1000,
    autoStart: false,
    notifications: true
  },
  {
    userId: 4,
    theme: 'dark',
    defaultDur: 20 * 60 * 1000,
    shortBreakDur: 3 * 60 * 1000,
    longBreakDur: 10 * 60 * 1000,
    autoStart: true,
    notifications: true
  },
  {
    userId: 5,
    theme: 'dark',
    defaultDur: 50 * 60 * 1000, // 50/10 rule
    shortBreakDur: 10 * 60 * 1000,
    longBreakDur: 30 * 60 * 1000,
    autoStart: false,
    notifications: false
  },
  {
    userId: 6,
    theme: 'light',
    defaultDur: 25 * 60 * 1000,
    shortBreakDur: 5 * 60 * 1000,
    longBreakDur: 15 * 60 * 1000,
    autoStart: true,
    notifications: true
  },
  {
    userId: 7,
    theme: 'dark',
    defaultDur: 60 * 60 * 1000, // Intense sessions
    shortBreakDur: 15 * 60 * 1000,
    longBreakDur: 30 * 60 * 1000,
    autoStart: false,
    notifications: true
  },
  {
    userId: 8,
    theme: 'system',
    defaultDur: 25 * 60 * 1000,
    shortBreakDur: 5 * 60 * 1000,
    longBreakDur: 20 * 60 * 1000,
    autoStart: true,
    notifications: false
  },
  {
    userId: 9,
    theme: 'dark',
    defaultDur: 90 * 60 * 1000, // Ultradian rhythm
    shortBreakDur: 20 * 60 * 1000,
    longBreakDur: 40 * 60 * 1000,
    autoStart: false,
    notifications: true
  },
  {
    userId: 10,
    theme: 'light',
    defaultDur: 15 * 60 * 1000, // Short bursts
    shortBreakDur: 3 * 60 * 1000,
    longBreakDur: 10 * 60 * 1000,
    autoStart: true,
    notifications: true
  }
];

export default settings;