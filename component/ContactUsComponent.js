import React, { Component } from 'react';

import { Card, Divider } from 'react-native-elements';
import { Text } from 'react-native-elements';
class ContactUs extends Component {

    render() {
        return (
            <Card title="Contact Information">

                <Card.Title>
                    Contact Information
                </Card.Title>
                <Card.Divider></Card.Divider>
                <Text>
                    121, Clear Water Bay Road A

                </Text>
                <Text>
                Clear Water Bay, Kowloon

                </Text>
                <Text>
                HONG KONG

                </Text>
                <Text>
                Tel: +852 1234 5678

                </Text>
                <Text>
                Fax: +852 8765 4321

                </Text>
                <Text>
                Email:confusion@food.net
                </Text>
            </Card>
        );
    }
}


export default ContactUs;