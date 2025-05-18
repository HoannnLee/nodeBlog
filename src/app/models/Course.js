const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String , required : true},
    description: {type: String},
    image: {type: String},
    countPeople: {type: Number},
    videoQuantity: {type: Number},
    videoId: {type: String , required : true},
    level: {type: String},
    slug: { type: String, slug: 'name' , unique : true}
},{
    timestamps: true,
});


// add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, 
    { 
        overrideMethods: 'all', 
        deletedAt: true
    }
);

module.exports = mongoose.model('Course' , Course)