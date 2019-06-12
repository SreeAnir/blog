import { AsyncStorage } from 'react-native'

export async function setData(key, value) {
    console.log(key)
    console.log(value)
    try{
        await AsyncStorage.setItem(key, JSON.stringify(value));           
    }catch(error) {
        console.log(error)
    }   
}

export async function fetchData(key) {

    var data = null
    try {
        data = await AsyncStorage.getItem(key)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    return data;
}

export async function removeData(key) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.log(error)
    }
}