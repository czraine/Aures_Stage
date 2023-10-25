const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


app.use(cors());
const PORT = process.env.PORT || 5000;
const SECRET_KEY = '201'; // Replace with a secure secret key

app.use(express.json());


app.post('/login', async (req, res) => {
    try {
        console.log(req.cookies, req.get('origin'));
        const { email, password } = req.body;
        const users = await pool.query('SELECT * FROM "AuUser" WHERE mail = $1 and password = $2 ', [email, password]);
        if (users.rows.length === 0) return res.status(401).json({ error: "Email is incorrect" });
        const user = users.rows[0];
        const token = jwt.sign({ id: users.rows[0].id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});



app.delete('/refresh_token', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'Refresh token deleted.' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
// ROUTES //
//CREATE A Cart // 
app.post("/Cart", async (req, res) => {
    try {
        console.log(req.body);
        const { cartid, quantity, productid } = req.body;
        const newtodo = await pool.query("INSERT INTO shopcart( cartid , quantity , productid) VALUES ($1,$2) RETURNING *  ", [cartid, quantity, productid]);


        res.json(newtodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET ALL Cart 
app.get("/Cart", async (req, res) => {
    try {
        console.log(req.body);
        const alltodo = await pool.query("SELECT * FROM shopcart ; ");


        res.json(alltodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
















//CREATE A TODO // 
app.post("/Settings", async (req, res) => {
    try {
        console.log(req.body);

        const { parametre } = req.body;
        console.log(parametre);
        const newtodo = await pool.query("INSERT INTO parametrage(parametre) VALUES ($1) RETURNING *  ", [parametre]);


        res.json(newtodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});

// GET A TODO // 
app.get("/Settings", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const atodo = await pool.query(`SELECT * FROM parametrage `);


        res.json(atodo.rows[0]);
    } catch (e) {
        console.log(e.message);

    }
});


// UPDATE A TODO //
app.put("/Settings", async (req, res) => {
    try {
        console.log(req.params);
        const { parametre } = req.body;
        console.log(parametre);
        const updatetodo = await pool.query("UPDATE parametrage SET parametre= $1 Where id = 1  ", [parametre]);


        res.json("parameter was modified with success");
    } catch (e) {
        console.log(e.message);

    }
});
// DELETE A TODO // 
app.delete("/Settings/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const updatetodo = await pool.query("DELETE FROM parametrage WHERE  id = $1  ", [id]);


        res.json("parameter was deleted in the end ");
    } catch (e) {
        console.log(e.message);

    }
});
























//CREATE A TODO // 
app.post("/todos", async (req, res) => {
    try {
        console.log(req.body);

        const { title, price, description, categoryAsString, image } = req.body;
        console.log(categoryAsString);
        const newtodo = await pool.query("INSERT INTO product(title , price, description,category,image) VALUES ($1,$2,$3,$4,$5) RETURNING *  ", [title, price, description, categoryAsString, image]);


        res.json(newtodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});

// GET ALL TODO 
app.get("/todos", async (req, res) => {
    try {
        console.log(req.body);
        const alltodo = await pool.query("SELECT p.*, c.name FROM product p INNER JOIN category c ON CAST(p.category AS INT) = c.id; ");


        res.json(alltodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET A TODO // 
app.get("/Products/:Category", async (req, res) => {
    try {
        console.log(req.params);
        const { Category } = req.params;
        const atodo = await pool.query("SELECT p.* FROM product p Where CAST(p.category AS INT) = $1", [Category]);


        res.json(atodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET A TODO // 
app.get("/todos/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const atodo = await pool.query("SELECT * FROM product WHERE id = $1 ", [id]);


        res.json(atodo.rows[0]);
    } catch (e) {
        console.log(e.message);

    }
});

// UPDATE A TODO //
app.put("/todos/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const { title, price, description, category, image } = req.body;
        const updatetodo = await pool.query("UPDATE product SET title = $1 , price = $2 , description = $3 , category = $4 , image = $5 Where id = $6  ", [title, price, description, category, image, id]);


        res.json("product was modified with success");
    } catch (e) {
        console.log(e.message);

    }
});
// DELETE A TODO // 
app.delete("/todos/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const updatetodo = await pool.query("DELETE FROM product WHERE  id = $1  ", [id]);


        res.json("product was deleted in the end ");
    } catch (e) {
        console.log(e.message);

    }
});










// insert a User  // 
app.post("/User", async (req, res) => {
    try {
        console.log(req.body);
        const { Adduname,
            Addpaswd,
            Addfname,
            Addpnmbr,
            AddMail,
            Addadr,
            role } = req.body;
        const newtodo = await pool.query(`INSERT INTO "AuUser"(username, password, fullName, phoneNumber, mail, address, role) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *  `, [Adduname,
            Addpaswd,
            Addfname,
            Addpnmbr,
            AddMail,
            Addadr,
            role]);


        res.json(newtodo.rows[0]);
    } catch (e) {
        console.log(" error ");
        console.log(e.message);

    }
});
// get all category //
app.get("/User", async (req, res) => {
    try {
        console.log(req.body);
        const alltodo = await pool.query('SELECT * FROM "AuUser" ');


        res.json(alltodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET A User // 

app.get("/User/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const atodo = await pool.query('SELECT * FROM "AuUser" WHERE id= $1 ', [id]);


        res.json(atodo.rows[0]);
    } catch (e) {
        console.log(e.message);

    }
});


app.post("/UserSea", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Perform login logic here
        const user = await pool.query(
            'SELECT * FROM "AuUser" WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (user.rows.length === 0) {
            // User not found or invalid credentials
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // User found, you can access the user data from user.rows[0]
        res.json(user.rows[0]);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
// UPDATE A category //
app.put("/User/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const { username, password, fullName, phoneNumber, mail, address } = req.body;
        const updatetodo = await pool.query('UPDATE "AuUser" SET username = $1 , password = $2, fullName = $3, phoneNumber = $4, mail =$5 , address=$6   WHERE id = $7 ', [username, password, fullName, phoneNumber, mail, address, id]);


        res.json("User was modified with success");
    } catch (e) {
        console.log(e.message);

    }
});
// DELETE A User // 
app.delete("/User/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const updatetodo = await pool.query('DELETE FROM "AuUser" WHERE  id = $1  ', [id]);


        res.json("User was deleted in the end ");
    } catch (e) {
        console.log(e.message);

    }
});






// insert a User  // 
app.post("/Command", async (req, res) => {
    try {
        console.log(req.body);
        const { clientid, dateOrder, montantTotal, adress, state } = req.body;
        const newtodo = await pool.query("INSERT INTO Commande(clientid, dateorder, montantotal, adress, state) VALUES ($1,$2,$3,$4,$5) RETURNING *  ", [clientid, dateOrder, montantTotal, adress, state]);


        res.json(newtodo.rows[0]);
    } catch (e) {
        console.error("Error inserting command:", e.message);
        res.status(500).json({ error: "An error occurred while inserting the command." });
    }
});
// get all category //
app.get("/Command", async (req, res) => {
    try {
        console.log(req.body);
        const alltodo = await pool.query('SELECT * FROM Commande ');


        res.json(alltodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET A User // 

app.get("/MCommand/:clientid", async (req, res) => {
    try {

        const { clientid } = req.params;
        const atodo = await pool.query('SELECT * FROM Commande WHERE clientid= $1  ', [clientid]);
        console.log(atodo.rows);

        res.json(atodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET A User // 

app.get("/Command/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const atodo = await pool.query('SELECT * FROM Commande WHERE id= $1 ', [id]);


        res.json(atodo.rows[0]);
    } catch (e) {
        console.log(e.message);

    }
});
// UPDATE A category //
app.put("/Command/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const { clientid, dateOrder, montantTotal, adress, state } = req.body;
        const updatetodo = await pool.query(`UPDATE Commande SET clientid = '${clientid}' , dateorder = '${dateOrder}' ,montantotal = '${montantTotal}' , adress = '${adress}' , state = '${state}'  Where id = '${id}'  `);


        res.json("Command was modified with success");
    } catch (e) {
        console.log(e.message);

    }
});
app.put("/Command/ChangeState/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        console.log(id);
        const { type } = req.body;
        console.log(type);
        const updatetodo = await pool.query(`UPDATE Commande SET  state = '${type}'  Where id = '${id}'  `);


        res.json("Command was modified with success");
    } catch (e) {
        console.log(e.message);

    }
});

// DELETE A User // 
app.delete("/Command/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const updatetodo = await pool.query('DELETE FROM Commande WHERE  id = $1  ', [id]);


        res.json("Command was deleted in the end ");
    } catch (e) {
        console.log(e.message);

    }
});






// insert a User  // 
app.post("/commandetails", async (req, res) => {
    try {
        console.log(req.body);
        const { clientid, dateOrder, montantTotal, adress, state } = req.body;
        const newtodo = await pool.query("INSERT INTO commanddetails(clientid, dateorder, montantotal, adress, state) VALUES ($1,$2,$3,$4,$5) RETURNING *  ", [clientid, dateOrder, montantTotal, adress, state]);


        res.json(newtodo.rows[0]);
    } catch (e) {
        console.log(" error ");
        console.log(e.message);

    }
});
// get all category //
app.get("/commandetails", async (req, res) => {
    try {
        console.log(req.body);
        const alltodo = await pool.query('SELECT * FROM commanddetails ');


        res.json(alltodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET A User // 

app.get("/commandetails/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const atodo = await pool.query('SELECT * FROM commanddetails WHERE id= $1 ', [id]);


        res.json(atodo.rows[0]);
    } catch (e) {
        console.log(e.message);

    }
});
app.get("/thecommandetails/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const atodo = await pool.query('SELECT * FROM commanddetails WHERE idcommande= $1 ', [id]);


        res.json(atodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// UPDATE A category //
app.put("/commandetails/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const { clientid, dateOrder, montantTotal, adress, state } = req.body;
        const updatetodo = await pool.query(`UPDATE commanddetails SET clientid = '${clientid}' , dateorder = '${dateOrder}' ,montantotal = '${montantTotal}' , adress = '${adress}' , state = '${state}'  Where id = '${id}'  `);


        res.json("Command was modified with success");
    } catch (e) {
        console.log(e.message);

    }
});
// DELETE A User // 
app.delete("/commandetails/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const updatetodo = await pool.query('DELETE FROM commanddetails WHERE  id = $1  ', [id]);


        res.json("Command was deleted in the end ");
    } catch (e) {
        console.log(e.message);

    }
});







// insert a category  // 
app.post("/Category", async (req, res) => {
    try {

        console.log(req.body);
        const { title, image, userid } = req.body;
        const newtodo = await pool.query("INSERT INTO category(name , image ,userid) VALUES ($1 , $2 , $3)  ", [title, image, userid]);


        res.json(newtodo.rows[0]);
    } catch (e) {
        console.log(" error ");
        console.log(e.message);

    }
});
// get all category //
app.get("/Category", async (req, res) => {
    try {
        console.log(req.body);
        const alltodo = await pool.query("SELECT * FROM category ");


        res.json(alltodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// GET A category // 

app.get("/Category/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const atodo = await pool.query("SELECT * FROM category WHERE id = $1 ", [id]);


        res.json(atodo.rows[0]);
    } catch (e) {
        console.log(e.message);

    }
});
app.get("/Category/userid/:userid", async (req, res) => {
    try {
        console.log(req.params);
        const { userid } = req.params;
        const atodo = await pool.query("SELECT * FROM category WHERE userid = $1 ", [userid]);


        res.json(atodo.rows);
    } catch (e) {
        console.log(e.message);

    }
});
// UPDATE A category //
app.put("/Category/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const { title, image, userid } = req.body;
        //  const updatetodo = await pool.query("UPDATE category SET title = $1 , image = $2 ,userid = $3  Where id = $4  ", [title, image, user_id, id]);
        const updatetodo = await pool.query(`UPDATE category SET name = '${title}' , image = '${image}' ,userid = '${userid}'  Where id = '${id}'  `);


        res.json("product was modified with success");
    } catch (e) {
        console.log(e.message);

    }
});
// DELETE A Category // 
app.delete("/Category/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const updatetodo = await pool.query("DELETE FROM category WHERE  id = $1  ", [id]);


        res.json("category was deleted in the end ");
    } catch (e) {
        console.log(e.message);

    }
});
app.listen(5000, () => {
    console.log("starting server on port 5000  ")

})