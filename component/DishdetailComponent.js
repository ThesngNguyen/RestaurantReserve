import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Card, Image ,Icon, Button, Rating, Input } from 'react-native-elements';
import { postFavorite } from '../redux/ActionCreators';
// import { DISHES } from '../shared/dishes';
// import {COMMENTS} from '../shared/comments'
import { ScrollView } from 'react-native-virtualized-view';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { baseUrl } from '../shared/baseUrl';

class RenderDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: '',
      rating: 5,
      comment: '',
      ratingText: '',
    }
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false,
      author: '',
      comment: '',
      rating: 0,
    });
  }

  ratingCompleted(rating) {
    this.setState(rating)
  }

  handleComment() {
    // alert(JSON.stringify(this.state));
    this.setState({ showModal: true });
  }

  render() {
    const dish = this.props.dish;
    if (dish != null) {
      return (
        <ScrollView>
          <Card>
            <Image source={{ uri: baseUrl + dish.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
            </Image>
            <Text style={{ margin: 10 }}>{dish.description}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'Center', justifyContent: 'Center'}}>
              <Icon raised reverse type='font-awesome' color='#f50'
                name={this.props.favorite ? 'heart' : 'heart-o'}
                onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
              <Icon raised reverse name="pencil" type="font-awesome" color="#512DA8"
                onPress={() => this.toggleModal()}
              />
            </View>
          </Card>
          <Modal 
            animationType='slide' 
            transparent={false} 
            visible={this.state.showModal} 
            // onDismiss={() => this.resetForm()}
            onRequestClose={() => this.resetForm()}>
              {/* <CommentContent author={this.state.author} rating={this.state.ratingText} comment={this.state.comment} ></CommentContent> */}
              <View style={styles.modal}>
                <Rating
                  showRating
                  startingValue={this.state.rating}
                  onFinishRating={(rating) => this.ratingCompleted(rating)}
                  style={{ paddingVertical: 10 }}
                />
                <Input
                  placeholder="Author"
                  leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                  onChangeText={(value) => this.setState({ author: value })}
                  value={this.state.author}
                  containerStyle={styles.formInput}
                />
                <Input
                  placeholder="Comment"
                  leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                  onChangeText={(value) => this.setState({ comment: value })}
                  value={this.state.comment}
                  containerStyle={styles.formInput}
                />
                <Button
                  title="Submit"
                  onPress={() => this.handleComment()}
                  color="#512DA8"
                  style={styles.formButton}
                />
                <Button
                  title="Cancel"
                  onPress={() => this.resetForm()}
                  color="#808080"
                  style={styles.formButton}
                />
              </View>
          </Modal>
        </ScrollView>
        
      );
    }
    
    return (<View />);
  }
}

const styles = StyleSheet.create({
  formRow: { alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row', margin: 20 },
  formLabel: { fontSize: 18, flex: 2 },
  formItem: { flex: 1 },
  modal: { justifyContent: 'center', margin: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', backgroundColor: '#7cc', textAlign: 'center', color: 'white', marginBottom: 20 },
  modalText: { fontSize: 18, margin: 10 }
});

class CommentContent extends Component {
  render() {
    return (
      <View style = {styles.modal}>
        <Text style={styles.modalTitle}>Leave your comment</Text>
        <Text style={styles.modalText}>Author Name: </Text>
        <Text style={styles.modalText}>Rating: </Text>
        <Text style={styles.modalText}>Comments: </Text>
        <Button title='Close' color='#7cc' onPress={() => this.props.onPressClose()} />
      </View>
    )
  }
}

// redux
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
};


const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    // this.state = {
      
    //   // dishes: DISHES,
    //   // comments: COMMENTS,
    //   favorites: []
    // };
  }
    
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      showModal: false,
      author: '',
      rating: 5,
      comment: ''
    });
  }

  handleComment(dishId) {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }
      
  render() {
    const dishId = parseInt(this.props.route.params.dishId);
    // const dish = this.state.dishes[dishId];
    // const comments = this.state.comments.filter((cmt) => cmt.dishId === dishId);
    const dish = this.props.dishes.dishes[dishId];
    const comments = this.props.comments.comments.filter((cmt) => cmt.dishId === dishId);
    const favorite = this.props.favorites.some((el) => el === dishId);
    return (
     <ScrollView>
       <RenderDish dish={dish} favorite={favorite} onPressFavorite={() => this.markFavorite(dishId)}/>
      <RenderComments comments={comments} />
     </ScrollView>
    );
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
}
class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()} />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
      </View>
    );
  };
}

class AddComments extends Component {

}


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);