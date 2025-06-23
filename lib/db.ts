
const mongoose=require('mongoose')
let cachedConnection:any= null;

export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  try {
    if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const cnx = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    cachedConnection = cnx.connection;
    console.log("MongoDB connected Successfully!!");
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function getMongoose(){
  return mongoose;
};