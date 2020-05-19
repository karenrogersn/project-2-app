- In here we will have all of the planning for the project
  \*\* Idea: Pet owners will be posting their needs of sitting and sitters will scroll through posts offering their services.

\*\*\* Models

\*\*\*\* User Model --> Will hold all of the information from the users
{

- name (type: String, required: true, trim: true)
- type (type: String, enum: ['Pet Owner', 'Petsitter'])
- email (type: String, required: true, lowercase: true, trim: true
- passwordHash (type: String)
- status: (type: String, enum: ['Pending Confirmation', 'Active'])
- confirmationCode: (type: String, required: true)
- timestamps: true
- photo (type: String)
- pet photo (type: String) (Wishlist)
- location (type: String) (City?)
- pet name: (type: String, required: true, trim: true)
- pet species: (type: String, required: true)
- breed (type: String)
- age (type: Number)
- pet personality (type: String, maxlength: 140, easy-going, strong-character, shy, loving, etc)
- additional comments (type: String, maxlength: 1000)
  }
  \*\*\*\* Review Model
  {
- creator (type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User')
- recipient (type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User')
- bonemeter (type: Number)
- title (type: String, minlength: 5, maxlength: 140, required: true)
- message (type: String, maxlength: 2000)
  }
  \*\*\*\* Post Model
  {
- title (type: String, minlength: 5, maxlength: 140, required: true)
- message (type: String, maxlength: 5000)
- creator: (type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User')
- dates in wich the service is available:
- timestamps: (createdAt: 'createdDate', updatedAt: 'updatedDate')
  }

\*\*\* Routes
Petsitter

## Structure 💙

CRUD: create, read, update, delete

Create

1. Create profiles: owners, petsitter & pets
2. Create posts
3. Create reviews

Read

1. Visit homepage
2. Read/visit profiles
3. Read/visit posts

Update

1. Update profiles
2. Update posts
3. Update Reviews

Delete

1. Delete posts
2. Delete Reviews

Authentication: with mail/username and password.

- You can only write a post if you are a pet owner.
- You can only ask for a sitting job if you have a sitter profile.
- You can visit the list of posts if you don’t have a profile.

Models: 2 —> [owner/ petsitter][pet]

Read
GET - `/` —> homepage.

View most recent posts from each pet owner
Link to create a post.
Link to sign up.

Link to sign in.
Authtentication route
app.use('/authentication', authenticationRoute)

GET - `/authentication/signin` —> displays sign in form.
POST - `/authentication/signin` —> handles sign in form submission. Signs in already registered user. We need a button to create a pet profile.

authtenticatiounRoute.get('/signin') --> renders the form for sign in
authtenticatiounRoute.post('/signin') --> process the post from the form

authtenticatiounRoute.get('/signup') --> renders the form for sign in
authtenticatiounRoute.post('/signup') --> process the post from the form

authtenticatiounRoute.post('/signout')

Create

1. people’s Profile

2) Posts
   GET - `user/:userId/post/create` —> displays post creation view from the owner’s personal page.
   POST - `user/:userId/post/create` —> post creation form submission.

4. Reviews
   POST —> `user/:userId/post/:postId/review/create` —> post review creation form submission.
   Important: You need to somehow get the information from the sitter and the owner!

Update

1. people’s profile
   GET - user/:userId/edit —> displays owner/petsitter profile edit form.
   POST - user/:userId/edit —> owner/petsitter profile edit form submission.

2. Posts
   GET - user/:userId/post/:postId/edit —> displays post edit form.
   POST - user/:userId/post/:postId/edit —> post edit form submission.

Delete

3. Posts
   POST - `post/:postId/delete` —> post delete form submission.

4. Review
   POST - `review/:reviewId/delete` —> post delete form submission.

// organize routes depending on the db models

//USERS --> /user in the app.js

Create

Read

GET - /:userId [/user/:userId] -> displays the information of the user

Update

GET - /:userId/edit [user/:userId/edit] —> displays owner/petsitter profile edit form.
POST - /:userId/edit [user/:userId/edit] —> owner/petsitter profile edit form submission.

//AUTHENTICATION --> /authentication in the app.js

authtenticatiounRoute.get('/signup') --> renders the form for sign in
authtenticatiounRoute.post('/signup') --> process the post from the form

authtenticatiounRoute.get('/signin') --> renders the form for sign in
authtenticatiounRoute.post('/signin') --> process the post from the form

authtenticatiounRoute.post('/signout')

//POSTS --> /posts in the app.js
Create

GET - /create [posts/create] —> displays post creation view from the owner’s personal page.
POST - /create [posts/create] —> post creation form submission.

Read
GET - / [/posts] -> display all of the posts
GET - /:postId [/posts/post:Id] -> display a specifi post

Update

GET - /:postId/edit[/post/:postId/edit] —> displays post edit form.
POST - /:postId/edit[/post/:postId/edit] —> post edit form submission.

Delete

POST - /:postId/delete [post/:postId/delete] —> post delete form submission.

//REVIEWS --> /reviews in the app.js
Create

GET -> /create/:sitterID/:petOwnerID [/reviews/create/:sitterID/:petOwnerID] -> when in the users profile, you click a button for reviews that goes to this page and renders a form for you to leave a review
POST —> /create/:sitterID/:petOwnerID [/reviews/create/:sitterID/:petOwnerID] —> post review creation form submission.
Important: You need to somehow get the information from the sitter and the owner!

Update
GET -> /edit/:reviewID [/reviews/edit/:reviewID] -> displays the already created review for it to be updated
POST -> /edit/:reviewID [/reviews/edit/:reviewID] -> handles the update of the review

Delete
POST -> /delete/:reviewID [/reviews/edit/:reviewID] -> handles the delete of the review
