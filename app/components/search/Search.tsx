import React from 'react';
import {Dimensions, TextInput, View} from 'react-native';
import {IconSeach} from '../../assets/index';
import { caladeaReguler, ramarajaReguler } from '../../assets/fonts/FontFamily';

const {height} = Dimensions.get('window');

interface SearchComponentProps {
  setFiltered: (data: any[]) => void;
  data: any[];
  filterKey: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  setFiltered,
  data,
  filterKey,
}) => {
  const handleInputChange = (text: string) => {
    if (text) {
      const filteredData = data.filter(item =>
        item[filterKey].toLowerCase().includes(text.toLowerCase()),
      );
      setFiltered(filteredData);
    } else {
      setFiltered(data);
    }
  };

  return (
    <View style={{width: '100%', alignItems: 'center', marginTop: 15}}>
      <View
        style={{
          width: '90%',
          height: height * 0.07,
          backgroundColor: '#F3F4F6',
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '10%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconSeach />
        </View>
        <View style={{width: '90%'}}>
          <TextInput
            style={{
              fontSize: height * 0.022,
              paddingLeft: 8,
              paddingRight: 8,
              color: 'black',
            }}
            placeholder="Cari Pengaduan"
            onChangeText={handleInputChange}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchComponent;
