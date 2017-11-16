import React, { Component } from 'react';
import { Alert, Platform, Linking } from 'react-native';
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
  Button
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

  componentDidMount() {
    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', this.handleOpenURL);
    }

    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    }).catch(err => console.warn('An error occurred', err));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    console.log(event.url);
    this.navigate(event.url);
  }

  navigate = (url) => {
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split('/')[0];

    if (routeName === 'testg') {
      navigate('ColorContainer', { id });
    };
  }

  handleProductPress(product) {
    this.state.products.forEach(p => {
      if (product.id === p.id) {
        p.gotten = !p.gotten;
      }
      return p;
    });

    this.setState({ products: this.state.products });
  }

  handleAddProductPress() {
    this.props.navigation.navigate('AddProduct', {
      addProduct: product => {
        this.setState({
          products: this.state.products.concat(product)
        });
      },
      deleteProduct: product => {
        this.setState({
          products: this.state.products.filter(p => p.id !== product.id)
        });
      },
      productsInList: this.state.products
    });
  }

  handleOpenColorContainer() {
    this.props.navigation.navigate('ColorContainer');
  }

  handleClearProductPress() {
    Alert.alert('Clear all items?', null, [
      { text: 'Cancel' },
      { text: 'Ok', onPress: () => this.setState({ products: [] }) }
    ]);
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {
              this.state.products.map(p => {
                return (
                  <ListItem
                    key={p.id}
                    onPress={this.handleProductPress.bind(this, p)}
                  >
                    <Body>
                      <Text>{p.name}</Text>
                    </Body>
                    <Right>
                      <CheckBox
                        checked={p.gotten}
                        onPress={this.handleProductPress.bind(this, p)}
                      />
                    </Right>
                  </ListItem>
                );
              })
            }
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this.handleAddProductPress.bind(this)}
        >
          <Icon name="add" />
        </Fab>
        {/* <Button
          style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center' }}
          onPress={this.handleOpenColorContainer.bind(this)}
        >
          <Icon name="add" />
        </Button> */}
        <Fab
          style={{ backgroundColor: 'red' }}
          position="bottomLeft"
          onPress={this.handleClearProductPress.bind(this)}
        >
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}
