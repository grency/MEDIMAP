const mongoose = require('mongoose');

//conexion a la base de datos
mongoose.connect('mongodb://localhost/medimaps',
{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}
).then(db=> console.log('database is connected'))
.catch(err=> console.log(err))

module.exports = mongoose;