import { useState } from 'react';

import './carousel.scss';

interface CarouselProps {
    elements: JSX.Element[];
}

const Carousel = ({ elements }: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const length = elements.length;

    return (
        <div className="carousel">
            <div className="carousel__container">
                <div
                    className="carousel__inner"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {
                        elements.map((element, index) => {
                            return (
                                <div className="carousel__item" key={index}>
                                    {element}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className='carousel__actions'>
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
        </div>
    );
}

export default Carousel;
