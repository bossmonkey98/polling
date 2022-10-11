import { View,Text, FlatList, Pressable ,TouchableOpacity } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'

const Home = () => {
  const url: string = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=`
  const [pageNo, setPageNo] = React.useState<number | any>(0)
  const [data, setData] = React.useState<[]|any>([])
  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Home'>>()
  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}${pageNo}`)
      setData([...data, ...res?.data?.hits])
    } catch (e) {
      alert("api error")
    }
  }

  React.useEffect(() => {
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 10000)
    return clearInterval(interval)
  }, [pageNo])
  
  const increasePageNO = () => {
    setPageNo(pageNo + 1)
    console.warn(pageNo)
  }
  
  return (
    <View style={s`h-full p-2`} >
      <View style={s`w-full flex-row justify-between m-0`}>
        <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>URL</Text>
        <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>Title</Text>
        <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>Created At</Text>
        <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>Author</Text>
      </View>
      <View style={s`flex-1`} >
        <FlatList data={data}
          onEndReachedThreshold={0.8}
          onEndReached ={increasePageNO}
          renderItem={({ item }: any) => <Pressable style={s`w-full flex-row justify-between m-0`} onPress={() => {
            navigator.navigate('RawJSON',{data:item})
          }}>
            <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>{item?.url}</Text>
            <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>{item?.title}</Text>
            <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>{item?.created_at}</Text>
            <Text style={s`h-20 flex-1  text-center text-vertical-center bg-indigo-100 border`}>{item?.author}</Text>
          </Pressable>} />
        </View>
    </View>
  )
}



export default Home