// Llamada de paquetes
const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config()


const carrito_compras = require("./routes/carrito_compras")
const productos = require("./routes/productos")
const producto_unidad = require("./routes/producto_unidads");
const ventas = require("./routes/ventas");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
// Configuraciones
const app = express();
const puerto = 5530;
//middleware

app.use(express.json());
const swaggerConf = {
  //va a ir la configuración principal de swagger
    definition:{
        openapi : "3.0.0",
        info : {
            title : "Documentación de API TECHGROUP",
            version : "1.0.0"
        },
        servers:[
          {
            url: "http://localhost:5530"
          }
        ]

    //vamos a especificar de donde se va  a sacar la api res
    },
    apis: [ ` ${path.join(__dirname, "./routes/*.js")} ` ]
}





app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerConf)))
                    //swaggeruI: la variable que llamamos primero y ahora la inicializamos
                    // . serv : arranca la interfaz grafica de swagger
                    // swaggerUI.setup : le damos la configuración
                    //setup: dentro de este colocamos la configuración que mandamos antes .-
                    //swaggerJSDoc : es el motor de swagger y dentro le ponemos la configuración
                    //swaggerConf configuración de swagger
        //resumen : arranca swagger ui y usa estas configuraciones. 




app.use("/api", carrito_compras);
app.use("/api", productos);
app.use("/api", ventas);
app.use("/api", producto_unidad);


// Ejecución
mongoose.connect(process.env.mongodb)

    .then(() => {console.log("conexion realizada con exito")})
     .catch((error) => {console.log(error)})


app.listen(puerto, () => {
  console.log("Servidor escuchando en el puerto " + puerto);
});
