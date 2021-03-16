import React, { useCallback } from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle}) => {
    const {text, checked} = todo;

    const onClick = useCallback(e => {
        onRemove(todo.id);
    },[todo, onRemove])

    const onClickCheckBox = useCallback(e => {
        onToggle(todo.id);
    },[todo, onToggle])
    return (
        <div className="TodoListItem">
            <div className={cn('checkbox', {checked})} onClick={onClickCheckBox}>
                {checked? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{text}</div>
            </div> 
            <div className="remove" onClick={onClick}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default React.memo(TodoListItem);