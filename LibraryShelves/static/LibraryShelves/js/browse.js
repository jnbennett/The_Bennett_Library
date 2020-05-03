axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const BrowseApp = new Vue({
	el:'#BrowseApp',
	delimiters: ['${', '}'],
	data:{
		authors:[],
		books:[],
		translators:[],
		editors:[],
		genres:[],
		genre:'Browse by genre',
		detailedBook: {},
		detailedAuthor: {},
		bookCovers:[],
		bookShelf: [],
		browseAuthors: [],
		bookInstance:[],
		search:''
	},

	methods:{
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

		getGenre: async function(){
			const res = await axios.get('/api/genre/')
			this.genres = res.data

		},

		getBookCover: function(){
	
			this.bookCovers = this.books.map((elem)=> elem.cover);
		},

		getBooks: async function(){
			this.bookShelf = []
			this.books = []
			this.authors = []

			const res = await axios.get('/api/book/')
			let allBooks = res.data

			for (book of allBooks){
					for (i of book.genre){
							if (i.category === this.genre){
								this.books.push(book)
						
						}
					}
				}
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
	mounted: function(){
		this.getGenre()
		

	},
})