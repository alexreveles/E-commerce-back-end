const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {

  // find all categories
  Category.findAll({
  // be sure to include its associated Products
    include: [Product]
  }).then(dbPost => {
    res.json(dbPost);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });

  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
  // be sure to include its associated Products
  include: [Product]
  }).then(dbPost => {
    res.json(dbPost);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
  
});

router.post('/', (req, res) => {
  // create a new category
  // expects category_name
  Category.create({
    category_name: req.body.category_name
  }).then(dbPost => {
    res.json(dbPost);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // pass in req.body instead to only update what's passed through
  Category.update(req.body, {
    individualHooks: true,
    where: {
      category_name: req.params.id
    }
  }).then(dbPost => {
    res.json(dbPost);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbPost => {
    res.json(dbPost);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
