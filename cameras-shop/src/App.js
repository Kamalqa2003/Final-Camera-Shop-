import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import cup1 from './img/купольная 1.jpg'
import turbocup1 from './img/cup1(turbo).jpg'
import cup2 from './img/купольная2.jpg'
import turbocup2 from './img/cup2(turbo).jpg'
import cil1 from './img/цилиндрическая1.jpg'
import turbocil1 from './img/cil1(turbo).jpg'
import cil2 from './img/цилиндрическая2.jpg'
import turbocil2 from './img/cil2(turbo).jpg'
import ptz1 from './img/ptz1(ip).jpg'
import ptz2 from './img/ptz2(ip).jpg'
import cub1 from './img/cub1.jpg'
import turbocub1 from './img/cub1(turbo).jpg'
import cub2 from './img/cub2.jpg'
import About from "./components/About";
import Contacts from "./components/Contacts";



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: 'Купольная камера DAHUA',
          img: cup1,
          type: 'IP-видеокамера',
          resolution: '2 MP',
          lens: '2.8 mm',
          price: '29999'
        },
        {
          id: 2,
          title: 'Купольная камера DAHUA',
          img:cup2,
          type: 'IP-видеокамера',
          resolution: '2 MP',
          lens: '2.8 mm',
          price: '27999'
        },
        {
          id: 3,
          title: 'Цилиндрическая камера DAHUA',
          img:cil1,
          type: 'IP-видеокамера',
          resolution: '2 MP',
          lens: '2.8 mm',
          price: '27999'
        },
        {
          id: 4,
          title: 'Цилиндрическая камера DAHUA',
          img:cil2,
          type: 'IP-видеокамера',
          resolution: '8 MP',
          lens: '3.6 mm',
          price: '36000'
        },
        {
          id: 5,
          title: 'PTz камера DAHUA',
          img:ptz1,
          type: 'IP-видеокамера',
          resolution: '2 MP',
          lens: '5 mm',
          price: '31000'
        },

        {
          id: 6,
          title: 'PTz камера DAHUA',
          img:ptz2,
          type: 'IP-видеокамера',
          resolution: '4 MP',
          lens: '4.8 mm',
          price: '40000'
        },


        {
          id: 7,
          title: 'Кубическая камера DAHUA',
          img:cub1,
          type: 'IP-видеокамера',
          resolution: '2 MP',
          lens: '2 mm',
          price: '40000'
        },
        {
          id: 8,
          title: 'Кубическая камера DAHUA',
          img:cub2,
          type: 'IP-видеокамера',
          resolution: '2 MP',
          lens: '3.6 mm',
          price: '40000'
        },


        {
          id: 9,
          title: 'Купольная камера DAHUA',
          img: turbocup1,
          type: 'TurboHD-видеокамера',
          resolution: '2 MP',
          lens: '2.8 mm',
          price: '24999'
        },
        {
          id: 10,
          title: 'Купольная камера DAHUA',
          img:turbocup2,
          type: 'TurboHD-видеокамера',
          resolution: '5 MP',
          lens: '2.8 mm',
          price: '34999'
        },
        {
          id: 11,
          title: 'Цилиндрическая камера DAHUA',
          img:turbocil1,
          type: 'TurboHD-видеокамера',
          resolution: '2 MP',
          lens: '3.6 mm',
          price: '18999'
        },
        {
          id: 12,
          title: 'Цилиндрическая камера DAHUA',
          img:turbocil1,
          type: 'TurboHD-видеокамера',
          resolution: '2 MP',
          lens: '3.6 mm',
          price: '21000'
        },


        {
          id: 13,
          title: 'Кубическая камера DAHUA',
          img:turbocub1,
          type: 'TurboHD-видеокамера',
          resolution: '2 MP',
          lens: '2.8 mm',
          price: '15999'
        },



      ],
      showFullItem :false,
      fullItem: {},

    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }





  render() {
    return (
        <Router>
          <div className="wrapper">
            <Header orders={this.state.orders} onClearCart={this.handleClearCart} onDelete = {this.deleteOrder}/>
            <Routes>
              <Route path="/about" element={<About /> } />
              <Route path="/contacts" element={<Contacts /> } />
            </Routes>
            <Categories chooseCategory={this.chooseCategory}/>
            <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
            {this.state.showFullItem && <ShowFullItem onAdd={this.addToOrder} onShowItem={this.onShowItem} item={this.state.fullItem}/>}
            <Footer />
          </div>
         </Router>
    );
  }

  handleClearCart = () => {

    this.setState({ orders: [] });
  };

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category) {
    if(category === 'all' ) {
      this.setState({currentItems: this.state.items})
      return
    }
    this.setState({
      currentItems: this.state.items.filter(el => el.type === category)
    })
  }
  deleteOrder(id) {
    this.setState({orders: this.state.orders.filter(el => el.id !==id)})
  }

  addToOrder(item) {
    let isInArray = false
    this.state.orders.forEach(el => {
      if (el.id === item.id)
        isInArray = true
    })
    if(!isInArray)
    this.setState({orders:[...this.state.orders, item]})
}
}

export default App;
