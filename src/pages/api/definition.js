// pages/api/definition.js
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { word } = req.query;

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = response.data[0];
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching word definitions' });
  }
};
