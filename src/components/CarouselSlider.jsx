import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper, {} from 'react-native-swiper';
// create json data about theaters movies


const CoverflowExample = ({Theater}) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      loop={true}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
    >
      {Theater.map((item, index) => {
        return (
     <TouchableOpacity key={index} style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'gray'}}>
                <Text style={{color:'#fff', fontSize:30,fontWeight:'bold'}}>{item.name}</Text>
          </TouchableOpacity>    
        )
      })}
      {/* <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'gray'}}>
        <Text style={{color:'#fff', fontSize:30,fontWeight:'bold'}}>Slide 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'gray'}}>
        <Text style={{color:'#fff', fontSize:30,fontWeight:'bold'}}>Slide 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'gray'}}>
        <Text style={{color:'#fff', fontSize:30,fontWeight:'bold'}}>Slide 3</Text>
      </TouchableOpacity> */}
    </Swiper>
  );
};

const styles = StyleSheet.create({
 
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default CoverflowExample;
