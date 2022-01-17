import React, { Component } from 'react';

class InputFieldClass extends Component {

    constructor () {
        
        super();

        this.state = {
            
            value: null,
            error: null
            
        }

    }

    handleValueChange ( value ) {
        
        console.log(value)
        this.setState(prevState => ({ value: value , ...prevState}), () => {console.log(this.state)})
        console.log(this.state)
        
    }
    
}

export default InputFieldClass;