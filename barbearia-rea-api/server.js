const express = require('express')
const bodyParser = require('body-parser')
const { query } = require('express')
const cors = require('cors');

const app = express()
const port = 3333

app.use(bodyParser.json())

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
   //  app.use(cors());

   //modificado por Tegge
    app.use(cors({origin: [`http://localhost:${port}`, `http://127.0.0.1:${port}`]}));
    next();
})

app.listen(port,()=>{console.log(`Servidor funcionando\nAcesse: http:\\\\localhost:${port}`)})

app.get("/",(request,response) => {
   const result = new ResultJson();
   result.message=`Você acessou a raiz da app.
URIs da API:
   '/add': adicionar um novo contato, via post e query
      method: POST
      exemple: localhost:${port}/getname=Fourteen&phone=14
      recommend: utilize o Insominia, para fazer request via post

   '/getall': retorna todos os contatos já cadastrados 
      method: GET
      exemple: localhost:${port}/getall

   '/get': retorna contados atravez de um nome
      method: GET
      exemple: localhost:${port}/getname=teste
`
   return response.json(result);
})


// ex: localhost:3333/getQueryRequest?name=teste&idade=15)
app.post("/add",(request,response) => {
   const result = new ResultJson();

   let {name,phone} = request.query;
   if(!name || !phone){
      result.message='Dados inconsistentes!';
      return response.json(result);
   }

   console.log(name)
   name = sanetizeName(name);
   console.log(name)
   if(!name.length){
      result.message="'name' é inconsistente!";
      return response.json(result);
   }
   phone = sanetizePhone(phone)
   if(!phone.length){
      result.message="'phone' é inconsistente!";
      return response.json(result);
   }

   result.success=true;
   
   if(allContacts.some(c=>c.name===name)){
      result.message="'name' já foi cadastrado anteriormente!";
      return response.json(result);
   }

   const createdAt = new Date();
   jsonString = JSON.stringify({name,phone,createdAt});
   jsonResult = JSON.parse(jsonString);
   allContacts.push(jsonResult);

   result.data=jsonResult
   result.message="Contato adicionado com sucesso!";
   return response.json(result);
})


app.get("/getall",(request,response) => {
   const result = new ResultJson();
   // const result2 = new ResultJson2();
   result.success=true;
   result.message="Total de contatos encontrados: "+allContacts.length;
   result.data=allContacts;
   return response.json(result);
})


app.get("/get",(request,response) => {
   const result = new ResultJson();
   let {name} = request.query;
if(!name){
   result.message='Dados inconsistentes!';
   return response.json(result);
}

   name = name.replaceAll(/\W/gi,"")
if(!name.length){
   result.message="'name' é inconsistente!";
   return response.json(result);
}

const contactsFound = allContacts.filter(contact=>contact.name===name);
if(!contactsFound){
   result.success=true;
   result.message="Não há contato com esse nome.";
   return response.json(result);
}

   result.success=true;
   result.message="Total de contatos encontrados: "+contactsFound.length;
   result.data=contactsFound;
   return response.json(result);
})

app.get("/remove",(request,response) => {
   const result = new ResultJson();
   let {name} = request.query;
if(!name){
   result.message='Dados inconsistentes!';
   return response.json(result);
}

   name = name.replaceAll(/\W/gi,"")
if(!name.length){
   result.message="'name' é inconsistente!";
   return response.json(result);
}

   let found = false;
   allContacts.forEach((contact,index,original)=>{
      if(contact.name===name){
         found=true;
         result.data=contact
         original.splice(index,1)
         return;
      }
   });
   result.success=true;
   if(found){
      result.message="O contato foi removido com sucesso!";
   }
   else{
      result.message="Não há contato com esse nome.";
   }

   return response.json(result);
})

const allContacts = [
   {"name":"teste","phone":"(00)00000-0000",createAt:"01 fev 2023"}
];


class ResultJson{
   constructor(){
      this.data=null;
      this.success=false;
      this.message=""
   }
}

function sanetizePhone(text){
   let phoneReturn = "";

   if(typeof text !== "string" || text.length<1 || text.length>1003)return phoneReturn
   text = text.replaceAll(/[^\d\-\(\)]/gi,"")

   if(text.length<13 || text.length>14)return phoneReturn
   const found = text.match(/\({1}\d{2}\){1}\d{4,5}\-{1}\d{4}/);
   if(found)
      phoneReturn = found[0];
   return phoneReturn;
}

function sanetizeName(text){
   let nameReturn = "";

   if(typeof text !== "string")return nameReturn;
   text = text.replaceAll(/[^\s||a-záéíóúãõüë]/gi,"").replaceAll(/\s{2,}/gi," ")

   if(text.length<1 || text.length>100)return nameReturn

   nameReturn = text;
   return nameReturn;
}