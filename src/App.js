import React from 'react';
import './App.css';
import Book from './Book';

class App extends React.Component {

  state = {
    items: [],
    search: '',
    key: 'AIzaSyBv1rLeOhJu8sVz-_ySfNhzmJVP3Dx-PPA',
    API_URL: 'https://www.googleapis.com/books/v1/volumes',
    filters: [],
  }

  onSearchInput = (e) => {
    this.setState({ search: e.target.value });
  }

  onSearchClick = () => {
    console.log(this.state);
    const { key, search, API_URL } = this.state
    fetch(`${API_URL}?q=${search}&key=${key}`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json()
      })
      .then(resp => {
        this.setState({
          items: resp.items,
        })
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleFilterSelect = (e) => {
    const filterValue = e.target.value;
    const filterType = e.target.id;
    const filters = { filterType, filterValue };
    this.setState({ filters });
  }

  render() {
    console.log(this.state);
    let { items: books, filters } = this.state;
    if (filters.filterType !== undefined) {
      books = books.filter(book => book.volumeInfo[filters.filterType] === filters.filterValue)
    }
    books = books.map((item, i) => {
      const {
        imageLinks = {
          thumbnail: '',
        },
        title = '',
        authors = [''],
        description = '',
      } = item.volumeInfo;

      return <Book
        key={i}
        img={imageLinks.thumbnail}
        title={title}
        authors={authors}
        description={description}
      />
    });

    let categoriesSet = new Set();
    this.state.items.forEach((item) => {
      const { categories = [] } = item.volumeInfo;
      if (categories.length > 0) {
        categories.forEach(category => {
          categoriesSet.add(category);
        });
      }
    })
    categoriesSet = [...categoriesSet.values()].map((category, i) => {
      return <option key={i} value={category}>{category}</option>
    });

    let publisherSet = new Set();
    this.state.items.forEach((item) => {
      const { publisher = '' } = item.volumeInfo;
      if (publisher) {
        publisherSet.add(publisher);
      }
    });
    publisherSet = [...publisherSet.values()].map((publisher, i) => {
      return <option key={i} value={publisher}>{publisher}</option>
    });

    return (
      <main>
        <header className="header">
          <h1>Google Book Search</h1>
        </header>

        <div className="searchForm">
          <label>Search: </label>
          <input onChange={(e) => this.onSearchInput(e)} type="text"></input>
          <button onClick={this.onSearchClick}>Search</button>
        </div>
        <div className="bookFilters">
          <div>
            <label for="print-type">Categories:</label>
            <select onChange={this.handleFilterSelect} className="printType" name="print" id="categories">
              <option value="">All</option>
              {categoriesSet}
            </select>
          </div>
          <div>
            <label for="book-type">Publisher:</label>
            <select onChange={this.handleFilterSelect} className="bookType" name="pets" id="publisher">
              <option value="">All</option>
              {publisherSet}
            </select>
          </div>
        </div>
        <section>
          {books}
        </section>
      </main>
    )
  }
}

export default App;
