import React, { useState } from 'react'
import './index.less'

const CarouselLeftArrow = (props) => {
    return (
        <button
            type="button"
            className="carousel__arrow carousel__arrow--left"
            onClick={props.onClick}
        >
        </button>
    );
}

const CarouselRightArrow = (props) => {
    return (
        <button
            type="button"
            className="carousel__arrow carousel__arrow--right"
            onClick={props.onClick} aria-label="next">
            Next
        </button>
    );
}

const CarouselIndicator = (props) => {
    return (
        <li>
            <button
                type="button"
                className={
                    props.index === props.activeIndex
                        ? "carousel__indicator carousel__indicator--active"
                        : "carousel__indicator"
                }
                onClick={props.onClick}
            ></button>
        </li>
    );
}

const CarouselSlide = (props) => {
    return (
        <li
            className={
                props.index === props.activeIndex
                    ? "carousel__slide carousel__slide--active"
                    : "carousel__slide"
            }
        >
            <img src={props.slide} alt={props.alt} />
        </li>
    );
}

// Carousel wrapper component
export const ImageCarousel = (props) => {
    const [activeIndex, setAcriveIndex] = useState(0)

    const goToSlide = (index) => {
        setAcriveIndex(index)
    }

    const goToPrevSlide = (e) => {
        e.preventDefault();

        let index = activeIndex;
        let { slides } = props;
        let slidesLength = slides.length;

        if (index < 1) {
            index = slidesLength;
        }

        --index;
        setAcriveIndex(index)
    }

    const goToNextSlide = (e) => {
        e.preventDefault();

        let index = activeIndex;
        let { slides } = props;
        let slidesLength = slides.length - 1;

        if (index === slidesLength) {
            index = -1;
        }

        ++index;

        setAcriveIndex(index)
    }

    return (
        <div className="carousel">
            <CarouselLeftArrow onClick={e => goToPrevSlide(e)} />

            <ul className="carousel__slides">
                {props.slides.map((slide, index) =>
                    <CarouselSlide
                        key={index}
                        index={index}
                        activeIndex={activeIndex}
                        slide={slide}
                        alt={props.alt}
                    />
                )}
            </ul>

            <CarouselRightArrow onClick={e => goToNextSlide(e)} />

            <ul className="carousel__indicators">
                {props.slides.map((slide, index) =>
                    <CarouselIndicator
                        key={index}
                        index={index}
                        activeIndex={activeIndex}
                        isActive={activeIndex === index}
                        onClick={e => goToSlide(index)}
                    />
                )}
            </ul>
        </div>
    );
}