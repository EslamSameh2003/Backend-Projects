
const mysql = require('mysql2');
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Secret_key=("My_Secret_Key")

const app = express();
const port = 5000;

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost', //server name
    user: 'root',
    database: 'project_one',
});

connection.connect((err) => {
    if (err) {
        console.log(`error database ${err.message}`);
        return;
    }
    else {
        console.log(`Successfull database `);
    }

});
////////////////////////////////////////////////////////////////////////




// ------------- Get data Users --------------

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    connection.query(`Select * FROM Users WHERE id=${id} ;`, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "error fetching ",
                error: err.message

            });
        }
        else {
            return res.status(200).json({
                message: " fetching Data Successfully",
                data: results,

            });
        }

    });


});

/*

// ------------- SignUp --------------
app.post("/signup", (req, res) => {

    const { first_name, middle_name, last_name, email, password, DoB, gender, confirm_email } = req.body;
    const CheckQuery = `SELECT * FROM Users WHERE email =?`;
    connection.execute(CheckQuery, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: "Already Exist" });
        }

        const InsertQuery = 'INSERT INTO Users(first_name,middle_name,last_name,email,password,DoB,gender,confirm_email)VALUES(?,?,?,?,?,?,?,?)';


        // Insert Suers

        connection.execute(InsertQuery, [first_name, middle_name, last_name, email, password, DoB, gender, confirm_email],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Error Insert User", error: err.message });
                }

                return res.status(201).json({ message: "User Created", date: results });


            }

        )
    });

});
*/


// ------------- SignUp_jwt --------------


app.post("/signup_jwt",(req,res)=>{

    const {first_name, middle_name, last_name, email, password, DoB, gender, confirm_email } = req.body;
    const CheckQuery = `SELECT * FROM Users WHERE email =?`;
    connection.execute(CheckQuery,[email],async(err,results)=>{
         if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: "Already Exist" });
        }


        //hash
        const hashd_pass=await bcrypt.hash(password,10);


        const InsertQuery = 'INSERT INTO Users(first_name,middle_name,last_name,email,password,DoB,gender,confirm_email)VALUES(?,?,?,?,?,?,?,?)';
        
        connection.execute(InsertQuery, [first_name, middle_name, last_name, email, hashd_pass, DoB, gender, confirm_email],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Error Insert User", error: err.message });
                }

                return res.status(201).json({ message: "User Created", date: results.message });


            }

        )


    })

});



/*


// ------------- LOGIIN --------------
app.post("/Login", (req, res) => {

    const { email, password } = req.body;
    const query = `SELECT * FROM Users WHERE email =? AND password=? `
    connection.execute(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Invlaid Email OR Password" });
        }

        return res.status(200).json({ message: "Users logged In", data: results });


    });


});

*/

// ------------- LOGIIN with jwt auth--------------

app.post("/login_jwt",(req,res)=>{

    const{email,password}=req.body;
    const query = `SELECT * FROM Users WHERE email =? `;

    connection.execute(query,[email],async(err,results)=>{

        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Invlaid Email OR Password" });
        }

        const user=results[0];
        const correct_pass=await bcrypt.compare(password,user.password);

        if(!correct_pass)
        {
            return res.status(401).json({ message: "Invlaid Email OR Password" });
        }
        else{
            return res.status(200).json({ message: "Users logged In", data: results });    
        }



    })


})










// ------------- Get Profile --------------


app.get("/Myprofile/:id", (req, res) => {
    const id = req.params.id;
    const query = `Select * FROM Users WHERE id=${id} ;`
    connection.execute(query, [id], (err, results) => {

        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Users Not Found" });
        }
        return res.status(200).json({ message: "Users Fetched", data: results[0] });


    })


})

// ------------- Search Users --------------

app.get("/search/", (req, res) => {

    const { name } = req.query;
    const SearchQuery = `SELECT * FROM users WHERE first_name like ?`;

    connection.execute(SearchQuery, [`%${name}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error Search", error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Users Not Found" });

        }

        return res.status(200).json({ message: "Users Fetched", data: results });


    })



})






// ------------- Update Data Users --------------

app.put("/update", (req, res) => {
    //const id=req.params.id;
    const { id, first_name, middle_name, last_name, email, password, DoB, gender } = req.body;
    const CheckQuery = `SELECT * FROM Users WHERE id=? `;
    connection.execute(CheckQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const UpdateQuery = `UPDATE Users  SET 
        first_name=?,middle_name=?,last_name=?,email=?,password=?,DoB=?,gender=?,updated_at = CURRENT_TIMESTAMP
        WHERE id=?;`


        // Update Suers

        connection.execute(UpdateQuery, [first_name, middle_name, last_name, email, password, DoB, gender, id],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Error Update ", error: err.message });
                }

                return res.status(200).json({ message: "User Updated", date: results });


            }

        )
    });

});


// ------------- Delet Data Users --------------

app.delete("/delete", (req, res) => {
    const { id } = req.body;
    const Delete_Query = `Delete from Users Where id=?`;

    connection.execute(Delete_Query, [id], (err, results) => {

        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Delete Successfully", results: results.message })


    })

});

///////////////////////////  BLOG  //////////////////////////////

// ------------- Create Blog --------------

app.post("/blog/create", (req, res) => {

    const { title, content, user_id } = req.body;
    const CheckQuery = `SELECT * FROM users WHERE id =?`;
    connection.execute(CheckQuery, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Users not found" });
        }

        // Insert Blog

        const InsertQuery = 'INSERT INTO Blog(title, content, user_id)VALUES(?,?,?)';
        connection.execute(InsertQuery, [title, content, user_id],
            (err, results) => {
                if (err) {
                    return res.status(500).json({ message: "Error Create Blog", error: err.message });
                }

                return res.status(201).json({ message: "Blog Created", date: results });

            }

        )
    });

});

// ------------- update Blog --------------


app.put("/blog/update/:id", (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;
    const CheckQuery = `SELECT * FROM blog WHERE id =?`;

    connection.execute(CheckQuery, [id], (err, results) => {
            //check
        if (err) {
            return res.status(500).json({ message: "Error Fetching blog", error: err.message })
        }
        if (results.length === 0) { 

            return res.status(404).json({ message: "Blog not found" });

        }
        //update
        const UpdateQuery=`
        UPDATE blog
        SET title=?,content=?,updated_at = CURRENT_TIMESTAMP
        WHERE id=? 
        `;

        connection.execute(UpdateQuery,[title,content,id ],(err,results)=>{

            if(err)
            {
                return res.status(505).json({ message: "Error Updating " });
            }

            return res.status(200).json({ message: "Blog updated successfully"});

        })

    })

});


// ------------- Delete Blog --------------


app.delete("/blog/delete/:id", (req, res) => {
    const { id } = req.params;

    const deleteQuery = `DELETE FROM Blog WHERE id = ? `;
    connection.execute(deleteQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error Data", error: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Delete Successfully", results: results.message })


    });

});











app.listen(port, '127.0.0.1', () => {
    console.log(`running server on port http://127.0.0.1:${port}`);
})





