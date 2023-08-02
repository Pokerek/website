import { useRef, useState } from 'react';

import './carousel.scss';
import useSwipe from './useSwipe';

interface CarouselProps {
    elements: JSX.Element[];
    isDots?: boolean;
    isActions?: boolean;
}

const Carousel = ({ elements, isDots, isActions }: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const element = useRef<HTMLDivElement>(null);
    const {
        isSwiping,
        moveX,
        handleTouchStart,
        handleTouchMove,
        handleMouseDown,
        handleMouseMove,
        swipeEnd,
    } = useSwipe(element);

    const length = elements.length;
    const elementWidth = element.current?.clientWidth || 0;
    const position = -currentSlide * elementWidth + moveX;

    const handleMoveEnd = () => {
        const direction = swipeEnd();

        if (direction === -1 && currentSlide !== 0) {
            setCurrentSlide(currentSlide - 1);
        }

        if (direction === 1 && currentSlide !== length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }

    return (
        <div className="carousel">
            <div className="carousel__container">
                <div
                    className={`carousel__inner${isSwiping ? ' swiping' : ''}`}
                    style={{
                        transform: `translateX(${position}px)`,
                    }}
                    ref={element}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMoveEnd}
                    onTouchCancel={handleMoveEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMoveEnd}
                    onMouseLeave={handleMoveEnd}
                >
                    {
                        elements.map((element, index) => {
                            return (
                                <div
                                    className="carousel__item"
                                    key={index}
                                >
                                    {element}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            {
                isDots && <div className="carousel__dots">
                    {
                        elements.map((_, index) => {
                            return (
                                <div
                                    className={`carousel__dot${index === currentSlide ? ' active' : ''}`}
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            );
                        })
                    }
                </div>
            }
            {
                isActions && <div className='carousel__actions'>
                    <button
                        className='carousel__btn left'
                        onClick={() => setCurrentSlide(currentSlide - 1)}
                        disabled={currentSlide === 0}
                    >
                        {"<"}
                    </button>
                    <button
                        className='carousel__btn right'
                        onClick={() => setCurrentSlide(currentSlide + 1)}
                        disabled={currentSlide === length - 1}
                    >
                        {">"}
                    </button>
                </div>
            }
        </div >
    );
}

export default Carousel;
