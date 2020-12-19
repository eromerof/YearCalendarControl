var Calendar = require('rc-year-calendar');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HoverCardControl, HoverCardOptions } from './HoverCardControl';


export interface CalendarOptions {
    Language?: string,
    Events: Event[]

}
export interface Event {
    id: string,
    name: string,
    startDate: Date,
    endDate: Date
}

export class YearCalendar extends React.Component<{ Events: Event[], Language?: string }, CalendarOptions> {
    constructor(props: { Events: Event[], Language?: string }) {
        super(props);
        if (props.Language !== undefined)
            require('rc-year-calendar/locales/rc-year-calendar.' + props.Language);
        this.state = {
            Language: props.Language,
            Events: props.Events
        };
    }
    public render(): JSX.Element {
        const { Language, Events } = this.state;
        return (<Calendar dataSource={Events} onDayEnter={this.OnDayClick} language={Language}></Calendar>);
    }

    private OnDayClick(CurrentElement: any) {
        // let props:HoverCardOptions={
        //     element: CurrentElement.element
        // };
        // let day = CurrentElement.date.getDate()
        //  debugger;
          ReactDOM.render(React.createElement(HoverCardControl), CurrentElement.element);
    }
}


// export const YearCalendar: React.FunctionComponent = () => {
//     return (<Calendar></Calendar>);};