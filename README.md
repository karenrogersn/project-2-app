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
- message (type: String, maxlength: 2500)
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

Models: 2 —> [owner/ petsitter]

# Routers

## Base Router

GET - `/` —> homepage. Landing page with quick explanation of product and call to sign up and sign in.

GET - `/frequently-asked-questions` FAQ page. Displays frequently asked questions.

## Authentication Router - DONE

app.use('/authentication', authenticationRouter)

### Sign In routes - DONE

GET - `/authentication/signin` —> displays sign in form.
POST - `/authentication/signin` —> handles sign in form submission. Signs in already registered user.

authtenticatiounRoute.get('/signin') --> renders the form for sign in
authtenticatiounRoute.post('/signin') --> process the post from the form

### Sign Up routes - DONE

GET - `/authentication/signup` —> displays sign up form. - DONE

- name
- email
- type (select box with options Pet Owner and Pet Sitter)
- password
- petName
- petSpecies
- petBreed
- petComments

POST - `/authentication/signup` —> handles sign up form submission. Signs up new user, hashing the password, saving all of the user properties + pet properties nested in `pet` property.

authtenticatiounRoute.get('/signup') --> renders the form for sign in
authtenticatiounRoute.post('/signup') --> process the post from the form

### Sign Out route

POST - `/signout` - Sign out the user calling req.logout(); ----------> Why? Ins't it req.session.destroy?

authtenticatiounRoute.post('/signout')

## Post Router - DONE

app.use('/post', postRouter)

### Post Listing

GET - `/list` - display all of the posts

### Post creation - DONE

GET - `/create` —> displays post creation view from the owner’s personal page.
POST - `/create` —> post creation form submission.

### Post edit

GET - `/:postId/edit` —> displays post edit form.
POST - `/:postId/edit` —> post edit form submission.

### Post delete

POST - `/:postId/delete` —> post delete form submission.

## Profile Router - DONE

app.use('/user', userRouter);

### Display profile routes

GET - `/:userId` - Displays the information of the user. Displaying user posts. Display reviews made about user. Should have a button that allows other user to create review.

### Create user review - DONE

GET - `/:userId/review/create` - Display review creation form.
POST - `/:userId/review/create` - Handle review creation form submission.

### Edit user review

GET - `/:userId/review/edit` - Display review creation form, prefilled with already made review (in route handler you need to look up the review with receipient req.params.userId and creator req.user.\_id).
POST - `/:userId/review/edit` - Handle review creation form submission.

### Delete review

POST - `/:userId/review/delete` - Handle review creation form submission.

### Profile editing

GET - `/edit` —> displays owner/petsitter profile edit form.
POST - `/edit` —> owner/petsitter profile edit form submission.
