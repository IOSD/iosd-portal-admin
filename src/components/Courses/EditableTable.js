import {EditableFormRow, EditableCell,EditableContext} from "./EditableFormRow";
import { Input, InputNumber, Popconfirm, Table ,Form , Button } from 'antd';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import uuid from 'uuid/v1' ;

import React  from "react";
import {findDOMNode} from 'react-dom';



// class BodyRow extends React.Component {
//     render() {
//         const {
//             isOver,
//             connectDragSource,
//             connectDropTarget,
//             moveRow,
//             dragRow,
//             clientOffset,
//             sourceClientOffset,
//             initialClientOffset,
//             ...restProps
//         } = this.props;
//         const style = { ...restProps.style, cursor: 'move' };
//
//         let className = restProps.className;
//         if (isOver && initialClientOffset) {
//             const direction = dragDirection(
//                 dragRow.index,
//                 restProps.index,
//                 initialClientOffset,
//                 clientOffset,
//                 sourceClientOffset
//             );
//             if (direction === 'downward') {
//                 className += ' drop-over-downward';
//             }
//             if (direction === 'upward') {
//                 className += ' drop-over-upward';
//             }
//         }
//
//         // return <EditableFormRow ref={instance => connectDragSource(connectDropTarget(findDOMNode(instance)))} />;
//
//         return connectDragSource(
//             connectDropTarget(
//                 <EditableFormRow
//                     {...restProps}
//                     className={className}
//                     style={style}
//                 />
//             )
//         );
//     }
// }

const rowSource = {
    beginDrag(props) {
        return {
            index: props.index,
        };
    },
};

const rowTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Time to actually perform the action
        props.moveRow(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset(),
}))(
    DragSource('row', rowSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        dragRow: monitor.getItem(),
        clientOffset: monitor.getClientOffset(),
        initialClientOffset: monitor.getInitialClientOffset(),
    }))(EditableFormRow)
);


class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingKey: '',
            dataSource : this.props.dataSource ,
            selectedRowKeys: [],
            selectRowElements : []
        };

        this.addColumns = this.addColumns.bind(this)


        this.columns = [
            ...this.props.columns ,
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                            ) : (
                                <a onClick={() => this.edit(record.key)}>Edit</a>
                            )}
                        </div>
                    );
                },
            },
        ];
    }

    onSelectChange = (selectedRowKeys , selectRowElements) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys , selectRowElements);
        this.setState({ selectedRowKeys , selectRowElements });
    }

    moveRow = (dragIndex, hoverIndex) => {
        console.log(dragIndex , hoverIndex)
        const { dataSource } = this.state;
        const dragRow = dataSource[dragIndex];

        this.setState(
            update(this.state, {
                dataSource: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
                },
            }),
        );
    }

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    edit(key) {
        this.setState({ editingKey: key });
    }
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.dataSource];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                // this.setState({ dataSource: newData, editingKey: '' });
                this.props.onSave(newData)
                this.setState({ editingKey: '' });
            } else {
                newData.push(this.state.dataSource);
                this.props.onSave(newData)
                // this.setState({ dataSource: newData, editingKey: '' });
                this.setState({ editingKey: '' });
            }
        });
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    };


    componentWillReceiveProps(newProps){
        this.setState({
            dataSource : newProps.dataSource
        })
    }

    addColumns(){
        let newData = [] ;
        this.state.selectRowElements.forEach(element => {
            newData.push({
                ...element ,
                key : uuid()
            })
        })
        this.props.onChange(newData);
        this.setState({
            // dataSource : [...this.state.dataSource , ...newData] ,
            selectedRowKeys : [] ,
            selectRowElements : []
        })
    }

    render() {

        // console.log("props in editable table" , this.props)
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;


        const components = {
            body: {
                row: DragableBodyRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.addColumns}
                        disabled={!hasSelected}
                    >
                        Add
                    </Button>
                    <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
                </div>
                <Table
                    {...this.props}
                    dataSource={this.state.dataSource}
                    components={components}
                    bordered
                    columns={columns}
                    pagination={false}
                    rowClassName="editable-row"
                    rowSelection={rowSelection}
                    onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow,
                    })}
                />
            </div>

        );
    }
}

export default DragDropContext(HTML5Backend)(EditableTable);;