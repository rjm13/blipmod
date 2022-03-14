import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { format, parseISO } from "date-fns";



const PendingStories = ({navigation} : any) => {

  const [pendingstories, setPendingStories] = useState([
    {
      id: 1,
      title: 'The Poo that Peed',
      time: 800000,
      createdAt: new Date()
    }
  ])

  const Item = ({id, title, time, createdAt} : any) => {

    function millisToMinutesAndSeconds () {
      let minutes = Math.floor(time / 60000);
      let seconds = Math.floor((time % 60000) / 1000);
      return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  } 

    return (
      <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row', borderRadius: 8, backgroundColor: '#555555', width: Dimensions.get('window').width - 40, padding: 20, margin: 20}}>
          <View>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              {title}
            </Text>
            <Text style={{color: '#ffffffa5', fontSize: 12, marginTop: 10}}>
              {format(createdAt, 'PPPPpp')}
            </Text>
          </View>
          <Text style={{color: '#fff'}}>
            {millisToMinutesAndSeconds ()}
          </Text>
        </View>
      </TouchableOpacity>
      
    );
  }

  const renderItem = ({item} : any) => {
    return (
      <Item 
        id={item.id}
        title={item.title}
        time={item.time}
        createdAt={item.createdAt}
      />
    )
  }


  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 40}}>
        <FlatList 
          data={pendingstories}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303030'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default PendingStories;
