// func.js

// 🎤 Mood to singer map (English + Hindi mix)
const moodToSingers = {
  'EDM / Party': ['David Guetta', 'Calvin Harris', 'Martin Garrix', 'Arijit Singh'],
  'Pop / Feel Good': ['Taylor Swift', 'Dua Lipa', 'Bruno Mars', 'Neha Kakkar'],
  'Indie / Soft Rock': ['Ed Sheeran', 'The Lumineers', 'Vance Joy', 'Armaan Malik'],
  'Indie / Chill': ['Ben Howard', 'Angus & Julia Stone', 'Rhye', 'Shreya Ghosal'],
  'Acoustic / Calm': ['John Mayer', 'Jack Johnson', 'Norah Jones', 'Sonu Nigam'],
  'Chill / Lo-Fi Beats': ['Nujabes', 'Jinsang', 'Tomppabeats', 'Amit Trivedi'],
  'Chill / Acoustic': ['Iron & Wine', 'Sufjan Stevens', 'Damien Rice', 'Honey Singh'],
  'Soft Jazz / Slow Pop': ['Norah Jones', 'Diana Krall', 'Michael Bublé', 'Arijit Singh'],
  'Piano / Calm Night': ['Yiruma', 'Ludovico Einaudi', 'Philip Glass', 'Pritam'],
  'Pop / Chill Hits': ['Shawn Mendes', 'Charlie Puth', 'Selena Gomez', 'Neha Kakkar'],
  'Lofi / Rainy Vibes': ['Joji', 'Clairo', 'Joakim Karud', 'Armaan Malik'],
  'Slow Jazz / Piano': ['Bill Evans', 'Chet Baker', 'Miles Davis', 'Shreya Ghosal'],
  'Lo-Fi / Rain Beats': ['Idealism', 'Kudasai', 'Saib', 'Amit Trivedi'],
  'Rainy Jazz / Acoustic': ['Norah Jones', 'Ella Fitzgerald', 'Chet Baker', 'Sonu Nigam'],
  'Soft Jazz / Winter Chill': ['Vince Guaraldi', 'Diana Krall', 'Pat Metheny', 'Arijit Singh'],
  'Piano / Cozy Night': ['Yann Tiersen', 'Erik Satie', 'Ludovico Einaudi', 'Pritam'],
  'Calm / Soft Music': ['Adele', 'Coldplay', 'Ed Sheeran', 'Neha Kakkar'],
  // Add more if needed
}

// 🌟 Function to get 4 singers for a mood
export const getSingersByMood = (mood) => {
  return moodToSingers[mood] || ['Unknown Artist 1', 'Unknown Artist 2', 'Unknown Artist 3', 'Unknown Artist 4']
}
