import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { ScreenParamTypes } from '../App'
import {s} from 'react-native-wind'

const RawJson = () => {
  const { params: { data } } = useRoute<RouteProp<ScreenParamTypes, 'RawJSON'>>()
  return (
    <ScrollView style={s`h-full m-5 font-size-18`}>
      <Text>{JSON.stringify(data,null,2)}</Text>
    </ScrollView>
  )
}

export default RawJson