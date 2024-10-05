import React, {useState, useRef, useEffect} from 'react';
import {View, FlatList, Image, Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

// Define the type for the image array
interface ImageData {
  id: string;
  src: any; // You can specify a more detailed type if using specific image imports
}

interface ImageSliderProps {
  images: ImageData[]; // Array of image objects passed as props
}

const ImageSlider: React.FC<ImageSliderProps> = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const totalImages = images.length;

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex(prevIndex => {
        let nextIndex = prevIndex + 1;
        console.log(nextIndex);
        
        if (nextIndex === totalImages) {
          flatListRef.current?.scrollToIndex({index: 0, animated: false});
          nextIndex = 0; // Reset to real first index immediately
        } else {
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [totalImages]);

  const onViewRef = useRef(({viewableItems}: {viewableItems: any[]}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const renderPaginationDots = () => {
    return (
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: activeIndex === index ? '#444444' : '#000000',
                width: activeIndex === index ? 40 : 8,
                opacity:activeIndex === index ? 1 : 0.5,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        data={images}
        ref={flatListRef}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image source={item.src} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 250,
  },
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#ddd',
  },
});

export default ImageSlider;
