import React, { Component } from "react";
import { Button, ButtonToolbar, Spinner} from 'react-bootstrap';



export default class FinancialsCitizen extends Component {
    render() {
        return (
            <ButtonToolbar>
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
  </Button>
            </ButtonToolbar>

        )

    }



}