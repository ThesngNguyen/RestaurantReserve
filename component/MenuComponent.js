import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
// import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes
  }
};

class Menu extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dishes: DISHES
    // };
  }
  render() {
    if (this.props.dishes.isLoading) {
      return (<Loading />);
    } else if (this.props.dishes.errMess) {
      return (<Text>{this.props.errMess}</Text>);
    } else {
      return (
        // <FlatList data={this.state.dishes}
        <FlatList data={this.props.dishes.dishes}
        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
        keyExtractor={(item) => item.id.toString()} /> 
      );
    } 
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <ListItem containerStyle = {{ marginLeft: 5,
        marginRight: 5, 
        marginTop: 10, 
        borderRadius: 10, // adds the rounded corners
        backgroundColor: '#fff' ,
        paddingTop:  20,
      }}
      key={index} onPress={() => navigate('Dishdetail', { dishId: item.id })}>
        {/* <Avatar source={require('./images/uthappizza.png')} /> */}
        <Avatar source={{uri: baseUrl + item.image}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  // onDishSelect(item) {
  //   this.setState({ selectedDish: item });
  // }
}
export default connect(mapStateToProps)(Menu);