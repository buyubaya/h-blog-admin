import React, { Component } from 'react';
import { Input, Button } from 'antd';


export default class Sample extends Component {
    render() {
        return (
            <div>
                <h1>SAMPLE</h1>
                <div>
                    <Input />
                </div>
                <div>
                    <Input />
                </div>
                <Button>SUBMIT</Button>
            </div>
        )
    }
}
