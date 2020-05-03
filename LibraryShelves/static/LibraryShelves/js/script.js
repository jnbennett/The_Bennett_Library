axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"


const HomeApp = new Vue({
	el: '#HomeApp',
	delimiters: ['${', '}'],
	data: {
		message: 'The Bennett Library',
		authors: [],
		books: [],
		bookCovers: [], //comment
		bookInstance: [],// comment
		search: '',
		authorQuery: [], //comment
		bookShelf: [],
		detailedBook: {},
		detailedAuthor: {},
		bookQuery: [],
		sortedShelf: [],
		shelfQuery: [],
		show: true	//comment
		
	},
	methods: {
	
		getBooks: async function(){
			
			const res = await axios.get('/api/book/')
			let allBooks = res.data

			this.books = allBooks

			this.getAuthors();

			
		},


		getAuthors: async function(){
			/*
				easy way to compile string friendly version of name

				MIGHT NOT NEED
				
			*/
			const responseAuthor = await axios.get('/api/author/')
			authorList = responseAuthor.data

			for (book of this.books){
				for (author of authorList){
					if (book.author == author.pk){
						if (this.authors.includes(author)){
						}
						else {this.authors.push(author)
						}
					}
				}
			}
			this.bookEasyView();



			// let arrAuthors = this.authors.map((elem)=>  # makes a list of names
			// 	elem.first_name + ' ' + elem.last_name);


		},

		bookEasyView: function(){
			
			
			for (book of this.books){
				if (book.author === null){
						let bookObject = new Object();
						bookObject.author = ''
						bookObject.title = book.title
						bookObject.cover = book.cover
						bookObject.bookPK = book.pk
						bookObject.editors = book.editor
						this.bookShelf.push(bookObject)
					}
				for (author of this.authors){
					if (book.author === author.pk){
		
						let bookObject = new Object();

						bookObject.author = author.published_name
						bookObject.title = book.title
						bookObject.cover = book.cover
						bookObject.bookPK = book.pk
						bookObject.authorPK = author.pk
						bookObject.editors = book.editor
						this.bookShelf.push(bookObject)

					} 
				}
			}

		},

		getBookCover: function(){
	
			this.bookCovers = this.books.map((elem)=> elem.cover);

		},


		searchShelves: async function(){

			/*
				add comment
			*/

			const responseBook = await axios.get('/api/book/')
			this.books = responseBook.data

			const responseAuthor = await axios.get('/api/author/')
			this.authors = responseAuthor.data

			this.getBookCover()

		},

		bookDetail: async function(event){
			this.detailedBook = {}
			this.detailedAuthor = {}
			var id = event.target.getAttribute('id')
			
			const res = await axios.get('/api/book/'+id + '/')
			
			this.detailedBook = res.data

			if (res.data.author != null){
				this.authorDetail()
			}
			
		},

		authorDetail: async function(){

			const res = await axios.get('/api/author/' + this.detailedBook.author + '/')
			this.detailedAuthor = res.data
		}


	},

	computed: {
		filteredBooks: function(){
			/* 
				comment
			*/
			// let books = this.books;
			// let search = this.search;


			// if (!search){
			// 	return '';
			// }
			

			// searchString = search.trim().toLowerCase();
			
			// books = books.filter(function(item){
			// 	if(item.title.toLowerCase().indexOf(searchString) !== -1) {
			// 		return item;
			// 	}

			// })
			
			// this.bookQuery = books
			
			// let books = this.bookShelf;
			// let search = this.search;

			// console.log(books)

			// if (!search){
			// 	return '';
			// }
			

			// searchString = search.trim().toLowerCase();
			
			// books = books.filter(function(item){
			// 	if(item.title.toLowerCase().indexOf(searchString) !== -1){
			// 		return item;
			// 	}
			// 	if(item.author.toLowerCase().indexOf(searchString) !==-1){
			// 		return item;
			// 	}
			// })
			let titleShelf = []
			let authorShelf = []
			let shelf = []

			this.bookShelf.filter((item)=>{
				if (item.author.toLowerCase().match(this.search.toLowerCase())){
					if (item.author != ''){
						authorShelf.push(item)
					}
				};
			}) 
		
			this.bookShelf.filter((item)=>{
				if (item.title.toLowerCase().match(this.search.toLowerCase())){
					shelf.push(item)
				};
			}) 
		
				for (book of authorShelf){
					
						if (shelf.includes(book)){
						// if (shelf.includes(book)){
						}
						else{
							shelf.push(book)
						}
						// 	console.log(shelf)
						// }
				} return shelf
					
						// this.bookShelf.filter((item)=>{
			// 	if (item.title.toLowerCase().match(this.search.toLowerCase())){
			// 		shelf.push(item)
			// 	}; console.log(shelf)
			// 	return shelf
			// }); 
			

		},

		filteredAuthors: function(){
			/*
				comment
			*/
			return this.bookShelf.filter((item)=>{
				return item.author.toLowerCase().match(this.search.toLowerCase())
			})


			// let authors = this.authors.map((elem)=> ({
			// 		'name': elem.first_name + ' ' + elem.last_name,
			// 		'pk': elem.pk,
			// 		'book': elem.book
			// 	}))

			// let search = this.search.trim().toLowerCase();



			// if (!search){
			// 	return '';
			// }

			// authors = authors.filter(function(item){
			// 	if(item.name.toLowerCase().indexOf(search)!== -1){
			// 		return item;}
			// 	})

			// this.authorQuery = authors

			// let books = this.bookShelf;
			// let search = this.search;


			// if (!search){
			// 	return '';
			// }
			

			// searchString = search.trim().toLowerCase();
			
			// books = books.filter(function(item){
			// 	if(item.title.toLowerCase().indexOf(searchString) !== -1){
			// 		return item;
			// 	}else if(item.author.toLowerCase().indexOf(searchString) !==-1) {
			// 		return item;
			// 	}


			// })

		},

		filteredBookShelf: function(){

			/*
				add comment
			*/

			let noDuplicatesShelf = []; 
			let books = this.bookQuery;
			let authors = this.authorQuery;

			let authorsPK = authors.map((item)=> item.pk).sort()
			let booksPK = books.map((item)=>item.author).sort()		

			if (JSON.stringify(booksPK) === JSON.stringify(authorsPK)){
				/*
					add comment
				*/
				return authorsPK
			}else if(JSON.stringify(booksPK) != JSON.stringify(authorsPK)){
				/*
					add comment
				*/
				for (item of booksPK){
					noDuplicatesShelf.push(item)
					}
					for (item of authorsPK){
						if(noDuplicatesShelf.indexOf(item) === -1){
							noDuplicatesShelf.push(item);
						}
					
					}

				} return noDuplicatesShelf
	
			},
			
		filteredLibrary:function(){

				
				let books = this.bookQuery;
				let authors = this.authorQuery;
				let sortedShelf = new Map();

				for (item of books){
					if (noDuplicates.includes(item.author)){
						sortedShelf.set(
							'title', item.title,
							'bookcover', item.cover,
							)
						for (item of authors){
							if (noDuplicates.includes(item.pk)){
								sortedShelf.set(
									'name', item.first_name + ' ' + item.last_name
									)
							}
						}
									this.sortedShelf = sortedShelf
					}
				}


		}	
			
	},

	mounted: function(){
		// this.searchShelves()
		this.getBooks()
	},

});


/* getBooks() {
  	 axios.request({
      method: 'get',
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + this.state.text
    }).then((response) => {
      this.setState({books: response.data.items}, () => {
        console.log(this.state);
      })
    }).catch((error) => {
      console.log(error);
    });
  }

     axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=your_api_key")
    .then(response => {this.results = response.data.results})
    */
  
  
