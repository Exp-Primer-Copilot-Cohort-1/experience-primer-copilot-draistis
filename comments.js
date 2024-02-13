// Create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Get all comments
router.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comments);
    }
  });
});

// Get a specific comment
router.get('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

// Create a new comment
router.post('/', (req, res) => {
  Comment.create(req.body, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

// Update a specific comment
router.put('/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

// Delete a specific comment
router.delete('/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) {
      console.log(err);
    } else {
      res.json(comment);
    }
  });
});

module.exports = router;
```

### Step 4: Create the `server.js` file
```javascript
// Path: server.js
// Create web server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const commentRoutes = require('./routes/comments');
const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/comments', commentRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Step 5: Run the server
```bash
$ node server.js
Server is running on port 3000
```

### Step 6: Test the API
```bash
$ curl -X GET http://localhost: