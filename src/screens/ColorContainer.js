import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';

const ColorContainer = ({ navigation }) => {
  const { id } = navigation.state.params ? navigation.state.params : { id: 2 };

  return (
    <Container>
      <Content>
        <Grid>
          <Col style={{ backgroundColor: '#635DB7', height: 200 }}>
            <Text style={{ color: '#FFF' }}>{id ? id : 'No hay'}</Text>
          </Col>
          <Col style={{ backgroundColor: '#00CE9F', height: 200 }}></Col>
        </Grid>
      </Content>
    </Container >
  );
};

export default ColorContainer;