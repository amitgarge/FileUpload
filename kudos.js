const fs = require('mz/fs');
const { Schema } = mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/test';
const opts = { useNewUrlParser: true };

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const albumSchema = new Schema({
    name: String,
    image: Buffer
});

mongoose.connect(uri, opts)
    .then(conn =>
        Promise.all(
            Object.entries(conn.models).map(([k, m]) => m.deleteMany())
        )
    )
    .then(() => fs.readFile('./burger.png'))
    .then(data => {
        let base64 = data.toString('base64');
        console.log(base64.substr(0, 200));
        let burger = new Buffer(base64, 'base64');
        return Album.create({ "title": "burger", "image": burger });
    })

    .then(() => Album.findOne())
    .then(album => {
        console.log(album);
        return fs.writeFile('./output.png', album.image)
    })

    .catch(console.error)
    .then(() => mongoose.disconnect());