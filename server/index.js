
const express = require ('express');
const app = express();
const cors = require('cors');

app.set ('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log('Server ejecutandose en el puerto', app.get('port'))
});

const morgan = require ('morgan');
const {mongoose} = require('./database.js');

app.use(cors({origin: "http://localhost:4200"}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/libros', require('./routes/libros.routes.js'));
app.use('/uploads', express.static('server/uploads'));
app.use('/api/cliente', require('./routes/cliente.routes.js'));
app.use('/api/compras', require('./routes/compras.routes.js'));