import { config as dotenvConfig } from 'dotenv';
import express from "express";
import axios from "axios";
import cors from "cors";

dotenvConfig();

const app= express();

app.use(cors());
app.use(express.urlencoded({extended:true}));

const API_KEY= process.env.API_KEY;

function fetchNews(Url, res)
{
    axios.get(Url)
    .then(response=>
        {
            if(response.data.totalResults > 0)
                {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Successfully fetched the data",
                        data: response.data,
                    });
                }
                else
                {
                    res.json(
                        {
                        status: 200,
                        success: true,
                        message: "No more results to Show"
                        }
                    );
                }
        }
    )
    .catch(err=>
        {
            res.json({
                status: 500,
                success: false,
                message: "Failed to fetch data from the API",
                err: err.message
            });
        }
    );
}

app.get("/all-news", (req, res)=>
{
    let pageSize= parseInt(req.query.pageSize)||40;
    let page=parseInt(req.query.page)||1;
    let Url=`https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(Url, res);
})


app.options("/top-headlines", cors());

app.get("/top-headlines", (req, res)=>
{
    let pageSize= parseInt(req.query.pageSize)||80;
    let page=parseInt(req.query.page)||1;
    let category= req.query.category||"business";
    let Url= `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(Url, res);
})

app.options("/country/:iso", cors());

app.get("/country/:iso", (req, res)=>
{
    let pageSize= parseInt(req.query.pageSize)||80;
    let page=parseInt(req.query.page)||1;
    const country=req.params.iso;
    let Url=`https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`; 
    fetchNews(Url, res);  
})



const PORT= process.env.PORT||3000;

app.listen(PORT, ()=>
{
    console.log(`server is running at port ${PORT}`);
});