import React from 'react';
import { Box, styled } from '@mui/material';
import { keyframes } from '@emotion/react';
import {
  School,
  AutoStories,
  Create,
  MenuBook,
  LocalLibrary,
  StickyNote2,
  Assignment,
  Calculate,
  FormatQuote,
  EmojiObjects
} from '@mui/icons-material';

// Define animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const floatAnimationReverse = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(15px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

// Styled component for floating elements
const FloatingElement = styled(Box)(({ delay = 0, duration = 5, reverse = false }) => ({
  position: "absolute",
  zIndex: 0,
  opacity: 0.5,
  animation: `${reverse ? floatAnimationReverse : floatAnimation} ${duration}s ease-in-out infinite ${delay}s`,
}));

// Element definitions
const elementTypes = [
  {
    icon: School,
    color: "rgba(99, 102, 241, 0.6)",
    size: 40
  },
  {
    icon: AutoStories,
    color: "rgba(99, 102, 241, 0.5)",
    size: 50
  },
  {
    icon: Create,
    color: "rgba(79, 70, 229, 0.4)",
    size: 35
  },
  {
    icon: MenuBook,
    color: "rgba(99, 102, 241, 0.5)",
    size: 45
  },
  {
    icon: LocalLibrary,
    color: "rgba(99, 102, 241, 0.6)",
    size: 40
  },
  {
    icon: StickyNote2,
    color: "rgba(79, 70, 229, 0.4)",
    size: 35
  },
  {
    icon: Assignment,
    color: "rgba(99, 102, 241, 0.5)",
    size: 40
  },
  {
    icon: Calculate,
    color: "rgba(99, 102, 241, 0.4)",
    size: 35
  },
  {
    icon: FormatQuote,
    color: "rgba(99, 102, 241, 0.5)",
    size: 30
  },
  {
    icon: EmojiObjects,
    color: "rgba(99, 102, 241, 0.6)",
    size: 38
  }
];

// Default positions for elements
const defaultPositions = [
  { top: "10%", left: "5%", rotation: -15 },
  { top: "15%", right: "10%", rotation: 10 },
  { bottom: "20%", left: "15%", rotation: 5 },
  { bottom: "30%", right: "5%", rotation: -10 },
  { top: "60%", left: "30%", rotation: 8 },
  { top: "40%", right: "25%", rotation: -5 },
  { bottom: "15%", right: "20%", rotation: 12 },
  { top: "25%", left: "20%", rotation: -8 }
];

/**
 * FloatingElements component adds animated educational elements to any page
 * 
 * @param {Object} props
 * @param {number} props.count - Number of elements to display (default: 6)
 * @param {boolean} props.dense - If true, shows more elements closer together
 * @param {string} props.zIndex - z-index for the elements (default: "0")
 * @param {Object} props.customPositions - Custom positions to override defaults
 */
const FloatingElements = ({ 
  count = 6, 
  dense = false,
  zIndex = "0",
  customPositions = []
}) => {
  // Limit count to available elements
  const elementCount = Math.min(count, elementTypes.length);
  
  // Choose random elements if not enough are provided
  const elements = elementTypes.slice(0, elementCount);
  
  // Use custom positions or defaults
  const positions = customPositions.length >= elementCount 
    ? customPositions.slice(0, elementCount) 
    : defaultPositions.slice(0, elementCount);

  return (
    <>
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          sx={{
            top: positions[index].top,
            left: positions[index]?.left,
            right: positions[index]?.right,
            bottom: positions[index]?.bottom,
            transform: `rotate(${positions[index].rotation}deg)`,
            zIndex:5
          }}
          delay={index * 0.5}
          duration={5 + index * 0.5}
          reverse={index % 2 === 0}
        >
          <element.icon 
            sx={{ 
              fontSize: element.size, 
              color: element.color 
            }} 
          />
        </FloatingElement>
      ))}
    </>
  );
};

export default FloatingElements; 