import sessions from '../data/sessions.js';

export const createStudySesh = (req, res) => {
  const newSesh = req.body;
  sessions.push(newSesh);
  res.status(201).json(newSesh);
}

export const getStudySesh = (req, res) => {
  res.status(200).json(sessions);
}


