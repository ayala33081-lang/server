import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const connectUrl='mongodb+srv://ayala33081_db_user:pRkHVcGlZLX4Cgzr@cluster0.jcas1c5.mongodb.net/?appName=Cluster0';
        await connect(connectUrl);
        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};