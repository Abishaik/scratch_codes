const express = require("express");
const app = express();
const parser = require("body-parser");
const { json } = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())
app.set("view engine", "ejs");



app.get("/", (req, res) => {
  res.render("sample");
});

app.get("/operation1",(req,res) => {
    res.send("operation1")
})

app.post("/operation2",(req,res) =>{
    res.send(`Full name is:${req.body.fname} ${req.body.lname}.`)
})

app.post("/operation3",(req,res) =>{
    var name1 = req.body.name
    var age1 = req.query.age
    
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("namelist");
      var myobj = { name: name1, age : age1 };
      dbo.collection("list").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
  });
});




    // console.log(typeof(age))



    
    res.send("1 data added to db")
})

// app.post("/operation4",(res,req) =>{
//     var order_id = Number(req.body.orderid)
//     var sub_total = Number(req.body.subtotal)
//     var tax_rs = Number(req.body.taxrs)
//     var total_amount =Number(req.body.totalamount)
//     var item_list =JSON.parse(req.body.items)
//     try{
//     const data ={
//         "data":{
//             "order_id": order_id,
//             "items": item_list,
//             "sub_total": sub_total,
//             "total_amount": total_amount,
//             "tax_rs": tax_rs
//         }
//     }
//     // console.log(data)
//     let items=data["data"]["items"]
//     sum=0
// 
//     for(item of items){
//         sum=sum+item["item_price"]
//     }
//     if(sum == data["data"]["sub_total"])
//     {
//         if(sum+data["data"]["tax_rs"]==data["data"]["total_amount"])
//         {
//             console.log("Valid")
//             res.send("valid")
//         }
//         else{
//             console.log("Invalid")
//             // console.log(data["data"]["sub_total"],data["data"]["total_amount"])
//             res.send("Invalid")
// 
//         }
//     }
//     else{
//             console.log("Invalid")
//             res.send("Invalid")
//         }
//     }
//     catch(err){
//         console.log(err)
//         res.send(err)
//     }
// }
// )
// app.post("/operation5",(res,req) =>{
//     try{
//         var data_raw = req.body.data
//         console.log(data_raw)
//         var data = JSON.parse(data_raw)
// 
//         // console.log(data)
//         let items=data["data"]["items"]
//         sum=0
//     
//         for(item of items){
//             sum=sum+item["item_price"]
//         }
//         if(sum == data["data"]["sub_total"])
//         {
//             if(sum+data["data"]["tax_rs"]==data["data"]["total_amount"])
//             {
//                 console.log("Valid")
//                 res.send("valid")
//             }
//             else{
//                 console.log("Invalid")
//                 // console.log(data["data"]["sub_total"],data["data"]["total_amount"])
//                 res.send("Invalid")
//     
//             }
//         }
//         else{
//                 console.log("Invalid")
//                 res.send("Invalid")
//             }
//         }
//         catch(err){
//             console.log(err)
//         }
//     
//     })
app.post("/operation6",(req,res) =>{

    var a = Number(req.body.num1)
    var b = Number(req.body.num2)
    var c = a+b
    res.send(String(c))
})
app.post("/operation7",(req,res) =>{

    var order_id = Number(req.body.order_id)
    var sub_total = Number(req.body.sub_total)
    var tax_rs = Number(req.body.tax_rs)
    var total_amount =Number(req.body.total_amount)
    var item_price1 =Number(req.body.item_price1)
    var item_price2 = Number(req.body.item_price2)
    console.log(sub_total)
    var calculated_item_price = item_price2+item_price1
    var calculated_total_amount = sub_total + tax_rs
    if(calculated_item_price=sub_total){
        if(total_amount=calculated_total_amount){
            res.send("valid")
        }
        else{
            res.send("invalid(total amount is mismatching)")
        }
    }else{
        res.send("invalid(sub total is mismatching)")
    }
    
})
app.listen(3000, () => {
  console.log("server started on port 3000");
});