import React, {Component} from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

class  App  extends Component {


  state = {
    books: [],
    book: {},
    users: [],
    likes: 0,
    user: {}
  }
  componentDidMount(){
    return fetch("http://localhost:3000/books").then(resp=> resp.json()).then(booksArr => this.setState({books: booksArr}))
  }

  renderBooks =() =>{
    return this.state.books.map(book => <li key={book.id}>{book.title}</li>)
  }

  renderBook = (e) => {
    //console.log(e.target.textContent)
    const bookObj = this.state.books.find(book => book.title === e.target.textContent)
    return this.setState({
      book: bookObj,
      users: bookObj.users
    })
  }

  likeBook = () => {
    const newLikes = this.state.likes + 1
    const newUsers = [...this.state.users, {"id":1, "username":"pouros"}]
   
    fetch(`http://localhost:3000/books/${this.state.book.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes,
        users: newUsers
      })
    }).then(resp => resp.json()).then( this.setState({
      likes: newLikes,
      users: newUsers
    }))
  }

  
  render(){
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            <Menu.Item as={"a"} onClick={this.renderBook}>
              {this.renderBooks()}
            </Menu.Item>
          </Menu>
          <Container text>
            <Header>{this.state.book.title}</Header>
            <Image
              src={this.state.book.img_url}
              size="small"
            />
            <p>{this.state.book.description}</p>
            <Button
              onClick={this.likeBook}
              color="red"
              content="Like"
              icon="heart"
              label={{
                basic: true,
                color: "red",
                pointing: "left",
                content: this.state.likes
              }}
            />
            <Header>Liked by</Header>
            <List>
              {this.state.users.map(user => <List.Item icon="user"key={user.id} content={user.username} />)}
            </List>
          </Container>
        </main>
      </div>
    );

  }
}

export default App;
