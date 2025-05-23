import React, { Component } from 'react';
import EmojiList from './emojiList.json';
import './App.css';
import Navbar from './Components/Navbar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiList: EmojiList,
      inputValue: "",
      copiedEmoji: null
    }
    this.searchEmoji = this.searchEmoji.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  searchEmoji = (e) => {
    const inputValue = e.target.value.trim();
    this.setState({ inputValue });
  }

  copyToClipboard = (symbol) => {
    navigator.clipboard.writeText(symbol);
    this.setState({ copiedEmoji: symbol });
    setTimeout(() => {
      this.setState({ copiedEmoji: null });
    }, 4000);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container ">
          <h1 className="heading  pb-5">🦄 Emoji Search App</h1>
          <div className="col-md-6 mb-4 mx-auto">
            <div className="input-group md-form form-sm form-2 pl-0">
              <div className="input-group-append" >
                <span className="input-group-text amber lighten-3" id="basic-text1"><i className="fa fa-search text-grey"
                  aria-hidden="true"></i></span>
              </div>
              <input className="form-control my-0 py-1 " onChange={(e) => { this.searchEmoji(e) }} type="text" placeholder="Search for an emoji" aria-label="Search"></input>
            </div>
          </div>
          <div className="row mx-auto ">
            {
              this.state.emojiList.filter(value => {
                return value.keywords.some(keyword => keyword.toLowerCase().includes(this.state.inputValue.toLowerCase()))
              }).map(el => {
                return (
                  <div className="card emojiCard  m-3   card-columns mx-auto d-flex justify-content-center " data-toggle="tooltip" data-placement="bottom" title="Click here to Copy" onClick={() => this.copyToClipboard(el.symbol)}>
                    <div className="emoji">
                      <span className="emoji">
                        {el.symbol}
                      </span>
                      {this.state.copiedEmoji === el.symbol && <p className="fade-in " >Copied!</p>}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
