import React, { Component } from "react";
import styles from './CountryModal.module.css';
import styled from '@emotion/styled';

const Button = styled.button `
    background-color: slamon;
    color: white;
    width: 50%;
    height: 25%;
    border-radius: 10%;
    align-self: center;
    &:hover {
        background-color: purple;
        cursor: pointer;
    }
`;

class CountryModal extends Component {

    closeModal = (event) => {
        event.preventDefault();
        this.props.modalActive(event);
    }

    render() {
        return (
            <>
                <main>
                    <section>
                        <div className={styles.modalMain}>
                            <div className={styles.mainContainer}>
                                <div className={styles.header}>
                                    <h1 className={styles.headerFont}> 
                                        {this.props.data.Country} 
                                    </h1>
                                </div>
                                <div className={styles.dataContainer}>
                                    <div className={styles.dataDivContainer}>
                                        { this.props.data.Status != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Status: {this.props.data.Status}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                        { this.props.data.Bureau != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Bureau: {this.props.data.Bureau}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                        { this.props.data.Post != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Post: {this.props.data.Post}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                        { this.props.data.Languages != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Languages: {this.props.data.Languages}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                    </div>
                                    
                                    <div className={styles.dataDivContainer}>
                                        {
                                            this.props.data.Latitude != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Latitude: {this.props.data.Latitude}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                        {
                                            this.props.data.Longitude != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Longitude: {this.props.data.Longitude}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                        {
                                            this.props.data.Embassy_Url != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Embassy_Url: {this.props.data.Embassy_Url}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                        {
                                            this.props.data.Status != null ? (
                                                <div className={styles.dataDiv}>
                                                    <div className={styles.dataDivText}> 
                                                        Status: {this.props.data.Status}
                                                    </div>
                                                </div>
                                            ) : <></>
                                        }
                                    </div>
                                </div>
                                <div className={styles.buttonDiv}>
                                    <Button
                                    variant="contained"
                                    onClick={(event) => this.closeModal(event)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        )
    }
}

export default CountryModal;