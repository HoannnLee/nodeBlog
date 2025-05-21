const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
var mongooseDelete = require('mongoose-delete');
const AutoIncrementFactory = require('mongoose-sequence');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: {type: Number},
    name: {type: String , required : true},
    description: {type: String},
    image: {type: String},
    countPeople: {type: Number},
    videoQuantity: {type: Number},
    videoId: {type: String , required : true},
    level: {type: String},
    slug: { type: String, slug: 'name' , unique : true}
},{
    _id: false,
    timestamps: true,
});

//custom query helpers
CourseSchema.query.sortable = function (req)  {
    if ('_sort' in req.query) {
            
        const isValidType = ['asc','desc'].includes(req.query.type);

        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }

    return this;
}


// add plugin
CourseSchema.plugin(AutoIncrementFactory(mongoose));
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, 
    { 
        overrideMethods: 'all', 
        deletedAt: true
    }
);

module.exports = mongoose.model('Course' , CourseSchema)