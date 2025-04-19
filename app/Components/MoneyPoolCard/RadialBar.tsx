import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type RadialBarProps = {
  size: number;
  strokeWidth: number;
  progress: number;
  backgroundColor?: string;
  progressColor?: string;
  textColor?: string;
};

export default function RadialBar({
  size,
  strokeWidth,
  progress,
  backgroundColor = '#E0E0E0',
  progressColor = '#4CAF50',
  textColor = 'black',
}: RadialBarProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Calculate radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Calculate stroke dashoffset to create progress effect
  const strokeDashoffset =
    circumference - (clampedProgress / 100) * circumference;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={'grey'}
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Centered Text */}
      <View className="absolute items-center justify-center">
        <Text className="text-lg font-bold" style={{ color: textColor }}>
          {`${clampedProgress}%`}
        </Text>
      </View>
    </View>
  );
}

// Example usage:
// <RadialBar
//   size={200}
//   strokeWidth={15}
//   progress={75}
//   backgroundColor="#E0E0E0"
//   progressColor="#4CAF50"
//   textColor="black"
// />
