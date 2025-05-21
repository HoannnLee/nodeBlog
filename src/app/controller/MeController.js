const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // khi có 2 method đều sử dụng promise thì có thể dùng Promise.all

    // [GET] , /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] , /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) => res.render('me/trash-courses', { courses: multipleMongooseToObject(courses) }))
            .catch(next);
    }
}

module.exports = new MeController();
