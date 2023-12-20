import React, { Component } from 'react';


export class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories : [
                {
                    key: "all",
                    name: 'Все'
                },

                {
                    key: "IP-видеокамера",
                    name: 'IP-видеокамеры'
                },

                {
                    key: "TurboHD-видеокамера",
                    name: 'TurboHD камеры'
                },
            ]
        }
    }
    render() {
        return (
            <div className='categories'>
                {this.state.categories.map(el =>(
                    <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
                ))}

            </div>
        )
    }
}
export default Categories