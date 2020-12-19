import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import {  } from './HoverCardControl';
import { HoverCard, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
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

  const onRenderCompactCard = (): JSX.Element => {
    return (
      <div className={classNames.compactCard}>
        <a target="_blank" href={`http://wikipedia.org/wiki/Sonseca`}>
          Sonseca
        </a>
      </div>
    );
  };
  const onRenderExpandedCard = (): JSX.Element => {
    return (
      <div>
      </div>
    );
  };

export interface HoverCardOptions {
   element:HTMLTableDataCellElement;

}
export const HoverCardControl:React.FunctionComponent = () => {
    // const{element} = this.state;
    const expandingCardProps: IExpandingCardProps = {
        onRenderCompactCard: onRenderCompactCard,
         onRenderExpandedCard: onRenderExpandedCard,
      };
     return (
         
             <HoverCard expandingCardProps={expandingCardProps} instantOpenOnClick={true}>
               {/* {element} */}
             </HoverCard>
            
          )};
    // constructor(props:{element:HTMLTableDataCellElement}){
    //     super(props);
    //     this.state={
    //         element: props.element
    //     };

    // }

    // public render(): JSX.Element {
    //     const{element} = this.state;
    //     const expandingCardProps: IExpandingCardProps = {
    //         onRenderCompactCard: onRenderCompactCard,
    //          onRenderExpandedCard: onRenderExpandedCard,
    //       };
    //     return (
    //         <div>{element}</div>
    //         // <HoverCard expandingCardProps={expandingCardProps} instantOpenOnClick={true}>
    //         //    {element}
    //         //     </HoverCard>
            
    //       );
//     }



// }