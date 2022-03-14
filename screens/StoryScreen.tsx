import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity, 
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    RefreshControl,
    Image,
    TextInput,
    ActivityIndicator,
    Share
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { format, parseISO } from "date-fns";

//import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';
//import { getStory, getUser, listComments, listPinnedStories, listRatings, listStoryTags, listFinishedStories } from '../src/graphql/queries';
//import { createComment, createFlag, createRating, updateRating, updateStory } from '../src/graphql/mutations';



const StoryScreen  = ({navigation} : any) => {


//recieve story ID as props
    const route = useRoute();
    const {storyID} = route.params;

//use storyID to retrieve Story from AWS
    const [Story, setStory] = useState({
        id: 1,
        imageUri: 'test',
        title: 'test',
        time: 100000,
        genre: {
            icon: 'poo',
            genre: 'Comedy'
        },
        artistName: 'test',
        author: 'test',
        narrator: 'test',
        description: 'test',
        summary: 'test',
        artistID: 1,
        narratorID: 2,
        userID: 3,

    });

//set global state context to the storyID to play the story
    const onPlay = () => {console.log('play')}

//get the story attributes using the storyID
    // useEffect(() => {
    //     const fetchStory = async () => {
    //         try {
    //             const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

    //             if (storyData) {
    //                 setStory(storyData.data.getStory);
    //                 let response = await Storage.get(storyData.data.getStory.imageUri);
    //                 setImageU(response);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }}
    //     fetchStory();
    // }, [storyID])

    const [imageU, setImageU] = useState('')

//convert time to string
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(Story?.time / 60000);
        let seconds = Math.floor((Story?.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

//tags flatlist data
      const [Tags, setTags] = useState([])

    //   useEffect(() => {

    //     const fetchTags = async () => {

    //     let storytag = storyID

    //     let tags = []
    
    //     const result = await API.graphql(graphqlOperation(
    //         listStoryTags, {
    //             filter: {
    //                 storyID: {
    //                     eq: storytag
    //                 }
    //             },
    //             //limit: 12
    //         }
    //       ))
    
    //       if (result) {
    //           for (let i = 0; i < result.data.listStoryTags.items.length; i++) {
    //               tags.push(result.data.listStoryTags.items[i].tag)
    //           }
    //         setTags(tags)
    //       }
    //     }
    //     fetchTags();
    //   }, [storyID])

    const Item = ({content, createdAt, userName, userImageUri}: any) => {

        return (
            <View style={{ marginVertical: 10, backgroundColor: '#132F35', borderRadius: 15}}>
    
                <View style={{ margin: 10, flexDirection: 'row'}}>
                    <View>
                       <Image 
                                source={ userImageUri ? { uri: userImageUri} : require('../assets/images/icon.png')}
                                style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray'}}
                        /> 
                    </View>
                    <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
                        <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                            {userName}
                        </Text>
                        <Text style={{color: '#ffffffa5', fontSize: 12}}>
                            {format(parseISO(createdAt), 'MMM Do yyyy')}
                        </Text>
                    </View>
                </View>
    
                <View>
                    <Text style={{ color: '#ffffff', marginBottom: 20, marginTop: 10, marginHorizontal: 20}}>
                        {content}
                    </Text>
                </View>
            </View>
        );
    }

    const Tag = ({id, tag}: any) => {
        return (
          <View style={{marginTop: 14}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('TagSearchScreen', {mainTag: id, tagName: tag})}>
                <View style={[styles.tagbox]}>
                    <Text style={styles.tagtext}>
                        #{tag}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    
      const renderTag = ({ item } : any) => (
    
        <Tag 
            id={item.id}
            tag={item.tagName}
        />
      );
    
    const ApproveStory = () => {

    }
        

    return (
        
            <View style={styles.container}>
                <ScrollView>

                <View style={{ alignItems: 'center', backgroundColor: '#000', flexDirection: 'row', paddingTop: 40, paddingBottom: 20, width: Dimensions.get('window').width, justifyContent: 'space-between'}}>    
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.goBack();}}>
                            <View style={ [styles.button, {backgroundColor: '#363636a5', flexDirection: 'row'}]}>
                                <AntDesign 
                                    name='close'
                                    size={22}
                                    color='#fff'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        <TouchableOpacity onLongPress={ApproveStory}>
                            <Text style={{color: 'cyan', marginRight: 20, paddingHorizontal: 20, paddingVertical: 6, borderRadius: 15, borderWidth: 0.5, borderColor: 'cyan'}}>
                                Approve
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <Image
                    source={{uri: imageU}}
                    style={{  backgroundColor: '#363636', width: Dimensions.get('window').width, height: Dimensions.get('window').width*0.75  }}
                />
                <View style={{}}>
                        <View style={{ backgroundColor: 'transparent', alignItems: 'flex-start'}}>
                            {Story?.imageUri ? (
                                <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.artistID, status: 'artist'})}>
                                    <View style={{marginLeft: 10, marginTop: 20,  alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#363636a5', flexDirection: 'row'}}>
                                        <FontAwesome5 
                                            name='palette'
                                            size={14}
                                            color='#fff'
                                            style={{marginRight: 10}}
                                        />
                                        <Text style={{color: '#fff'}}>
                                            {Story?.artistName}
                                        </Text>
                                    </View> 
                                </TouchableOpacity>
                            ) : null}
                        </View>
                            <View style={{  }}>
                                <View style={{ margin: 20, alignItems: 'center'}}>
                                    <Text style={styles.name}>
                                        {Story?.title}
                                    </Text>

                                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.userID, status: 'publisher'})}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-open'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.author}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.narratorID, status: 'narrator'})}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-reader'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.narrator}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                        <Text style={styles.username}>
                                            {Story?.summary}
                                        </Text>
                                    </View>

                                <View style={{marginTop: 16, height: 80}}>

                                    <FlatList
                                        data={Tags}
                                        extraData={Tags}
                                        renderItem={renderTag}
                                        horizontal={true}
                                        style={{width:  Dimensions.get('window').width, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}
                                        keyExtractor={(item) => item.id}
                                        initialNumToRender={8}
                                        showsHorizontalScrollIndicator={false}
                                        maxToRenderPerBatch={8}
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{fontSize: 15, textTransform: 'capitalize', textAlign: 'center', color: '#fff'}}>
                                                        {Story?.genre?.genre}
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                        ListEmptyComponent={() => {
                                            return (
                                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                    
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                
                                <View>
                                    <TouchableOpacity onPress={onPlay}>
                                        <View style={{paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                                <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                                    Play
                                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{color: '#ffffff', fontSize: 18}}>
                                        {millisToMinutesAndSeconds()}
                                    </Text>
                                </View>

                                <View style={{marginVertical: 20, marginHorizontal: 4, flex: 1 }}>
                                    <Text style={{color: '#fff', flexWrap: 'wrap', marginBottom: 10}}>
                                        {Story?.description}
                                    </Text>
                                </View>
                            </View>
                        </View>
                </View>
            </ScrollView>
            <StatusBar style='light' backgroundColor='#0000004D' />
            </View>
    );
}

const styles = StyleSheet.create ({
    container: {
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        color: '#ffffffCC',
        fontSize: 14,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    footer: {
        marginVertical: 0,
    },
    highlight: { 
        marginHorizontal: -10,
        color: '#ffffffCC',
        fontSize: 14,
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        width: 36,
        height: 36,
        marginHorizontal: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginRight: 30,
    },
    tagbox: {
        marginRight: 10   
      },
      tagtext: {
        color: 'cyan',
        fontSize: 14,
        backgroundColor: '#1A4851a5',
        borderColor: '#00ffffa5',
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
   
});

export default StoryScreen;
