const express = require ("express")
const config = require ("config")
const mongoose = require("mongoose")
const app = express();
const PORT = config.get('port') || 5000;
app.use(fn='/api/auth', require('./routes/auth.route'))

async function start(){
try{
await mongoose.connect(config.get('mongoUri'),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
}catch(e){
    console.log('Server error', e.message)
    process.exit(1)
}

}
start()
app.listen(PORT, () => console.log(`Application started on port ${PORT}...`));