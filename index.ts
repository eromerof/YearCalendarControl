import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import { YearCalendar, Event } from './Controls/YearCalendarControl';
import * as ReactDOM from 'react-dom';
import * as React from 'react';


export class YearCalendarControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	private Language?: string = undefined;
	private StartDateFieldName: string = "erf_startdate";
	private EndDateFieldName: string = "erf_enddate";
	private DescriptionFieldName: string = "erf_description";


	private container: HTMLDivElement;
	private context: ComponentFramework.Context<IInputs>;

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		// Add control initialization code
		this.container = container;
		this.context = context;
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		// Add code to update control view


		let Events: Event[];
		Events = [];
		let CurrentRecords = context.parameters.CurrentDataSet.records;
		context.parameters.CurrentDataSet.sortedRecordIds.forEach(o =>
			Events.push({
				id: o,
				name: CurrentRecords[o].getValue(this.DescriptionFieldName).toString(),
				startDate: new Date(CurrentRecords[o].getValue(this.StartDateFieldName).toString()),
				endDate: new Date(CurrentRecords[o].getValue(this.EndDateFieldName).toString())
			})
		);



		let props = {
			Language: this.Language,
			Events: Events
		};
		ReactDOM.render(React.createElement(YearCalendar, props), this.container);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}

}