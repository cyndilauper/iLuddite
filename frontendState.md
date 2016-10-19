# Frontend State
This is a listing of behaviors that are needed on the front end broken down by component and page they exist on.

## App component
This is the shell of the program. Once past the landing page this is the top level component that has a navbar and that renders any children that the router gives it. The potential components it would render would be the users profile page, edit profile page, and a book detail page.

**State:**
* Current logged in user's id
* Current logged in user's queue
* Current logged in user's favorites

**Actions:**
* Add/Remove book from Queue
* Add/Remove book from Favorites

## Profile component
This component shows off a users profile. On initial load this will be the logged in users profile, but by the user navigating through their friends the profile component would need to display other users.

**State**
* The information for the current user it is looking at. **It is going to be a challenge to learn how to have this component go from looking at one user to another**

**Actions:**
* Be able to click any book and go to the Book component

### Lifecycle
* **componentDidMount()** As soon as this component mounts it is going to make a get request to collect the user that it needs to display. It is going to know what the user is by reading the `this.props.params.userId`. The route that renders this component must have a path of `'/user/:userId'` 

## Book 
This component is responsible for showing a book cover, author and details. The user would arrive to this page by clicking a book from a user profile or from a search done through the app navbar/

**State:**
* The details of the book that is being viewed

**Actions:**
* Add a book to Queue
* Add a book to Favorites

### Lifecycle
* **componentDidMount()** As soon as this component mounts it is going to make a get request to get the info for the book that it needs to view. It knows what book to render by reading the `this.props.params.bookId`. The route that renders this component needs to have a path of `'/book/:bookId'`.

## Edit Page
The component responsible with helping the user manage their queue and their favorites.

**State:**
* None all of its state comes from the App component which keeps track of the currently logged in users queue and favorites.

**Actions:**
* Add/Remove a book to Queue
* Add/Remove a book to Favortes
