// // const http = require('http');



// // const server = http.createServer((req,res) => {

// //     res.writeHead(200,{"Content-Type":"text/html"});

// //     res.end("<h1>Hello World</h1>");

// //     });

// // server.listen(3000,() => {

// //     console.log("Server running at http://127.0.0.1:3000/");

// //         });

// // const calculater =require("./calculater")

// //     console.log(calculater.add(10,20))

// //     console.log(calculater.sub(20,10))

// //     console.log(calculater.mul(10,20))

// //     console.log(calculater.div(20,10))







// const http = require('http');

// const calculater = require('./calculater'); 



// const server = http.createServer((req, res) => {

//     res.writeHead(200, { "Content-Type": "text/html" });



    

//     const result = `

//         <h1>Calculator Results</h1>

//         <p>add: ${calculater.add(10, 20)}</p>

//         <p>sub: ${calculater.sub(20, 10)}</p>

//         <p>mul: ${calculater.mul(10, 20)}</p>

//         <p>div: ${calculater.div(20, 10)}</p>

//     `;



//     res.end(result); 

// });



// // server.listen(3000, () => {

// //     console.log("Server running at http://127.0.0.1:3000/");

// // });



// const fs = require('fs')
// fs.readFile('sample.txt',"utf8",(err,data)=>{
//     if(err){
//         console.error(err)
//         return
//     }
//     console.log (data)
// })




// fs.readFile('sample.json','utf8',(err,data)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data);
//     const jsonData=JSON.parse(data);

    

// })
// fs.writeFile('sample.json',JSON.stringify({"name":"sabari","age":20}),(err)=>{
// if(err){
//     console.log(err)
// }
// })


// fs.readFile('sample.json','utf8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     const recieveddata=JSON.parse(data);
//     const newdata=recieveddata.filter((a)=>a.id!=3);
//     fs.writeFile('sample.json',JSON.stringify(newdata),(err)=>{
//         if(err){
//             console.log(err);
//         }
//     })
// })


const fs = require('fs').promises;

const readData = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log("Data read from file:", JSON.parse(data));
    } catch (err) {
        console.log("Error reading file:", err);
    }
};

const createData = async (filePath, newItem) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        jsonData.push(newItem);
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
    } catch (err) {
        console.log("Error adding new item:", err);
    }
};

const updateData = async (filePath, id, updatedItem) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const index = jsonData.findIndex((item) => item.id === id);
        if (index !== -1) {
            jsonData[index] = { ...jsonData[index], ...updatedItem };
            await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
            console.log("Item updated successfully.");
        } else {
            console.log("Item not found with ID:", id);
        }
    } catch (err) {
        console.log("Error updating item:", err);
    }
};

const deleteData = async (filePath, id) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const filteredData = jsonData.filter((item) => item.id !== id);
        await fs.writeFile(filePath, JSON.stringify(filteredData, null, 2));
        console.log("Item deleted successfully.");
    } catch (err) {
        console.log("Error deleting item:", err);
    }
};

const filePath = 'sample.json';

(async () => {
    await readData(filePath);
    await createData(filePath, { name: "Frank", age: 27, city: "Boston", amount: 4700, id: 7 });
    await updateData(filePath, 2, { city: "San Diego", amount: 5000 });
    await deleteData(filePath, 5);
})();
