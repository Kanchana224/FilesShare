import express from 'express';
import router from './routes/router.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use('/', router);

const DBconnection = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error('MongoDB connection URI is missing in the environment variables.');
        }

        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

DBconnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
        console.log("listening for requests");
    });
});
