# 프로젝트 목표

todo는 사실 정말 많이 만들어보았고 거의 기계적으로 만드는데요. react에선 어떤 최적의 방법으로 데이터를 다루고 event를 처리하는지 알아보고 연습해보기 위해 react를 통해 구현해보았습니다.

# 환경 소개

## 사용한 라이브러리

- `$yarn add node-sass`
- `$yarn add classnames`
- `$yarn add react-icons`

## classnames 라이브러리

classnames는 조건부 스타일링을 편하게 하기 위해 사용한 라이브러리입니다.

- classnames의 사용방법

```javascript
import classNames from 'classnames';

classNames('one', 'two'); //'one two'
classNames('one', { two: true }); //'one two'
classNames('one', { two: false }); //'one'
classNames('one', ['two', 'three']); //'one two three'

const myClass = 'hello';
classNames('one', myClass, { myCondition: true }); //'one hello myCondition'
```

- classnames 사용 예시

selected를 아래와 같이 사용하면 selected가 true일 경우에는 'selected'라는 class명이 추가되므로 이를 이용해서 조건부 스타일링을 쉽게 할 수 있습니다.

```
<div className={cn('box', {selected})}></div>
```

## prettier 설정

### project

```
|--project
 +|--.prettierrc
```

### .prettierrc

```
{
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 80
}
```

# 최적화를 위한 과정

## 함수형 update

함수형 update 일때와 아닐때의 차이점을 알아봅니다. 아래 두 경우는 어떤 차이가 있을까요?
일단 두 경우 모두 불변성을 유지하려는 모습이 보입니다. 다만 useCallback의 두번째 인자에서 알 수 있듯이 객체 전달 update는 todos 배열이 update 될때마다 함수가 새로 바뀝니다. 하지만 함수형 update의 경우에는 처음 생성된 후 바뀌지 않습니다.

- 객체 전달 update

```javascript
onInsert = useCallback(
  (text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos.concat(todo));
  },
  [todos],
);
```

- 함수형 update

```javascript
onInsert = useCallback((text) => {
  const todo = {
    id: nextId.current,
    text,
    checked: false,
  };
  setTodos((todos) => todos.concat(todo));
}, []);
```

## useReducer

함수형 update를 사용하지 않고 useReducer를 사용하는 방법도 있습니다. 위의 함수형 update를 useReducer를 이용해 나타내보겠습니다. useReducer를 사용하면 reducer함수를 component 밖에 정의할 수 있다는 장점이 있습니다. 즉 component의 업데이트에 영향을 받지 않고 todos에 따라서 함수를 업데이트 할 필요도 없습니다.

```javascript
import React, {useReducer} from 'react';

const reduer = (state, action) => {
    switch(action.type){
        case 'INSERT':
            return (state.concat(action.todo));
    }
};

const Component = () => {
    const [todos, dispatch] = useReducer(reducer, <초기값>, <초기값 반환 함수>);

    const onInsert = useCallback(text => {
        const todo = {
            id: nextId.current,
            text,
            checked: false
        };
        dispatch({type: 'INSERT', todo});
        nextId.current++;
    })

    return (...생략);
}
```

## react-virtualized를 사용한 렌더링 최적화

### react-virtualized란?

react-virutalized를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포너트는 렌더링하지 않고 크기만 차지하게끔 할 수 있습니다.

### 설치

`$yarn add react-virtualized`
