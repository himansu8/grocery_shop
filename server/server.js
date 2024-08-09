import express from 'express'
import cors from 'cors'
import './dbConnect.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

const app = express();
const port = 8080;


app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000','https://hospital-client-mu.vercel.app','https://apnahospital.himansu.in' ],// Replace with your frontend's origin
    credentials: true, // Allow credentials
    methods: ['OPTIONS','GET', 'POST', 'PUT', 'PATCH', 'DELETE' ],
};
app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)


app.get('/',(req,res)=>{
    res.status(200).send("server started up fine")
})
app.listen(port,()=>{
    console.log(`the server starting at port no ${port}`)
})