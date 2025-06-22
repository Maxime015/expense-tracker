// ✅ Polyfill pour Web
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import SafeScreen from '../../components/SafeScreen'; 
import { COLORS } from "@/constants/colors.js";

const slides = [
  {
    title: 'Track Your Expenses and Income with Ease',
    message: 'Gain full control over your finances by recording every transaction in one simple place.',
    action: 'Get started',
    image: require('../../assets/images/a.png'),
  },
  {
    title: 'Understand Your Spending with Smart Analytics',
    message: 'Visualize your expenses and income with detailed charts to identify spending patterns.',
    action: 'Continue',
    image: require('../../assets/images/b.png'),
  },
  {
    title: 'Never Miss a Subscription Payment Again',
    message: 'Manage recurring payments with our calendar view and get reminders for upcoming bills.',
    action: 'Continue',
    image: require('../../assets/images/c.png'),
  },
  {
    title: 'All Your Financial Data in One Secure Place',
    message: 'Access your complete financial overview anytime, anywhere with our user-friendly interface.',
    action: 'Start managing',
    image: require('../../assets/images/d.png'),
  },
];

export default function LandingPage() {
  const { width, height } = useWindowDimensions();
  const [slide, setSlide] = useState(0);
  const swiper = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const contentOpacity = scrollX.interpolate({
    inputRange: slides.flatMap((_, i) => [i * width, i * width + width / 2]),
    outputRange: slides.flatMap(() => [1, 0.2]),
  });

  const handleButtonPress = (index) => {
    if (index === slides.length - 1) {
      router.push('/sign-in');
    } else {
      swiper.current.scrollBy(1, true);
    }
  };

  return (
    <SafeScreen>
      <Swiper
        ref={swiper}
        showsPagination={false}
        loop={false}
        onIndexChanged={setSlide}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        {slides.map(({ title, message, action, image }, index) => (
          <Animated.View key={index} style={[styles.slide, { opacity: contentOpacity }]}>
            <Image
              source={image}
              resizeMode="contain"
              style={{
                width: width * 0.9,
                height: height * 0.45,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            />
            <Text style={styles.slideTitle} adjustsFontSizeToFit numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.slideText}>{message}</Text>

            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(index)}>
              <Text style={styles.buttonText}>{action}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Swiper>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '6%',
    paddingBottom: '8%',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#0d0d0d',
    marginBottom: 12,
    textAlign: 'center',
  },
  slideText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0d0d0d',
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: '10%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
