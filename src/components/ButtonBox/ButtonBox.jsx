import React, { Component } from 'react';
import styled from '@emotion/styled';
import styles from './ButtonBox.module.css';

const Button = styled.button `
    background-color: purple;
    color: white;
    width: 50%;
    height: 25%;
    border-radius: 10%;
    &:hover {
        background-color: orangered;
        cursor: pointer;
    }
    &:focus {
        background-color: orangered;
    }
    font-size: 25px;
    font-weght: bold;
`;

class ButtonBox extends Component {
    constructor(props) {
        super(props)

        this.handlePointClick = this.handlePointClick.bind(this);
    }

    handlePointClick = (event) => {
        event.preventDefault();
        this.props.addEmbassyPoints(event);
    }

    render() {
        return (
            <>
                <div className={styles.buttonBox}>
                    <Button
                    variant="contained"
                    onClick={(event) => this.handlePointClick(event)}>
                        {this.props.buttonOne}
                    </Button>
                </div>
            </>
        )
    }
}

export default ButtonBox;