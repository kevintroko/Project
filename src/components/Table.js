import React, { Component } from 'react';
import '../css/List.css';

function ColumnHeader(name){
	return (<th scope="col">{name}<i className="material-icons vertical-align-middle padding-bottom-3">arrow_drop_down</i></th>);
}

function ColumnRow(data){

	let arrData = Object.values(data);
	let row = [];
	if(data){
		for(var i=0; i<arrData.length; i++){
			row.push(RowData(arrData[i]));
		}
	}
	return (
		<tr>
			{row}
			<td><i className="material-icons vertical-align-middle padding-bottom-3">delete</i></td>
		</tr>
	);
}

function RowData(data){
	return (<td>{data}</td>);
}

export class Table extends Component{
	// constructor(props){
	// 	super(props);
	// }
	render(){
		//column headers
		let cols = [];
		if(this.props.cols){
			for (var i=0; i < this.props.cols.length; i++){
				cols.push(ColumnHeader(this.props.cols[i]));
			}
		}
		//fill data
		let rows = [];
		if(this.props.data){
			for(var j=0; j < this.props.data.length; j++){
				rows.push(ColumnRow(this.props.data[j]));
			}
		}

		return(
			<table className="table">
				<thead>
					<tr className="table-row">
						{cols}
							{ColumnHeader()}
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}
