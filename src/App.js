import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {getItems} from "./components/backend";
import Element from "./components/frontend/Element";
import './App.css';

const threshold = 200;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            page: 1,
            size: 3
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    }

    handleResize = () => {
        const size = Math.floor(window.innerHeight / 100);
        this.setState({
            size
        }, () => this.loadItems(this.state.page));
    };

    loadItems = (page) => {
        getItems(page, this.state.size * 2)
            .then(resp => {
                this.setState({
                    items: resp.items,
                    page,
                })
            });
    };

    render() {
        const {items, size} = this.state;
        return (
            <div className="App scroll">
                <InfiniteScroll
                    threshold={size * threshold}
                    loadMore={this.loadItems}
                    initialLoad={false}
                    hasMore={true}
                    useWindow={false}>
                    {items.map((item, index) => <Element data={item} key={index}/>)}
                </InfiniteScroll>
            </div>
        )
    }
}

export default App;
