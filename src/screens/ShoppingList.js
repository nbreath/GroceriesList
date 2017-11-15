import React, { Component } from 'react';
import { Alert } from 'react-native-prompt-android';
import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon,
} from 'native-base';

export default class ShoppingList extends Component {
  static navigationOptions = {
    title: 'My Groceries List'
  };

  constructor(props) {
    super(props);
    this.state = {
      products: [{ id: 1, name: 'bread' }, { id: 2, name: 'egg' }]
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {
              this.state.products.map(p => {
                return (
                  <ListItem key={p.id}>
                    <Body>
                      <Text>{p.name}</Text>
                    </Body>
                    <Right>
                      <CheckBox checked={false} />
                    </Right>
                  </ListItem>
                );
              })
            }
          </List>
        </Content>
        <Fab style={{ backgroundColor: '#5067FF' }} position="bottomRight">
          <Icon name="add" />
        </Fab>
        <Fab style={{ backgroundColor: 'red' }} position="bottomLeft">
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}
