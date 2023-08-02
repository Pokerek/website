import { useState } from 'react';

const useSwipe = (ref: React.RefObject<HTMLDivElement>) => {
    const [isSwiping, setIsSwiping] = useState(false);
    const [swipeStartX, setSwipeStartX] = useState(0);
    const [moveX, setMoveX] = useState(0);

    const elementWidth = ref.current?.clientWidth || 0;

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsSwiping(true);
        setSwipeStartX(e.targetTouches[0].clientX);
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isSwiping) return;
        const diff = e.targetTouches[0].clientX - swipeStartX;
        setMoveX(diff);
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsSwiping(true);
        setSwipeStartX(e.clientX);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isSwiping) return;
        const diff = e.clientX - swipeStartX;
        setMoveX(diff);
    }

    const swipeEnd = (): number => {
        const DIV = 4;
        setIsSwiping(false);
        setMoveX(0);

        if (moveX > elementWidth / DIV) {
            return -1;
        } else if (moveX < elementWidth / -DIV) {
            return 1;
        } else {
            return 0;
        }
    }

    return {
        isSwiping,
        moveX,
        handleTouchStart,
        handleTouchMove,
        handleMouseDown,
        handleMouseMove,
        swipeEnd,
    };
}

export default useSwipe;