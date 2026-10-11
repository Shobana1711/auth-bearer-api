require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

(async () => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing. Copy .env.example to .env and set it.');
    process.exit(1);
  }
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
