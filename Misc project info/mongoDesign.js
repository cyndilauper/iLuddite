User Collection = 
{
	_id: uuid,
	username:{type:string, required: true, unique: true},
	password:{type:string, required: true},
	currentBook:{type:string},
	readingList:[ids],
	favoriteBooks:[ids],
	friends:[ids]
}

Book Collection = 
{
	bookName:{type:string},
	bookAuthor:{type:string},
	isbn:{type: integer},
	voteCount: STRETCH GOAL,
	image: ??,
	summary: {type:string},
	genre: {type:string},
	yearPublished:{type:string},
	whereToBuy: STRETCH GOAL,
	comments: STRETCH GOAL,
}
