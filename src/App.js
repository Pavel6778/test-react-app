import React, {Component} from 'react';
import {connect} from 'react-redux';
import InfiniteCalendar, {
    Calendar,
    withMultipleDates,
    defaultMultipleDateInterpolation,
    withRange,
} from 'react-infinite-calendar';
import moment from 'moment';
import 'react-infinite-calendar/styles.css';
import './App.css';
import 'normalize.css';

import {clearImages, deleteImage, loadImagesRequest} from "./redux/modules/images/reducer";

class App extends Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            images: nextProps.images,
        };
    }

    state = {
        selectedMultiple: [],
        selectedRage: {
            start: null,
            end: null,
        },
        maxDate: new Date(),
        isMultiple: true,
        images: [],
    };

    handleClick = () => {
        this.props.clearImages();
        return this.setState({
            isMultiple: !this.state.isMultiple,
            selectedMultiple: [],
            selectedRage: {
                start: null,
                end: null,
            }
        });
    };

    selectDay = (day) => {
        const dayFormat = moment(day).format('YYYY-MM-DD');
        const selectedMultiple = this.state.selectedMultiple;
        const idx = selectedMultiple.indexOf(dayFormat);
        if (idx !== -1) {
            selectedMultiple.splice(idx, 1);
            this.props.deleteImage(dayFormat);
            return this.setState({selectedMultiple: selectedMultiple});
        }
        this.props.loadImagesRequest(dayFormat);
        this.setState({
            selectedMultiple: [...this.state.selectedMultiple, dayFormat]
        });
    };

    selectRange = (range) => {
        if (range.eventType === 3) {
            this.props.clearImages();

            const start = moment(range.start);
            const end = moment(range.end);
            const duration = moment.duration(end.diff(start)).asDays();

            for (let i = 0; i <= duration; i++) {
                this.props.loadImagesRequest(moment(start).add(i, 'days').format('YYYY-MM-DD'));
            }

            this.setState({selectedRage: range});
        }
    };

    render() {
        const MultipleCalendar = ({}) => {
            return (
                <InfiniteCalendar
                    Component={withMultipleDates(Calendar)}
                    width={400}
                    height={600}
                    selected={this.state.selectedMultiple}
                    onSelect={this.selectDay}
                    interpolateSelection={defaultMultipleDateInterpolation}
                    maxDate={this.state.maxDate}
                />
            )
        };

        const RangeCalendar = ({}) => {

            return (
                <InfiniteCalendar
                    Component={withRange(Calendar)}
                    selected={this.state.selectedRage}
                    onSelect={this.selectRange}
                    maxDate={this.state.maxDate}
                />
            )
        };

        return (
            <div className={'wrapper'}>
                <div className={'calendar-wrapper'}>
                    <button className={'button-change-calendar'} onClick={this.handleClick}>Change multiple</button>
                    {this.state.isMultiple ? <MultipleCalendar/> : <RangeCalendar/>}
                </div>
                <div className={'photo-wrapper'}>
                    {this.state.images.map((image) => (
                        <div key={image.date} className={'photo-wrapper-item'}>
                            <img src={image.url}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.images.error,
    images: state.images.entities,
});

const mapDispatchToProps = {
    loadImagesRequest,
    clearImages,
    deleteImage
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
