const express = require('express')
const cors = require("cors")
const mysql = require('mysql2')
require("dotenv").config()
const {promisify} = require("util")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
console.log(process.env.PORT)

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

// app.get('/api/health', async(req, res) => {
//     // console.log(req.query);
//     if (req.query.agerange && req.query.location && !Array.isArray(req.query.agerange) && !Array.isArray(req.query.location)) {
//         var query =`SELECT DISTINCT disease FROM record
//         WHERE agerange="${req.query.agerange}" AND location="${req.query.location}"`;
//         await con.query(query ,async (err,result)=>{
//             if(err){
//                 console.log(err.message);
//                 return res.status(400).json({success: false,err: "Error in connection with mysql"})
//             }
//             else{
//                 var all = []
//                 for(let i=0;i<result.length;i++){
//                     var query2 =`SELECT * FROM record
//                     WHERE disease="${Object.values(result[i])[0]}"`;
//                     await con.query(query2 ,async (err,resu)=>{
//                         if(err){
//                             console.log(err.message);
//                         }
//                         else{
//                             let temp;
//                             key = Object.values(result[i])[0]
//                             temp = {[key]: resu}
//                             all.push(temp)
//                             console.log(all)
//                         }
//                     })
//                 }
//                 if(all.length>0){
//                     console.log(all)
//                     return res.status(200).json({success: true , result: all})
//                 }    
//             }
//         })
//     }
//     else {
//         return res.status(400).json({ err: "error in queries of api" })
//     }
// });

const query = promisify(con.query).bind(con);

app.get('/api/health',async(req, res) => {
    if (req.query.agerange && req.query.location && !Array.isArray(req.query.agerange) && !Array.isArray(req.query.location)) {
        try{
            var result = await query(`SELECT DISTINCT disease FROM record WHERE agerange="${req.query.agerange}" AND location="${req.query.location.toLowerCase()}"`);
            var all = []
            for(let i=0;i<result.length;i++){
                try{
                    const resu =await query(`SELECT * FROM record WHERE disease="${Object.values(result[i])[0].toLowerCase()}" AND agerange="${req.query.agerange}" AND location="${req.query.location.toLowerCase()}" ORDER BY year ASC`);
                    let temp;
                    key = Object.values(result[i])[0]
                    temp = {[key]: resu}
                    all.push(temp)
                }catch(err){
                    console.log(err.message);
                    res.json({success: false})
                }
            }
            res.status(200).json({success: true , result: all})
        }catch(err){
            console.log(err.message);
            res.json({success: false})
        }
    }
});

app.post('/api/postdata', (req, res) => {
    var location = req.body.location.toLowercase();
    var year = req.body.year;
    var agerange = req.body.agerange;
    var totalpopulation = req.body.totalpopulation;
    var totalsuffering = req.body.totalsuffering;
    var newdiagnosed = req.body.newdiagnosed;
    var cured = req.body.cured;
    var disease = req.body.disease.toLowerCase();

    var query = `SELECT location , year , agerange , disease
    FROM record`;
    con.query(query, (err, result) => {
        var breakneed = false;
        for (let i = 0; i < result.length; i++) {
            if (result[i].location === location && result[i].year == year && result[i].agerange === agerange && result[i].disease === disease) {
                breakneed = true;
                break;
            }
        }
        if (breakneed) {
            return res.status(400).json({ err: "sorry this field already exists kindly use put api" });
        }
        else {
            query = `INSERT INTO record (location , year , agerange , totalpopulation , totalsuffering , newdiagnosed , cured , disease)
            VALUES ("${location}" , "${year}" , "${agerange}" , "${totalpopulation}" , "${totalsuffering}" , "${newdiagnosed}" , "${cured}" , "${disease}")`;
    
            con.query(query, (err, result) => {
                if (err) {
                    console.log(err.message);
                }
                else {
                    return res.status(200).json({ res: result })
                }
            })
        }
    })
})

app.get('/api/options' , async(req,res)=>{
    try{
        var result = await query(`SELECT DISTINCT location FROM record`);
        var alllocations = {location: []}
        for(let i=0;i<result.length;i++){
            alllocations.location.push(Object.values(result[i])[0])
        }
        var result = await query(`SELECT DISTINCT agerange FROM record`);
        var allagegroups = {groups: []}
        console.log(result)
        for(let i=0;i<result.length;i++){
            allagegroups.groups.push(Object.values(result[i])[0])
        }
        res.status(200).json({locationoptions: alllocations.location ,ageoptions: allagegroups.groups})
    }catch(err){
        console.log(err.message)
        res.json({success: false , err: "Error"})
    }
})

// app.put('/api/postdata', async (req, res) => {
//     var location = req.body.location;
//     var year = req.body.year;
//     var agerange = req.body.agerange;
//     var totalpopulation = req.body.totalpopulation;
//     var totalsuffering = req.body.totalsuffering;
//     var newdiagnosed = req.body.newdiagnosed;
//     var cured = req.body.cured;
    
//     // var query = `UPDATE record 
//     // // SET totalpopulation=${if(!totalpopulation){totalpopulation}} `;
//     con.query(query , (err,result)=>{
//         var toAppendid = null;
//         if(err){
//             console.log(err.message);
//             res.status(400).json({err: "error in connection to mysql"})
//         }
//         else{
//             for(let i=0;i<result.length;i++){
//                 if(result[i].location === location && result[i].year == year && result[i].agerange === agerange){
//                     toAppendid = result[i].id;
//                     break;
//                 } 
//             }
//         }
//     })
// })

app.use(async (req, res) => {
    return res.status(404).json({ e: "error" })
})

app.listen(process.env.PORT, () => {
    console.log("server is running at http://localhost:5000")
})
