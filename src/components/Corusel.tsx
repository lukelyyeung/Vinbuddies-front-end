import * as React from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

interface Slide {
    src?: string;
    altText?: string;
    caption?: string;
}

interface SlideShowState {
    activeIndex: number;
    animating: boolean;
}

interface SlideShowProps {
    items: Slide[];
}

export class SlideShow extends React.Component<SlideShowProps, SlideShowState> {
    constructor(props: SlideShowProps) {
        super(props);
        this.state = {
            activeIndex: 0,
            animating: false
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.setState({ animating: false });
    }

    onExited() {
        this.setState({ animating: false });
    }

    next() {
        if (this.state.animating) {
            return;
        }
        const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.state.animating) {
            return;
        }
        const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex: number) {
        if (this.state.animating) {
            return;
        } 
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex } = this.state;

        const slides = this.props.items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img className="img-fluid img-thumbnail thumbnail" src={item.src} alt={item.altText} />
                    {item.caption ?
                        (<CarouselCaption captionText={item.caption} captionHeader={item.caption} />) :
                            null}
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators 
                    items={this.props.items} 
                    activeIndex={activeIndex} 
                    onClickHandler={this.goToIndex} 
                />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
}