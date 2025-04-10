import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const PulseSkeleton = ({ style, className }: any) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 0.3,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                { opacity: pulseAnim },
                style,
            ]}
            className={`bg-gray-200 ${className}`}
        />
    );
};


export default PulseSkeleton;