let express = require('express');
let employees =  require('./models/employees');
let bodyParser = require('body-parser');
let session = require('express-session')
let flash = require('./middelwares/flash');
let app = express();

app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/contenu'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'azzzza',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
 app.use(flash)


app.get('/',(req,res)=>{
         employees.readAll((e)=>{
         res.render('index',{es:e})
     })
})
app.get('/index/supprimer/:id',(req,res)=>{
    if(req.params.id != ''){
       employees.delete(req.params.id,(remove)=>{
           console.log(remove)
           res.flash(true,'Vous avez supprimer un employee')
           res.redirect('/')
       })
    }
   
})
app.get('/ajouter',(req,res)=>{
    res.render('ajouter')
   
})

app.get('/editer/:id',(req,res)=>{
    console.log(req.params.id);
    if(req.params.id != ''){
        employees.read(req.params.id,(employee)=>{
            res.render('editer',{employee:employee})
        })
        //res.redirect('/')
    }
    else{
       res.flash(false,'Idetifient inconu')
    }
})
app.post('/editer',(req,res)=>{
    let infoEmployee = []; 
    console.log(req.body)
    for(const element in req.body){
        if(req.body[element] != ''){
            infoEmployee.push(req.body[element]);
           
        }
        else {
            res.flash(false,'Merci de remplire tous les inputs')
        }
    }
    if(infoEmployee.length != 6){
        res.flash(false,'Merci de remplire tous les inputs')
        res.redirect('/')
    }
    else{
        infoEmployee[4] = Number(infoEmployee[4]);
        infoEmployee[5] = Number(infoEmployee[5])
        console.log(infoEmployee);
        employees.update(infoEmployee,(employee)=>{
            console.log(employee)
            res.flash(true,'Vous avez editer un employee')
            res.redirect('/')
        })
    }
   
  
})
app.post('/ajouter',(req,res)=>{
    console.log('ok post ajouter');
    console.log(req.body)
    let infoEmployee = []; 
    for(const element in req.body){
        if(req.body[element] != ''){
            infoEmployee.push(req.body[element]);
           
        }
        else {
            res.flash(false,'Merci de remplire tous les inputs')
        }
    }
    if(infoEmployee.length < 6){
        res.flash(false,'Merci de remplire tous les inputs')
        res.redirect('/');
    }
    else{
        infoEmployee[4] = Number(infoEmployee[4]);
        employees.create(infoEmployee,(employee)=>{
        console.log(employee)
        res.flash(true,'Vous avez ajouteé un employee')
        res.redirect('/');
    })
    }
    
 

})
app.use((req,res,next)=>{
    res.redirect('/');
})
  
app.listen(3000)