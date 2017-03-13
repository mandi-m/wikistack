var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
    //	retrieve all wiki pages

  res.redirect('/');
});

router.post('/', function(req, res, next) {
    //	submit a new page to the database
      // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

    // var page = Page.build({
    //     title: req.body.title,
    //     content: req.body.content
    // });

    // //if you use page.create then you don't have to do save (it does both build AND save)
    
    // //page.build creates an instance of our model, so we hold that in a variable and call .save() on it.
    // //.save saves an instance.
    // //Page.create will return the row of our database and sequelize methods. 
    
    // // STUDENT ASSIGNMENT:
    // // make sure we only redirect *after* our save is complete!
    // // note: `.save` returns a promise or it can take a callback.


    // //need to wait for page to save before redirecting (build & save are asynchronous)
    // page.save().then(function(){
    //     res.redirect(page.route);
    // }
    // );

    Page.create({
        title: req.body.title,
        content: req.body.content
    }).then(function(savedPage){
        res.redirect(savedPage.route);
    });
});


router.get('/add', function(req, res, next) {
    // 	retrieve the "add a page" form
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(foundPage){
    // res.json(foundPage);
    res.render('wikipage', foundPage);
  })
  .catch(next);
  //res.send('hit dynamic route at ' + req.params.urlTitle);
});








module.exports = router;