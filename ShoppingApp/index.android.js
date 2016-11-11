    import React, {
      Component
    } from 'react';
    import {
      AppRegistry,
      StyleSheet,
      ListView,
      Text,
      TouchableOpacity,
      View,
      Image,
      TextInput
    } from 'react-native';

    var ds_new = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })

    let products = [
                {
                    "category": "electronics",
                    "name":"Nexus 6",
                    "price": 3500,
                    "brand": "LG",
                    "sku": "SD2014-CF-P",
                    "image_url": "https://rukminim1.flixcart.com/image/832/832/mobile/m/v/z/motorola-nexus-6-original-imaefwsvf42tsb4x.jpeg?q=70"
                },
                {
                    "category": "electronics",
                    "name":"Apple Watch",
                    "price": 6000,
                    "brand":"Apple",
                    "sku":"SD2015-CF-P",
                    "image_url": "https://rukminim1.flixcart.com/image/832/832/smartwatch/z/t/h/mj3t2hn-a-apple-original-imaect6cuvgzbhxt.jpeg?q=70"
                },
                {
                    "category": "electronics",
                    "name":"Havels Switch",
                    "price": 120,
                    "brand":"Havels",
                    "sku":"SD2016-CF-P",
                    "image_url": "https://rukminim1.flixcart.com/image/832/832/electrical-switch/z/p/9/bell-switch-905-le-figaro-original-imaeegthnphcgggg.jpeg?q=70"
                },
                {
                    "category": "electronics",
                    "name":"Laser Mouse",
                    "price": 450,
                    "brand":"Logitech",
                    "sku":"SD2017-CF-P",
                    "image_url": "https://rukminim1.flixcart.com/image/832/832/mouse/b/j/g/logitech-b175-original-imae8gb4z8hshfc3.jpeg?q=70"
                },
                {
                    "category": "electronics",
                    "name":"Mini Keyboard",
                    "price": 850,
                    "brand":"Logitech",
                    "sku":"SD2018-CF-P",
                    "image_url": "https://rukminim1.flixcart.com/image/832/832/keyboard/laptop-keyboard/g/9/z/logitech-mk240-nano-original-imaez2djyy5pxxyj.jpeg?q=70"
                },
                {
                    "category": "clothing",
                    "name":"Tracks",
                    "price": 120,
                    "brand":"Nike",
                    "sku":"SD2019-CF-P",
                    "image_url": "https://rukminim1.flixcart.com/image/832/832/track-pant/f/z/y/83188618-scooter-puma-m-original-imaehb744ckeyavz.jpeg?q=70"
                },
                {
                    "category": "clothing",
                    "name":"Suit",
                    "price": 120,
                    "brand":"Puma",
                    "sku":"SD2020-CF-P",
                    "image_url": "https://rukminim1.flixcart.com/image/832/832/blazer/x/z/v/nl-ince-blbq28l-blackberrys-46-original-imaeju2hwhrthgzq.jpeg?q=70"
                }
            ]

    /*var getProductNames = function(products) {
      var product_names = [];
      for(var i=0; i<products.length; i++)
        let product = products[key];
        product_names.push(product.name);
      }
      return product_names;
    }*/

    export default class ShoppingApp extends Component {

      constructor() {
        super();
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
          dataSource: ds.cloneWithRows(products),
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

        var openPopup = () => {
        return(
          <View>
          <Text>Hello</Text>
          </View>
        )
        }

        return (
          <TouchableOpacity onPress={openPopup}>
          <View style={styles.container}>
          <Image
          source={{uri: rowData.image_url}}
          style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
          <Text style={styles.title}>{rowData.name}</Text>
          </View>
          </View>
          </TouchableOpacity>
        );
      }

      setSearchText(event) {
        var rows = [];
         var searchText = event.nativeEvent.text;
         var search_prod = []
         for(var i=0; i<products.length; i++) {
            if(products[i].name.toLowerCase().search(searchText.toLowerCase()) !== -1){
              rows.push(products[i]);
            }
         }
          this.setState({dataSource:ds_new.cloneWithRows( rows ) });
      }

      render() {
        return (
          <View>
          <TextInput
         style={styles.searchBar}
         value={this.state.searchText}
         onChange={this.setSearchText.bind(this)}
         placeholder='Search' />   

          <ListView tabLabel="ITEMS"
          dataSource={this.state.dataSource}
          renderRow={this.renderItems}
          style={styles.listView}
          />
          </View>
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
        padding: 10
      },
      rightContainer: {
        flex: 1,
      },
      thumbnail: {
        width: 80,
        height: 100,
      },
      title: {
        fontSize: 20,
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