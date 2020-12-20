import * as React from 'react';
import { Event } from "./YearCalendarControl";
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
// import {  } from './HoverCardControl';
import { HoverCard, IExpandingCardProps, HoverCardType, ExpandingCardMode } from 'office-ui-fabric-react/lib/HoverCard';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  compactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  expandedCard: {
    padding: '16px 24px',
  },
  item: {
    selectors: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  },
});




export interface HoverCardOptions {
  CurrentDate: Date;
  Events: Event[];
}
export class HoverCardControl extends React.Component<{ CurrentDate: Date, Events: Event[] }, HoverCardOptions> {
  constructor(props: { CurrentDate: Date, Events: Event[] }) {
    super(props);
    debugger;
    this.state = {
      CurrentDate: props.CurrentDate,
      Events: props.Events
    }
  }
  public render(): JSX.Element {
    const { CurrentDate, Events } = this.state;
    const expandingCardProps: IExpandingCardProps = {
      onRenderCompactCard: () => this.onRenderCompactCard(CurrentDate),
      onRenderExpandedCard: () => this.onRenderExpandedCard(Events),
      mode: ExpandingCardMode.compact,

    };

    return (<HoverCard
      expandingCardProps={expandingCardProps}
      instantOpenOnClick={true} >
      <div className={"day-content"}>{CurrentDate.getDate()}</div>
    </HoverCard>);
  }
  private onRenderCompactCard = (CurrentDate: Date): JSX.Element => {
    return (
      <div className={classNames.compactCard}>
        <b>
          {CurrentDate.toLocaleDateString()}
        </b>
      </div>
    );
  };

  private onRenderExpandedCard = (Events: Event[]): JSX.Element => {
    let Columns: IColumn[] = [
      { key: 'description', name: 'Description', fieldName: 'description', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'startDate', name: 'Start Date', fieldName: 'startdate', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'endDate', name: 'End Date', fieldName: 'enddate', minWidth: 100, maxWidth: 200, isResizable: true },
    ];
    let Items: any[] = [];
    Events.forEach(x =>
      Items.push({
        description: x.name,
        startdate: x.startDate.toLocaleString(),
        enddate: x.endDate.toLocaleString()
      })
    );
    return (
      <DetailsList columns={Columns}
        items={Items}
        disableSelectionZone={true}
        selectionMode={SelectionMode.none} />
    );
  };
}