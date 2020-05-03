axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"


const app = new Vue({
	el: '#app',
	delimiters: ['${', '}'],
	data: {
		message: 'The Bennett Library',
		authors: [],
		books: [],
		bookCovers: [],
		translators: [],
		genre: [],
		bookInstance: [],
		search: '',
		searchResults: [
			{author: ''},
			{title: ''},
			{cover: ''}
		]
	},
	methods: {

		getBookCover: function(){
	
			this.bookCovers = this.books.map((elem)=> elem.cover);
		},

		getTitle: function(){


		},

		getAuthor: function(){
			let arrAuthors = this.authors.map((elem)=> 
				elem.first_name + ' ' + elem.last_name);

		},

		searchShelves: async function(){
			const responseBook = await axios.get('api/book/')
			this.books = responseBook.data

			const responseAuthor = await axios.get('api/author/')
			this.authors = responseAuthor.data

			this.getBookCover()



		},

		searchAuthor: async function(){
			const query = {
				search: this.search
			}

			const res = await axios.post('http://127.0.0.1:8000/', query)

			this.searchResults = res.data
		}



	},
	computed: {
		filteredBooks: function(){
			let books = this.books;
			let search = this.search;

			//if (!search){
			//	return books;
			

			searchString = search.trim().toLowerCase();
			
			books = books.filter(function(item){
				if(item.title.toLowerCase().indexOf(searchString) !== -1){
					return item;
				}
			})
			return books
			
		},

		filteredAuthors: function(){
			let authors = this.authors.map((elem)=> ({
				//elem.first_name + ' ' + elem.last_name);
					'name': elem.first_name + ' ' + elem.last_name,
					'pk': elem.pk,
					'book': elem.book
				}))

			let search = this.search.trim().toLowerCase();

			/*let authorShelf = this.authors.map((elem)==>
					'name': elem.first_name + ' ' + elem.last_name,
					'pk': elem.pk,
					'book': elem.book
				);*/


			authors = authors.filter(function(item){
				if(item.name.toLowerCase().indexOf(search)!== -1){
					return item;}
					//if(item.last_name.toLowerCase().indexOf(search) !== -1){
					//	return item;
					//}
				//need it to match indexoF first_name + ' ' + last_name
				//side note book is a key in author object, so I should be able to use a Boolean to display title, and cover based off author

				/*authors = authors.filter(function(item){
					if(item.first_name.toLowerCase().indexOf(search) &&
						item.last_name.toLowerCase().indexOf(search) !== -1){
						return item;
					}*/
				})

			return authors

		},
		filteredBookCovers: function(){
			let covers = this.bookCovers;
			// let books = filteredBooks()
			//map a new list of books.cover
			//compare items in map to items in cover
			//if match return 

			//might need to make another data object authorSearch BookSearch append books/author in filteredBooks 
			//and filteredAuthors and compare 
		}
	},
	mounted: function(){
		this.searchShelves()
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
  
  
