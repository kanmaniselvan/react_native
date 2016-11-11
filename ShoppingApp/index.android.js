    import React, {
      Component
    } from 'react';
    import {
      AppRegistry,
      StyleSheet,
      ListView,
      Text,
      TouchableOpacity,
      View
    } from 'react-native';


    let products = {
      "SD2014-CF-P": {
        "category": "electronics",
        "name": "Nexus 6",
        "price": 3500,
        "brand": "LG",
        "sku": "SD2014-CF-P"
      },
      "SD2015-CF-P": {
        "category": "electronics",
        "name": "Apple Watch",
        "price": 6000,
        "brand": "Apple",
        "sku": "SD2015-CF-P"
      },
      "SD2016-CF-P": {
        "category": "electronics",
        "name": "Havels Switch",
        "price": 120,
        "brand": "Havels",
        "sku": "SD2016-CF-P"
      },
      "SD2017-CF-P": {
        "category": "electronics",
        "name": "Laser Mouse",
        "price": 450,
        "brand": "Logitech",
        "sku": "SD2017-CF-P"
      },
      "SD2018-CF-P": {
        "category": "electronics",
        "name": "Mini Keyboard",
        "price": 850,
        "brand": "Logitech",
        "sku": "SD2018-CF-P"
      },
      "SD2019-CF-P": {
        "category": "clothing",
        "name": "Tracks",
        "price": 120,
        "brand": "Nike",
        "sku": "SD2019-CF-P"
      },
      "SD2020-CF-P": {
        "category": "clothing",
        "name": "Swim Suit",
        "price": 120,
        "brand": "Puma",
        "sku": "SD2020-CF-P"
      }
    }

    var getProductNames = function(products) {
      var product_names = [];
      for (let key in products) {
        let product = products[key];
        product_names.push(product.name);
      }
      return product_names;
    }

    export default class ShoppingApp extends Component {

      constructor() {
        super();
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
          dataSource: ds.cloneWithRows(getProductNames(products)),
        }
      }

      // Filter Products By matching name and then set the state
      // for App with the filtered products.
      filterProductsByName(search_text) {
        let products = {};
        for (let key in this.props.products) {
          let product = this.props.products[key];
          let matched_name = product.name.match(new RegExp(".*?" + search_text + ".*?", "i"));
          if (matched_name != [''] && matched_name != null) {
            products[key] = product
          } else if (search_text == '') {
            products[key] = product
          }
        }

        this.setState({
          products: products,
          cart_product: undefined
        })
      }

      // Whenever a add to cart button is clicked, this will update the cart_product
      // state of App component to the clicked product.
      updateCartProducts(product_sku) {
        let cart_product;

        for (let key in this.props.products) {
          let product = this.props.products[key]
          if (product.sku == product_sku) {
            cart_product = product;
            break;
          }
        }

        this.setState({
          cart_product: cart_product
        })
      }


      renderItems(rowData) {
        return (
          <TouchableOpacity onPress={this.openPopup}>
          <View style={styles.container}>
         
          <Text style={styles.title}>{rowData}</Text>
          </View>
          </TouchableOpacity>
        );
      }


      openPopup() {
        Alert.alert(
          'Alert Title',
          'Alert', [{
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed')
          }, {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: 'OK',
            onPress: () => console.log('OK Pressed')
          }, ]
        );
      }


      render() {
        return (
          <ListView tabLabel="ITEMS"
          dataSource={this.state.dataSource}
          renderRow={this.renderItems}
          style={styles.listView}
          />
        );
      }


    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      rightContainer: {
        flex: 1,
      },
      thumbnail: {
        width: 53,
        height: 81,
      },
      title: {
        fontSize: 40,
        marginBottom: 15,
        padding: 20,
        textAlign: 'center',
      },
      listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
      },
      year: {
        textAlign: 'center',
      },
      about: {
        fontSize: 20,
      }
    });


    AppRegistry.registerComponent('ShoppingApp', () => ShoppingApp);